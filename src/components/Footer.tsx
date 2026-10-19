import { Link } from "react-router-dom";
import { site } from "@/data/site";
import { projects } from "@/data/projects";

export function Footer() {
  return (
    <footer className="border-t border-separator bg-card">
      <div className="container-wide py-14 grid gap-10 md:grid-cols-4">
        <div className="space-y-3">
          <span className="font-display font-black text-sm bg-brand text-brand-foreground px-2 py-1 inline-block">{site.monogram}</span>
          <p className="font-display font-bold uppercase">{site.name}</p>
          <p className="text-sm text-muted-foreground">Electrical &amp; Electronics Engineering</p>
        </div>
        <div className="space-y-3">
          <p className="text-label">Projects</p>
          {projects.slice(0, 4).map((p) => (
            <Link key={p.id} to={`/projects/${p.id}`} className="block text-sm text-foreground/80 hover:text-highlight transition-colors">
              {p.title}
            </Link>
          ))}
        </div>
        <div className="space-y-3">
          <p className="text-label">Contact</p>
          <p className="text-sm text-foreground/80">{site.location}</p>
          {site.email && <a href={`mailto:${site.email}`} className="block text-sm hover:text-highlight">{site.email}</a>}
          {site.linkedin && <a href={site.linkedin} target="_blank" rel="noreferrer" className="block text-sm hover:text-highlight">LinkedIn</a>}
          {site.github && <a href={site.github} target="_blank" rel="noreferrer" className="block text-sm hover:text-highlight">GitHub</a>}
        </div>
        <div className="space-y-3">
          <p className="text-label">Legal</p>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} {site.name}</p>
          <p className="font-mono text-[11px] text-muted-foreground">.</p>
        </div>
      </div>
      <div className="h-1 bg-highlight w-24" />
    </footer>
  );
}
