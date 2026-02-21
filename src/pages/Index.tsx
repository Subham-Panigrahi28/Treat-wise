import { Heart, Shield, Search, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import ProcedureSelector from "@/components/ProcedureSelector";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[image:var(--gradient-hero)] py-16 sm:py-24">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="container mx-auto px-4 text-center relative">
          <div className="mx-auto max-w-2xl animate-fade-in">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm text-primary-foreground">
              <Shield className="h-4 w-4" />
              Decision support — not medical advice
            </div>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-primary-foreground sm:text-5xl text-balance">
              Compare hospitals for your procedure
            </h1>
            <p className="mx-auto max-w-lg text-lg text-primary-foreground/80">
              Your doctor recommended a procedure. Now compare hospitals on cost, success rates, wait times, and more — all in one place.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto -mt-8 px-4 relative z-10">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Search, title: "Select Procedure", desc: "Choose the procedure your doctor recommended" },
            { icon: Heart, title: "Compare Hospitals", desc: "View cost, quality, and wait times side by side" },
            { icon: Shield, title: "Decide Confidently", desc: "Use our tools to pick the best fit for you" },
          ].map((step, i) => (
            <div
              key={step.title}
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-card animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <step.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Procedure selector */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-6 flex items-center gap-2">
          <ArrowRight className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Select Your Procedure</h2>
        </div>
        <ProcedureSelector />
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="mb-1 font-medium text-foreground">TreatWise</p>
          <p>This tool is for informational purposes only and does not constitute medical advice.</p>
          <p className="mt-1">Always consult with your healthcare provider before making decisions.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
