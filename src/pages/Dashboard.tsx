import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import {
  getUserActivity,
  getProcedureById,
  getHospitalById,
  type UserActivity,
} from "@/lib/data";
import {
  Clock,
  Building2,
  Heart,
  ArrowRight,
  Search,
  Star,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const { user } = useAuth();
  const [activity, setActivity] = useState<UserActivity | null>(null);

  useEffect(() => {
    if (user) {
      setActivity(getUserActivity(user.id));
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const viewedProcedures = (activity?.viewedProcedures || [])
    .map((v) => ({
      ...v,
      procedure: getProcedureById(v.procedureId),
    }))
    .filter((v) => v.procedure);

  const savedHospitals = (activity?.savedHospitals || [])
    .map((id) => getHospitalById(id))
    .filter(Boolean);

  const firstName = user.name.split(" ")[0];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <div className="rounded-xl border border-border bg-[image:var(--gradient-hero)] p-6 sm:p-8 shadow-card">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary-foreground">
              Welcome back, {firstName}
            </h1>
            <p className="mt-2 text-primary-foreground/80">
              Here's a summary of your activity on TreatWise.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <div className="rounded-lg bg-primary-foreground/10 px-4 py-2 text-sm text-primary-foreground">
                <span className="font-semibold">{viewedProcedures.length}</span>{" "}
                procedures viewed
              </div>
              <div className="rounded-lg bg-primary-foreground/10 px-4 py-2 text-sm text-primary-foreground">
                <span className="font-semibold">{savedHospitals.length}</span>{" "}
                hospitals saved
              </div>
            </div>
          </div>
        </div>

        {/* Start New Comparison */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <Button asChild size="lg" className="gap-2">
            <Link to="/">
              <Search className="h-5 w-5" />
              Start New Comparison
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Previously Viewed Procedures */}
          <div
            className="animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">
                Recently Viewed Procedures
              </h2>
            </div>
            {viewedProcedures.length === 0 ? (
              <div className="rounded-xl border border-border bg-card p-8 text-center shadow-card">
                <Search className="mx-auto mb-3 h-10 w-10 text-muted-foreground/50" />
                <p className="text-muted-foreground">
                  No procedures viewed yet.
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Start by{" "}
                  <Link to="/" className="text-primary hover:underline">
                    comparing hospitals
                  </Link>{" "}
                  for a procedure.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {viewedProcedures.slice(0, 8).map((v) => (
                  <Link
                    key={v.procedureId}
                    to={`/compare/${v.procedureId}`}
                    className="flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-card hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Heart className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-card-foreground">
                          {v.procedure!.name}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="text-xs"
                          >
                            {v.procedure!.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(v.viewedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Saved Hospitals */}
          <div
            className="animate-fade-in"
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">
                Saved Hospitals
              </h2>
            </div>
            {savedHospitals.length === 0 ? (
              <div className="rounded-xl border border-border bg-card p-8 text-center shadow-card">
                <Building2 className="mx-auto mb-3 h-10 w-10 text-muted-foreground/50" />
                <p className="text-muted-foreground">
                  No hospitals saved yet.
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Save hospitals while browsing to compare them later.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {savedHospitals.map((hospital) => {
                  const proc = getProcedureById(hospital!.procedure);
                  return (
                    <Link
                      key={hospital!.id}
                      to={`/hospital/${hospital!.id}?procedure=${hospital!.procedure}`}
                      className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card hover:border-primary/30 transition-colors"
                    >
                      <img
                        src={hospital!.image}
                        alt={hospital!.hospitalName}
                        className="h-16 w-16 shrink-0 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-card-foreground truncate">
                          {hospital!.hospitalName}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {hospital!.city}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Star className="h-3 w-3 fill-accent text-accent" />
                            {hospital!.patientRating}
                          </span>
                        </div>
                        {proc && (
                          <Badge
                            variant="secondary"
                            className="mt-1 text-xs"
                          >
                            {proc.name}
                          </Badge>
                        )}
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
