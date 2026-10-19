import { EvidenceGallery } from "./Evidence";
import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Layout } from "@/components/Layout";
import { projects } from "@/data/projects";
import { useSeo } from "@/hooks/use-seo";

const ProjectPage = () => {
  const { id } = useParams();
  const idx = projects.findIndex((p) => p.id === id);
  const p = projects[idx];
  useSeo({
    title: p ? `${p.title} — Brian Mumo Musyoki` : "Project — Brian Mumo Musyoki",
    description: p?.summary ?? "",
    path: `/projects/${id}`,
  });
  if (!p) return <Navigate to="/projects" replace />;
  const related = projects.filter((x) => x.id !== p.id && x.filters.some((f) => p.filters.includes(f))).slice(0, 3);
  const others = related.length ? related : projects.filter((x) => x.id !== p.id).slice(0, 3);

  const sections: [string, string][] = [
    ["01 · Project context", p.context],
    ["02 · Technical challenge", p.challenges],
    ["03 · My role & contribution", p.role],
  ];

  return (
    <Layout>
      <section className="container-wide pt-28 md:pt-32 pb-12">
        <Link to="/projects" className="inline-flex items-center gap-2 text-label hover:text-foreground mb-6"><ArrowLeft size={14} /> All projects</Link>
        <p className="text-label text-highlight mb-3">{p.code} · {p.category} · {p.type}</p>
        <h1 className="text-headline uppercase max-w-4xl">{p.title}</h1>
        <p className="text-muted-foreground max-w-2xl mt-4">{p.summary}</p>
      </section>

      <section id="documents" className="container-wide pb-12 scroll-mt-24">
        <EvidenceGallery key={p.id} projectId={p.id} />
      </section>

      <section className="section-light py-12">
        <div className="container-wide grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Object.entries(p.meta).map(([k, v]) => (
            <div key={k} className="border-t border-border pt-3">
              <p className="text-label">{k}</p>
              <p className="text-sm mt-1">{v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-wide py-16 grid md:grid-cols-3 gap-10">
        {sections.map(([t, b]) => (
          <div key={t}><p className="text-label text-highlight mb-2">{t}</p><p className="text-foreground/85 leading-relaxed">{b}</p></div>
        ))}
      </section>

      <section className="container-wide pb-16 grid md:grid-cols-2 gap-10">
        <div>
          <p className="text-label text-highlight mb-3">04 · Method</p>
          <ul className="space-y-2 text-foreground/85">{p.approach.map((a) => <li key={a} className="border-l-2 border-highlight pl-3">{a}</li>)}</ul>
        </div>
        <div>
          <p className="text-label text-highlight mb-3">05 · Tools</p>
          <div className="flex flex-wrap gap-2">{p.tools.map((t) => <span key={t} className="font-mono text-xs border border-border px-2 py-1">{t}</span>)}</div>
        </div>
      </section>

      <section className="container-wide pb-16">
        <p className="text-label text-highlight mb-3">06 · Evidence gallery</p>
        <Link to="#documents" onClick={() => document.getElementById("documents")?.scrollIntoView()} className="text-primary hover:text-primary-hover">Project documents ↑</Link>
      </section>

      <section className="container-wide pb-16 grid md:grid-cols-2 gap-10">
        <div><p className="text-label text-highlight mb-2">07 · Deliverables & status</p><p className="text-foreground/85">{p.meta.deliverables} — <span className="text-muted-foreground">Status: {p.meta.status}</span></p></div>
        <div><p className="text-label text-highlight mb-2">08 · Lessons & next steps</p><p className="text-foreground/85">{p.lessons}</p></div>
      </section>

      <section className="container-wide pb-20 border-t border-separator pt-10">
        <p className="text-label text-highlight mb-4">09 · Related projects</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {others.map((r) => (
            <Link key={r.id} to={`/projects/${r.id}`} className="border border-border p-4 hover:border-highlight transition-colors">
              <p className="text-label">{r.code} · {r.category}</p>
              <p className="font-display font-bold mt-1">{r.title}</p>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default ProjectPage;
