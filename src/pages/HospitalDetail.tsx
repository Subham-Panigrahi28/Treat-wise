import { useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import { getHospitalById, getProcedureById, getReviewsForHospital, addReview, hospitals as allHospitals, getUserActivity, toggleSavedHospital } from "@/lib/data";
import { Star, MapPin, Clock, DollarSign, UserCheck, ArrowLeft, MessageSquare, Send, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";

const HospitalDetail = () => {
  const { hospitalId } = useParams<{ hospitalId: string }>();
  const [searchParams] = useSearchParams();
  const procedureId = searchParams.get("procedure");
  const { user } = useAuth();

  const hospital = getHospitalById(hospitalId || "");
  const procedure = procedureId ? getProcedureById(procedureId) : null;

  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviews, setReviews] = useState(() =>
    hospital ? getReviewsForHospital(hospital.hospitalName, procedureId || undefined) : []
  );

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (user && hospitalId) {
      const activity = getUserActivity(user.id);
      setIsSaved(activity.savedHospitals.includes(hospitalId));
    }
  }, [user, hospitalId]);

  const handleToggleSave = () => {
    if (!user || !hospitalId) return;
    const nowSaved = toggleSavedHospital(user.id, hospitalId);
    setIsSaved(nowSaved);
  };

  if (!hospital) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-xl font-semibold text-foreground">Hospital not found</h2>
        </div>
      </div>
    );
  }

  // Get all procedure entries for this hospital name
  const hospitalEntries = allHospitals.filter((h) => h.hospitalName === hospital.hospitalName);

  const handleSubmitReview = () => {
    if (!user || !reviewText.trim()) return;
    const newReview = addReview({
      userId: user.id,
      hospitalName: hospital.hospitalName,
      procedure: procedureId || hospital.procedure,
      rating: reviewRating,
      comment: reviewText.trim(),
      verified: false,
    });
    setReviews((prev) => [...prev, newReview]);
    setReviewText("");
    setReviewRating(5);
  };

  const avgCost = Math.round((hospital.costMin + hospital.costMax) / 2);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero image */}
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <img src={hospital.image} alt={hospital.hospitalName} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
        <div className="absolute bottom-6 left-0 right-0 container mx-auto px-4">
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-primary-foreground sm:text-4xl">{hospital.hospitalName}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-primary-foreground/80">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{hospital.city}</span>
              <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-accent text-accent" />{hospital.patientRating} ({hospital.verifiedReviewsCount} verified reviews)</span>
              <span className="flex items-center gap-1"><UserCheck className="h-4 w-4" />{hospital.doctorExperienceYears} years doctor experience</span>
            </div>
            {user && (
              <Button
                variant={isSaved ? "secondary" : "outline"}
                size="sm"
                className="mt-3 gap-1.5 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/20"
                onClick={handleToggleSave}
              >
                <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                {isSaved ? "Saved" : "Save Hospital"}
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {procedureId && (
          <Link to={`/compare/${procedureId}`} className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to comparison
          </Link>
        )}

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Procedure-specific stats */}
            {procedure && (
              <div className="rounded-xl border border-border bg-card p-5 shadow-card animate-fade-in">
                <h2 className="text-lg font-semibold text-card-foreground mb-4">{procedure.name} at this Hospital</h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="rounded-lg bg-secondary p-4 text-center">
                    <DollarSign className="mx-auto mb-1 h-5 w-5 text-primary" />
                    <p className="text-xs text-muted-foreground">Cost Range</p>
                    <p className="text-sm font-bold text-card-foreground">₹{hospital.costMin.toLocaleString("en-IN")} – ₹{hospital.costMax.toLocaleString("en-IN")}</p>
                  </div>
                  <div className="rounded-lg bg-secondary p-4 text-center">
                    <Star className="mx-auto mb-1 h-5 w-5 text-accent" />
                    <p className="text-xs text-muted-foreground">Patient Rating</p>
                    <p className="text-xl font-bold text-card-foreground">{hospital.patientRating}/5</p>
                  </div>
                  <div className="rounded-lg bg-secondary p-4 text-center">
                    <Clock className="mx-auto mb-1 h-5 w-5 text-info" />
                    <p className="text-xs text-muted-foreground">Recovery</p>
                    <p className="text-sm font-bold text-card-foreground">{hospital.recoveryTime}</p>
                  </div>
                  <div className="rounded-lg bg-secondary p-4 text-center">
                    <UserCheck className="mx-auto mb-1 h-5 w-5 text-primary" />
                    <p className="text-xs text-muted-foreground">Doctor Exp.</p>
                    <p className="text-xl font-bold text-card-foreground">{hospital.doctorExperienceYears} yrs</p>
                  </div>
                </div>
              </div>
            )}

            {/* Other procedures at this hospital */}
            {hospitalEntries.length > 1 && (
              <div className="rounded-xl border border-border bg-card p-5 shadow-card animate-fade-in">
                <h2 className="text-lg font-semibold text-card-foreground mb-3">Other Procedures Available</h2>
                <div className="space-y-2">
                  {hospitalEntries
                    .filter((e) => e.id !== hospital.id)
                    .map((entry) => {
                      const proc = getProcedureById(entry.procedure);
                      return (
                        <Link
                          key={entry.id}
                          to={`/hospital/${entry.id}?procedure=${entry.procedure}`}
                          className="flex items-center justify-between rounded-lg border border-border p-3 hover:border-primary/30 transition-colors"
                        >
                          <div>
                            <p className="font-medium text-card-foreground">{proc?.name || entry.procedure}</p>
                            <p className="text-xs text-muted-foreground">{proc?.category}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-card-foreground">₹{entry.costMin.toLocaleString("en-IN")} – ₹{entry.costMax.toLocaleString("en-IN")}</p>
                            <p className="text-xs text-muted-foreground">{entry.patientRating}/5 rating</p>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Reviews */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-card animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-card-foreground">Reviews ({reviews.length})</h2>
              </div>

              {reviews.length === 0 && (
                <p className="text-sm text-muted-foreground py-4">No reviews yet for this procedure at this hospital.</p>
              )}

              <div className="space-y-3 mb-4">
                {reviews.map((r) => (
                  <div key={r.id} className="rounded-lg border border-border p-3">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className={`h-3.5 w-3.5 ${s <= r.rating ? "fill-accent text-accent" : "text-muted-foreground"}`} />
                          ))}
                        </div>
                        {r.verified && <Badge variant="secondary" className="text-xs">Verified</Badge>}
                      </div>
                      <span className="text-xs text-muted-foreground">{r.createdAt}</span>
                    </div>
                    <p className="text-sm text-card-foreground">{r.comment}</p>
                  </div>
                ))}
              </div>

              {user ? (
                <div className="space-y-3 border-t border-border pt-4">
                  <p className="text-sm font-medium text-card-foreground">Write a review</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Rating:</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button key={s} onClick={() => setReviewRating(s)}>
                          <Star className={`h-5 w-5 ${s <= reviewRating ? "fill-accent text-accent" : "text-muted-foreground"}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Share your experience..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSubmitReview()}
                    />
                    <Button onClick={handleSubmitReview} disabled={!reviewText.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground">
                    <Link to="/auth" className="text-primary hover:underline">Sign in</Link> to write a review.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-5 shadow-card animate-fade-in">
              <h2 className="text-lg font-semibold text-card-foreground mb-3">Quick Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average Cost</span>
                  <span className="font-semibold text-card-foreground">₹{avgCost.toLocaleString("en-IN")}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Patient Rating</span>
                  <span className="font-semibold text-card-foreground">{hospital.patientRating}/5</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Doctor Experience</span>
                  <span className="font-semibold text-card-foreground">{hospital.doctorExperienceYears} years</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Recovery Time</span>
                  <span className="font-semibold text-card-foreground">{hospital.recoveryTime}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Verified Reviews</span>
                  <span className="font-semibold text-card-foreground">{hospital.verifiedReviewsCount}</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-accent/10 p-5">
              <h3 className="text-sm font-semibold text-card-foreground mb-2">Important Notice</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The information provided is for comparison purposes only and should not be considered medical advice.
                Costs are estimates based on publicly available data and may vary. Always verify details directly with the hospital.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetail;
