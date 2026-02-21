import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import HospitalCard from "@/components/HospitalCard";
import CostInsights from "@/components/CostInsights";
import DecisionAssistant from "@/components/DecisionAssistant";
import { getProcedureById, getHospitalsForProcedure } from "@/lib/data";
import { AlertCircle, Building2 } from "lucide-react";

const CompareHospitals = () => {
  const { procedureId } = useParams<{ procedureId: string }>();
  const procedure = getProcedureById(procedureId || "");
  const hospitals = getHospitalsForProcedure(procedureId || "");

  if (!procedure) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <h2 className="text-xl font-semibold text-foreground">Procedure not found</h2>
          <p className="text-muted-foreground">Please go back and select a valid procedure.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-2">
            <Building2 className="h-3.5 w-3.5" />
            {procedure.category} · {procedure.city}
          </div>
          <h1 className="text-3xl font-bold text-foreground">{procedure.name}</h1>
          <p className="text-muted-foreground">{procedure.description} · {hospitals.length} hospitals available</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2">
              {hospitals.map((h, i) => (
                <HospitalCard key={h.id} hospital={h} procedureId={procedureId!} rank={i + 1} />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <CostInsights hospitals={hospitals} />
            <DecisionAssistant hospitals={hospitals} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareHospitals;
