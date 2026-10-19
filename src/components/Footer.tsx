
import { Link } from "react-router-dom";
import { site } from "@/data/site";
import { projects } from "@/data/projects";

export function Footer() {
  return (
    <footer className="border-t border-separator bg-card">
      <div className="container-wide py-14 grid gap-10 md:grid-cols-4">
        <div className="space-y-3">
          <p className="font-display font-bold">
            Brian Mumo Musyoki
          </p>
          <p className="text-sm text-muted-foreground">
            Electrical &amp; Electronic Engineer
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-label">Projects</p>
          {projects.slice(0, 4).map((p) => (
            <Link
              key={p.id}
              to={`/projects/${p.id}`}
              className="block text-sm text-foreground/80 hover:text-highlight transition-colors"
            >
              {p.title}
            </Link>
          ))}
        </div>

        <div className="space-y-3">
          <p className="text-label">Contact</p>
          <p className="text-sm text-foreground/80">
            {site.location}
          </p>

          <a
            href="mailto:mumobrian506@gmail.com"
            className="block text-sm hover:text-highlight break-words"
          >
            mumobrian506@gmail.com
          </a>

          <a
            href="tel:+254748134486"
            className="block text-sm hover:text-highlight"
          >
            +254 748 134 486
          </a>

          {site.linkedin && (
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="block text-sm hover:text-highlight"
            >
              LinkedIn ↗
            </a>
          )}

          {site.github && (
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="block text-sm hover:text-highlight"
            >
              GitHub ↗
            </a>
          )}
        </div>

        <div className="space-y-3">
          <p className="text-label">Legal</p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Brian Mumo Musyoki
          </p>
          <p className="font-mono text-[11px] text-muted-foreground">
            All rights reserved.
          </p>
        </div>
      </div>

      <div className="h-1 bg-highlight w-24" />
    </footer>
  );
}
