import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Stethoscope, ChevronRight, Bookmark, BookmarkCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { procedures } from "@/lib/data";
import { useAuth } from "@/contexts/AuthContext";

const ProcedureSelector = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { user, toggleSaved } = useAuth();

  const categories = [...new Set(procedures.map((p) => p.category))];
  const filtered = procedures.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search procedures (e.g. knee replacement, cataract...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-12 pl-11 text-base shadow-card"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Badge
            key={cat}
            variant="secondary"
            className="cursor-pointer px-3 py-1.5 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
            onClick={() => setSearch(search === cat ? "" : cat)}
          >
            <Stethoscope className="mr-1.5 h-3.5 w-3.5" />
            {cat}
          </Badge>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((procedure, i) => {
          const isSaved = user?.savedProcedures.includes(procedure.id);
          return (
            <div
              key={procedure.id}
              className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 text-left shadow-card transition-all hover:shadow-card-hover hover:border-primary/30 animate-fade-in"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <button
                onClick={() => navigate(`/compare/${procedure.id}`)}
                className="flex-1 text-left space-y-1"
              >
                <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                  {procedure.name}
                </h3>
                <p className="text-sm text-muted-foreground">{procedure.description}</p>
                <p className="text-xs font-medium text-primary">{procedure.city}</p>
              </button>
              <div className="flex items-center gap-1 shrink-0 ml-2">
                {user && (
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleSaved(procedure.id); }}
                    className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
                  >
                    {isSaved ? (
                      <BookmarkCheck className="h-5 w-5 text-primary" />
                    ) : (
                      <Bookmark className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                )}
                <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          <Stethoscope className="mx-auto mb-3 h-10 w-10 opacity-40" />
          <p>No procedures found. Try a different search term.</p>
        </div>
      )}
    </div>
  );
};

export default ProcedureSelector;
