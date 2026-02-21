import { useNavigate } from "react-router-dom";
import { Star, MapPin, Clock, DollarSign, Stethoscope, UserCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Hospital } from "@/lib/data";

interface HospitalCardProps {
  hospital: Hospital;
  procedureId: string;
  rank?: number;
}

const HospitalCard = ({ hospital, procedureId, rank }: HospitalCardProps) => {
  const navigate = useNavigate();
  const avgCost = Math.round((hospital.costMin + hospital.costMax) / 2);

  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all hover:shadow-card-hover animate-fade-in">
      <div className="relative h-40 overflow-hidden">
        <img
          src={hospital.image}
          alt={hospital.hospitalName}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        {rank && rank <= 3 && (
          <div className="absolute left-3 top-3">
            <Badge className="bg-accent text-accent-foreground font-semibold shadow-lg">
              #{rank} Best Match
            </Badge>
          </div>
        )}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-lg font-bold text-primary-foreground">{hospital.hospitalName}</h3>
          <div className="flex items-center gap-1 text-sm text-primary-foreground/80">
            <MapPin className="h-3.5 w-3.5" />
            {hospital.city}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="font-semibold text-card-foreground">{hospital.patientRating}</span>
            <span className="text-sm text-muted-foreground">({hospital.verifiedReviewsCount} reviews)</span>
          </div>
          <Badge variant="outline" className="text-xs">
            <UserCheck className="mr-1 h-3 w-3" />
            {hospital.doctorExperienceYears}yr exp
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-secondary p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <DollarSign className="h-3.5 w-3.5" />
              Cost Range
            </div>
            <p className="mt-1 text-sm font-bold text-card-foreground">
              ₹{hospital.costMin.toLocaleString("en-IN")} – ₹{hospital.costMax.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="rounded-lg bg-secondary p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Stethoscope className="h-3.5 w-3.5" />
              Avg. Cost
            </div>
            <p className="mt-1 text-lg font-bold text-primary">₹{avgCost.toLocaleString("en-IN")}</p>
          </div>
          <div className="rounded-lg bg-secondary p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              Recovery
            </div>
            <p className="mt-1 text-sm font-bold text-card-foreground">{hospital.recoveryTime}</p>
          </div>
          <div className="rounded-lg bg-secondary p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Star className="h-3.5 w-3.5" />
              Rating
            </div>
            <p className="mt-1 text-lg font-bold text-card-foreground">{hospital.patientRating}/5</p>
          </div>
        </div>

        <Button
          className="w-full"
          onClick={() => navigate(`/hospital/${hospital.id}?procedure=${procedureId}`)}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default HospitalCard;
