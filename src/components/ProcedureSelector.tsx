import { useNavigate } from "react-router-dom";
import { ChevronRight, MapPin } from "lucide-react";
import { procedures, trackProcedureView } from "@/lib/data";
import { useAuth } from "@/contexts/AuthContext";

const PUNE_PROCEDURE_IDS = ["knee-replacement", "cataract-surgery", "angioplasty"];

const ProcedureSelector = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const puneProcedures = procedures.filter((p) => PUNE_PROCEDURE_IDS.includes(p.id));

  const handleSelect = (procedureId: string) => {
    if (user) {
      trackProcedureView(user.id, procedureId);
    }
    navigate(`/compare/${procedureId}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4 text-primary" />
        <span>Showing procedures available in <strong className="text-foreground">Pune</strong></span>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {puneProcedures.map((procedure, i) => (
          <button
            key={procedure.id}
            onClick={() => handleSelect(procedure.id)}
            className="group flex flex-col justify-between rounded-xl border border-border bg-card p-5 text-left shadow-card transition-all hover:shadow-card-hover hover:border-primary/30 animate-fade-in"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="space-y-1.5">
              <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                {procedure.name}
              </h3>
              <p className="text-sm text-muted-foreground">{procedure.description}</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {procedure.category}
              </span>
              <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProcedureSelector;
