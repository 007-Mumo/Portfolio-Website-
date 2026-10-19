import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { projects, filters, Filter } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { EvidenceGallery } from "./Evidence";
import { useSeo } from "@/hooks/use-seo";

export function ProjectGallery() {
  const [active, setActive] = useState<Filter | "All">("All");
  const list = active === "All" ? projects : projects.filter((p) => p.filters.includes(active));
  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter projects">
        {(["All", ...filters] as const).map((f) => (
          <Button variant="outline" key={f} onClick={() => setActive(f)} aria-pressed={active === f}
            className={`font-mono text-[11px] uppercase tracking-[0.15em] px-3 py-2 border transition-colors ${active === f ? "bg-highlight text-highlight-foreground border-highlight" : "border-border text-foreground/70 hover:text-foreground"}`}>
            {f}
          </Button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((p) => (
          <Link key={p.id} to={`/projects/${p.id}`} className="group block border border-border bg-card hover:border-highlight transition-colors">
            <div className="relative overflow-hidden aspect-[4/3]">
              <img src={p.coverImage} alt={`Representative image for ${p.title}`} loading="lazy" className="w-full h-full object-cover" />
              <span className="absolute top-3 left-3 font-mono text-[11px] bg-background/85 px-2 py-1">{p.code}</span>
              <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase bg-background/85 px-2 py-1 text-muted-foreground">g</span>
            </div>
            <div className="p-5">
              <p className="text-label">{p.category} · {p.type}</p>
              <h3 className="font-display font-bold text-lg mt-1 group-hover:text-highlight transition-colors">{p.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{p.role}</p>
              <p className="font-mono text-xs text-eng-blue mt-3 border-t border-border pt-3"><span className="text-highlight">Deliverable:</span> {p.meta.deliverables}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

const Work = () => {
  useSeo({ title: "Projects — Brian Mumo Musyoki", description: "Electrical, solar PV, telecommunications and software projects by Brian Mumo Musyoki.", path: "/projects" });
  return (
    <Layout>
      <section className="container-wide pt-32 pb-20">
        <p className="text-label mb-3">Portfolio</p>
        <h1 className="text-headline mb-10">Engineering Projects</h1>
        <ProjectGallery />
        <div id="evidence" className="mt-20 border-t border-border pt-10"><h2 className="text-2xl font-display font-bold mb-6">Project documents</h2><EvidenceGallery /></div>
      </section>
    </Layout>
  );
};

export default Work;
