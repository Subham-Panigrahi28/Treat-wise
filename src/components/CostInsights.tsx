import { DollarSign, TrendingDown, TrendingUp, Info } from "lucide-react";
import type { Hospital } from "@/lib/data";

interface CostInsightsProps {
  hospitals: Hospital[];
}

const CostInsights = ({ hospitals }: CostInsightsProps) => {
  if (hospitals.length === 0) return null;

  const avgCosts = hospitals.map((h) => Math.round((h.costMin + h.costMax) / 2));
  const min = Math.min(...avgCosts);
  const max = Math.max(...avgCosts);
  const avg = Math.round(avgCosts.reduce((a, b) => a + b, 0) / avgCosts.length);
  const cheapestIdx = avgCosts.indexOf(min);
  const cheapest = hospitals[cheapestIdx];
  const savings = max - min;

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <DollarSign className="h-4 w-4 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-card-foreground">Cost Insights</h3>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="rounded-lg bg-secondary p-3 text-center">
          <TrendingDown className="mx-auto mb-1 h-4 w-4 text-success" />
          <p className="text-xs text-muted-foreground">Lowest Avg</p>
          <p className="text-lg font-bold text-success">₹{min.toLocaleString("en-IN")}</p>
        </div>
        <div className="rounded-lg bg-secondary p-3 text-center">
          <DollarSign className="mx-auto mb-1 h-4 w-4 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Average</p>
          <p className="text-lg font-bold text-card-foreground">₹{avg.toLocaleString("en-IN")}</p>
        </div>
        <div className="rounded-lg bg-secondary p-3 text-center">
          <TrendingUp className="mx-auto mb-1 h-4 w-4 text-destructive" />
          <p className="text-xs text-muted-foreground">Highest Avg</p>
          <p className="text-lg font-bold text-destructive">₹{max.toLocaleString("en-IN")}</p>
        </div>
      </div>

      <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
        <div className="flex gap-2">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div className="text-sm">
            <p className="text-card-foreground">
              <strong>{cheapest.hospitalName}</strong> offers the lowest average price. You could save up to{" "}
              <strong className="text-primary">₹{savings.toLocaleString("en-IN")}</strong> compared to the most expensive option.
            </p>
            <p className="mt-1 text-muted-foreground">
              Note: Costs are estimates based on publicly available data and may vary.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostInsights;
