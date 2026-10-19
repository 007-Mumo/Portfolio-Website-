import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getProjectDocuments, documentUrl } from "@/data/project-documents";
import { projects } from "@/data/projects";
import { PdfViewer } from "@/components/PdfViewer";

export function EvidenceGallery({ projectId }: { projectId?: string }) {
  const [selectedId, setSelectedId] = useState("");
  if (!projectId) {
    const available = projects.filter((p) => getProjectDocuments(p.id).length > 0);
    return available.length ? <div className="grid sm:grid-cols-2 gap-6">{available.map((p) => <Link key={p.id} to={`/projects/${p.id}#documents`} className="border-b border-border py-4 text-primary hover:text-primary-hover">{p.title}<span className="block text-xs text-muted-foreground mt-2">{getProjectDocuments(p.id).length} documents</span></Link>)}</div> : <p className="text-muted-foreground py-8">No project documents have been added yet.</p>;
  }
  const documents = getProjectDocuments(projectId);
  const selected = documents.find((d) => d.id === selectedId) ?? documents[0];
  if (!selected) return <p className="text-muted-foreground py-12 text-center border border-dashed border-border">No project documents have been added yet.</p>;
  let src = "";
  try { src = documentUrl(selected.filename); } catch { /* Invalid configuration stays local and shows an error. */ }
  return <>
    {documents.length > 1 && <div role="group" aria-label="Project documents" className="flex flex-wrap gap-2 mb-6">{documents.map((d) => <Button key={d.id} variant={selected.id === d.id ? "default" : "outline"} aria-pressed={selected.id === d.id} onClick={() => setSelectedId(d.id)} className="h-auto whitespace-normal text-left">{d.title}</Button>)}</div>}
    <h2 className="font-display font-bold text-xl mb-2">{selected.title}</h2>
    <p className="text-muted-foreground mb-6">{selected.description}</p>
    {src ? <PdfViewer key={`${projectId}/${selected.id}`} src={src} title={selected.title} /> : <p role="alert">This document has an invalid local PDF filename.</p>}
  </>;
}
