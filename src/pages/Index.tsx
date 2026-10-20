import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { useSeo } from "@/hooks/use-seo";
import { Button } from "@/components/ui/button";
import { ProfilePortrait } from "@/components/ProfilePortrait";

export default function Index() {
  useSeo({ title: "Brian Mumo Musyoki — Graduate Engineer", description: site.introduction, path: "/" });
  return <Layout>
    <section className="container-wide pt-28 md:pt-32 pb-14 md:pb-16">
      <div className="grid lg:grid-cols-[2fr_3fr] items-center gap-10 lg:gap-14 xl:gap-20">
        <ProfilePortrait />
        <div>
          <p className="text-label text-muted-foreground mb-5">{site.location.toUpperCase()}</p>
          <h1 className="profile-name font-display font-bold leading-[1.08]">Brian Mumo<br />Musyoki</h1>
          <p className="text-base md:text-lg text-foreground mt-5 max-w-xl">{site.title}</p>
          <blockquote className="border-l-2 border-primary pl-5 my-7 text-muted-foreground italic leading-relaxed max-w-xl">“{site.quotation}”</blockquote>
          <p className="text-muted-foreground leading-[1.8] max-w-xl">{site.introduction}</p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Button asChild size="lg" className="font-mono text-[11px] h-12"><Link to="/projects">EXPLORE PROJECTS <ArrowUpRight aria-hidden="true" /></Link></Button>
            <Button asChild variant="outline" size="lg" className="font-mono text-[11px] h-12"><Link to="/about">ABOUT ME</Link></Button>
          </div>
        </div>
      </div>
    </section>
    <section className="border-y border-separator" aria-label="Engineering disciplines">
      <div className="container-wide py-6 flex flex-wrap items-center gap-x-4 gap-y-3 font-mono text-[10px] md:text-[11px] text-muted-foreground">
        {site.disciplineStrip.map((discipline, i) => <span key={discipline} className="inline-flex items-center gap-4">{i > 0 && <span className="text-muted-foreground/40" aria-hidden="true">/</span>}{discipline}</span>)}
      </div>
    </section>
    <section className="container-wide py-14 md:py-20" aria-labelledby="featured">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8"><div><p className="text-label text-destructive mb-3">Selected work</p><h2 id="featured" className="font-display text-3xl md:text-4xl font-bold">Featured Projects</h2></div><Link to="/projects" className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-hover">All projects <ArrowUpRight size={16} /></Link></div>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.slice(0, 3).map((p) => <Link key={p.id} to={`/projects/${p.id}`} className="group border border-border bg-card hover:border-primary transition-colors">
          <div className="relative aspect-[4/3] overflow-hidden"><img src={p.coverImage} alt={`Illustrative photograph for ${p.title}`} className="w-full h-full object-cover" loading="lazy" /><span className="absolute bottom-3 left-3 bg-background/90 text-muted-foreground font-mono text-[10px] px-2 py-1"></span></div>
          <div className="p-5"><p className="text-label">{p.code} / {p.category}</p><h3 className="font-display font-bold text-lg mt-2 group-hover:text-primary">{p.title}</h3><p className="text-sm text-muted-foreground mt-3 leading-relaxed">{p.role}</p><p className="text-primary text-sm mt-5 inline-flex items-center gap-2">View case study <ArrowUpRight size={15} /></p></div>
        </Link>)}
      </div>
    </section>
  </Layout>;
}
