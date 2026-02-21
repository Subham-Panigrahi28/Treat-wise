import { useState } from "react";
import { CheckCircle2, Circle, ArrowRight, Lightbulb, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Hospital } from "@/lib/data";

interface DecisionAssistantProps {
  hospitals: Hospital[];
}

type Priority = "cost" | "quality" | "experience" | "recovery";

const priorities: { id: Priority; label: string; description: string }[] = [
  { id: "cost", label: "Lowest Cost", description: "I want to minimize out-of-pocket expense" },
  { id: "quality", label: "Best Ratings", description: "Patient ratings matter most to me" },
  { id: "experience", label: "Most Experienced", description: "I want the most experienced doctors" },
  { id: "recovery", label: "Fastest Recovery", description: "I want the shortest recovery time" },
];

const DecisionAssistant = ({ hospitals }: DecisionAssistantProps) => {
  const [selected, setSelected] = useState<Priority[]>([]);
  const [showResult, setShowResult] = useState(false);

  const togglePriority = (p: Priority) => {
    setSelected((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
    setShowResult(false);
  };

  const scoreHospital = (h: Hospital) => {
    let score = 0;
    const avgCosts = hospitals.map((x) => (x.costMin + x.costMax) / 2);
    const maxCost = Math.max(...avgCosts);
    const minCost = Math.min(...avgCosts);
    const hCost = (h.costMin + h.costMax) / 2;

    if (selected.includes("cost")) {
      score += maxCost > minCost ? ((maxCost - hCost) / (maxCost - minCost)) * 30 : 15;
    }
    if (selected.includes("quality")) {
      score += (h.patientRating / 5) * 30;
    }
    if (selected.includes("experience")) {
      const maxExp = Math.max(...hospitals.map((x) => x.doctorExperienceYears));
      const minExp = Math.min(...hospitals.map((x) => x.doctorExperienceYears));
      score += maxExp > minExp ? ((h.doctorExperienceYears - minExp) / (maxExp - minExp)) * 30 : 15;
    }
    if (selected.includes("recovery")) {
      // Lower recovery number = better; parse first number from string
      const parseRecovery = (r: string) => parseInt(r.match(/\d+/)?.[0] || "0");
      const recoveries = hospitals.map((x) => parseRecovery(x.recoveryTime));
      const maxR = Math.max(...recoveries);
      const minR = Math.min(...recoveries);
      const hR = parseRecovery(h.recoveryTime);
      score += maxR > minR ? ((maxR - hR) / (maxR - minR)) * 30 : 15;
    }
    return Math.round(score);
  };

  const ranked = [...hospitals]
    .map((h) => ({ ...h, score: scoreHospital(h) }))
    .sort((a, b) => b.score - a.score);

  const reset = () => {
    setSelected([]);
    setShowResult(false);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20">
            <Lightbulb className="h-4 w-4 text-accent" />
          </div>
          <h3 className="text-lg font-semibold text-card-foreground">Decision Assistant</h3>
        </div>
        {selected.length > 0 && (
          <Button variant="ghost" size="sm" onClick={reset}>
            <RotateCcw className="mr-1 h-3.5 w-3.5" /> Reset
          </Button>
        )}
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Select what matters most to you, and we'll rank hospitals accordingly.
      </p>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 mb-4">
        {priorities.map((p) => (
          <button
            key={p.id}
            onClick={() => togglePriority(p.id)}
            className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-all ${
              selected.includes(p.id) ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
            }`}
          >
            {selected.includes(p.id) ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            ) : (
              <Circle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
            )}
            <div>
              <p className="font-medium text-card-foreground">{p.label}</p>
              <p className="text-xs text-muted-foreground">{p.description}</p>
            </div>
          </button>
        ))}
      </div>

      {selected.length > 0 && (
        <Button className="w-full mb-4" onClick={() => setShowResult(true)}>
          Show Recommendation <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}

      {showResult && (
        <div className="space-y-2 animate-fade-in">
          <p className="text-sm font-medium text-muted-foreground mb-2">Ranked by your priorities:</p>
          {ranked.map((h, i) => (
            <div
              key={h.id}
              className={`flex items-center justify-between rounded-lg border p-3 ${
                i === 0 ? "border-primary bg-primary/5" : "border-border"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${
                  i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}>
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium text-card-foreground">{h.hospitalName}</p>
                  <p className="text-xs text-muted-foreground">{h.city}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary">{h.score}</p>
                <p className="text-xs text-muted-foreground">score</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DecisionAssistant;
