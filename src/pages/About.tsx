import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { useSeo } from "@/hooks/use-seo";
const expertise = [
  ["Electrical & Power Systems", ["Installation design & documentation", "Single-line diagrams", "Load assessment", "DIALux lighting analysis", "Testing & inspection records", "Earthing & protection"]],
  ["Renewable Energy & Solar PV", ["Grid-tied, hybrid & off-grid concepts", "String sizing & MPPT", "Inverter & battery selection", "PVsyst modelling", "Feasibility analysis"]],
  ["Telecommunications & ICT", ["Structured cabling", "Wi-Fi design", "Fibre & GPON concepts", "IP networking & simulation", "CCTV systems"]],
  ["Engineering Software", ["Python & Flask", "PostgreSQL", "API & payment workflows", "Captive portals", "Dashboards"]],
  ["MEP & Site Engineering", ["Services coordination", "Site inspections & snagging", "BOQ support", "Commissioning records"]],
] as const;

const process = [["Understand", "Define the problem, requirements, site conditions and constraints."], ["Analyse", "Review data, standards, drawings and design options."], ["Design", "Develop solutions, calculations, diagrams and documentation."], ["Validate", "Check assumptions with measurements, simulations or tests."], ["Document", "Record decisions, findings, limitations and recommendations."]];


const toolProjects: [string, string[]][] = [
  ["AutoCAD / AutoCAD Electrical", ["lighting-design-dialux", "site-documentation-mep"]],
  ["DIALux", ["lighting-design-dialux"]],
  ["PVsyst", ["solar-pv-design"]],
  ["EasyPower & field instruments", ["power-systems-troubleshooting"]],
  ["Python · Flask · PostgreSQL", ["unifi-captive-portal"]],
  ["UniFi Controller", ["unifi-captive-portal"]],
  ["Cisco Packet Tracer", ["gpon-network-simulation"]],
  ["Excel · Word documentation", ["solar-pv-design", "site-documentation-mep"]],
];

export default function About() {
  useSeo({ title: "About — Brian Mumo Musyoki", description: "Education, technical expertise and engineering experience of Brian Mumo Musyoki.", path: "/about" });
  return <Layout><section className="container-wide pt-28 md:pt-32 pb-12"><p className="text-label text-primary mb-4">Professional profile</p><h1 className="text-headline">About Brian</h1></section>
    <section id="about" className="section-light py-24 scroll-mt-20">
      <div className="container-wide grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-label mb-3">02 / About</p>
          <h2 className="text-headline uppercase">Engineering with purpose.</h2>
          <p className="text-label mt-8">Education</p>
          <p className="mt-1">BSc. Electrical and Electronics Engineering — University of Nairobi</p>
        </div>
        <div className="space-y-4 leading-relaxed">
          <p>I am an Electrical and Electronics Engineering professional with an interdisciplinary interest in electrical infrastructure, power systems, renewable energy and telecommunications.</p>
          <p>My experience spans technical design, engineering documentation, site inspections, system troubleshooting, project coordination and software-driven problem-solving.</p>
          <p>I am particularly interested in the convergence of energy systems, communications infrastructure and automation.</p>
        </div>
      </div>
    </section>

    <section id="expertise" className="container-wide py-24 scroll-mt-20">
      <p className="text-label mb-3">03 / Expertise</p>
      <h2 className="text-headline uppercase mb-12">Technical index.</h2>
      <div className="grid md:grid-cols-5 gap-8">
        {expertise.map(([t, items], i) => (
          <div key={t} className="border-t-2 border-highlight pt-4">
            <p className="font-mono text-xs text-muted-foreground">E-0{i + 1}</p>
            <h3 className="font-display font-bold mt-1 mb-3">{t}</h3>
            <ul className="text-sm text-foreground/80 space-y-1">{items.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>

    <section className="section-brand py-20">
      <div className="container-wide">
        <p className="text-label mb-8">Engineering process</p>
        <div className="grid md:grid-cols-5 gap-8">
          {process.map(([t, d], i) => (
            <div key={t}><p className="font-mono text-highlight">0{i + 1}</p><h3 className="font-display font-bold text-xl uppercase mt-1">{t}</h3><p className="text-sm text-muted-foreground mt-2">{d}</p></div>
          ))}
        </div>
      </div>
    </section>

    <section id="experience" className="container-wide py-24 scroll-mt-20">
      <p className="text-label mb-3">04 / Experience</p>
      <h2 className="text-headline uppercase mb-10">Engineering in practice.</h2>
      <div className="border-l border-border pl-6 space-y-8">
        <div><p className="text-label">Academic project</p><h3 className="font-display font-bold text-lg">Final-year project — UniFi Captive Portal Wi-Fi Billing System</h3><p className="text-sm text-muted-foreground">University of Nairobi </p></div>
        <div><p className="text-label">Site & professional experience</p><h3 className="font-display font-bold text-lg">Project Manager - Archscan Associates LTD </h3></div>
        <div><p className="text-label">Site & professional experience</p><h3 className="font-display font-bold text-lg">Junior Project Engineer - Jumba Engineering Services LTD </h3></div>
      </div>
      <p className="text-label mt-16 mb-6">Tools of the trade</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{toolProjects.map(([t, ids]) => (
        <div key={t} className="bg-card border border-border p-5">
          <h3 className="font-display font-bold mb-3">{t}</h3>
          <ul className="space-y-1">{ids.map((id) => { const pr = projects.find((x) => x.id === id); if (!pr) return null; return <li key={id}><Link to={`/projects/${id}`} className="text-sm text-muted-foreground hover:text-highlight">→ {pr.code} {pr.title}</Link></li>; })}</ul>
        </div>))}</div>
    </section>

</Layout>;
}
