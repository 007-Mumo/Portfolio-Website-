import { useCallback, useEffect, useRef, useState } from "react";
import { getDocument, GlobalWorkerOptions, type PDFDocumentProxy, type PDFPageProxy } from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { ArrowDown, ArrowUp, Expand, Loader2, Maximize, Minimize, RotateCcw, Scan, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";

GlobalWorkerOptions.workerSrc = workerUrl;

type PageInfo = { page: PDFPageProxy; width: number; height: number };
type FitMode = "width" | "page" | "custom";

function PdfPage({ info, scale, scrollRoot, onVisible }: {
  info: PageInfo; scale: number; scrollRoot: HTMLDivElement | null; onVisible: (page: number) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const [nearby, setNearby] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const viewport = info.page.getViewport({ scale });

  useEffect(() => {
    const element = pageRef.current;
    if (!element || !scrollRoot) return;
    const lazy = new IntersectionObserver(([entry]) => setNearby(entry.isIntersecting), { root: scrollRoot, rootMargin: "1000px" });
    const visible = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) onVisible(info.page.pageNumber); }, { root: scrollRoot, rootMargin: "0px 0px -65% 0px", threshold: 0 });
    lazy.observe(element);
    visible.observe(element);
    return () => { lazy.disconnect(); visible.disconnect(); };
  }, [scrollRoot, info.page, onVisible]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !nearby) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    setReady(false);
    setFailed(false);
    const density = Math.min(window.devicePixelRatio || 1, 2);
    const renderViewport = info.page.getViewport({ scale });
    // Bound memory for large drawings while preserving high-resolution zoom.
    const outputScale = Math.min(density, Math.sqrt(16000000 / (renderViewport.width * renderViewport.height)));
    canvas.width = Math.floor(renderViewport.width * outputScale);
    canvas.height = Math.floor(renderViewport.height * outputScale);
    const task = info.page.render({ canvasContext: context, viewport: renderViewport, transform: [outputScale, 0, 0, outputScale, 0, 0] });
    let active = true;
    task.promise.then(() => { if (active) setReady(true); }).catch((error: Error) => { if (active && error.name !== "RenderingCancelledException") setFailed(true); });
    return () => { active = false; task.cancel(); };
  }, [info.page, scale, nearby]);

  return <div ref={pageRef} data-pdf-page={info.page.pageNumber} className="pdf-page relative shrink-0" style={{ width: viewport.width, height: viewport.height }}>
    <canvas ref={canvasRef} role="img" aria-label={`PDF page ${info.page.pageNumber}`} className={`h-full w-full ${ready ? "opacity-100" : "opacity-0"}`} />
    {!ready && <div className="absolute inset-0 flex items-center justify-center text-muted-foreground" role="status">{failed ? "This page could not be rendered." : <Loader2 className="animate-spin" aria-label="Rendering page" />}</div>}
  </div>;
}

export function PdfViewer({ src, title }: { src: string; title: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [scrollRoot, setScrollRoot] = useState<HTMLDivElement | null>(null);
  const [pages, setPages] = useState<PageInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const [fit, setFit] = useState<FitMode>("width");
  const [zoom, setZoom] = useState(1);
  const [size, setSize] = useState({ width: 800, height: 650 });
  const [current, setCurrent] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState("");
  const onVisible = useCallback((number: number) => setCurrent(number), []);

  useEffect(() => {
    if (!scrollRoot) return;
    const observer = new ResizeObserver(() => setSize({ width: scrollRoot.clientWidth, height: scrollRoot.clientHeight }));
    observer.observe(scrollRoot);
    return () => observer.disconnect();
  }, [scrollRoot]);

  useEffect(() => {
    setPages([]); setLoading(true); setError(""); setCurrent(1); setFit("width");
    if (!src) { setLoading(false); return; }
    const abort = new AbortController();
    let active = true;
    let pdf: PDFDocumentProxy | undefined;
    let task: ReturnType<typeof getDocument> | undefined;
    async function load() {
      try {
        const response = await fetch(src, { signal: abort.signal });
        if (!response.ok) throw new Error("Missing PDF");
        const data = new Uint8Array(await response.arrayBuffer());
        // Static hosting can return the app HTML with status 200 for missing files.
        const signature = new TextDecoder().decode(data.slice(0, 1024));
        if (!signature.includes("%PDF-")) throw new Error("Invalid PDF");
        if (!active) return;
        task = getDocument({ data, isEvalSupported: false });
        pdf = await task.promise;
        const result: PageInfo[] = [];
        for (let number = 1; number <= pdf.numPages; number++) {
          if (!active) return;
          const page = await pdf.getPage(number);
          const viewport = page.getViewport({ scale: 1 });
          result.push({ page, width: viewport.width, height: viewport.height });
        }
        if (active) { setPages(result); setLoading(false); }
      } catch {
        if (active) { setError("This PDF is unavailable or could not be read."); setLoading(false); }
      }
    }
    void load();
    return () => { active = false; abort.abort(); if (task) void task.destroy(); else if (pdf) void pdf.destroy(); };
  }, [src, retry]);

  useEffect(() => {
    const listener = () => setFullscreen(document.fullscreenElement === hostRef.current);
    document.addEventListener("fullscreenchange", listener);
    return () => document.removeEventListener("fullscreenchange", listener);
  }, []);

  const widest = Math.max(...pages.map((p) => p.width), 1);
  const tallest = Math.max(...pages.map((p) => p.height), 1);
  const widthScale = Math.max(0.1, (size.width - 32) / widest);
  const scale = fit === "width" ? widthScale : fit === "page" ? Math.min(widthScale, Math.max(0.1, (size.height - 32) / tallest)) : zoom;
  const goToPage = (number: number) => {
    const next = Math.max(1, Math.min(pages.length, number));
    const target = scrollRoot?.querySelector<HTMLElement>(`[data-pdf-page="${next}"]`);
    if (scrollRoot && target) {
      const top = target.getBoundingClientRect().top - scrollRoot.getBoundingClientRect().top + scrollRoot.scrollTop;
      scrollRoot.scrollTo({ top: top - 16, behavior: "instant" });
    }
    setCurrent(next);
  };
  const changeZoom = (factor: number) => { setZoom(Math.min(4, Math.max(0.1, scale * factor))); setFit("custom"); };
  const toggleFullscreen = async () => {
    try {
      setFullscreenError("");
      if (document.fullscreenElement) await document.exitFullscreen();
      else await hostRef.current?.requestFullscreen();
    } catch { setFullscreenError("Full-screen viewing is unavailable in this browser."); }
  };

  return <div ref={hostRef} className="pdf-viewer border border-border bg-background min-w-0" role="region" aria-label={`${title} PDF viewer`}>
    {loading ? <div className="h-80 flex items-center justify-center gap-3 text-muted-foreground" role="status"><Loader2 className="animate-spin" size={20} />Loading document…</div>
      : error ? <div className="h-80 flex flex-col items-center justify-center gap-4 px-6 text-center" role="alert"><p>{error}</p><Button variant="outline" onClick={() => setRetry((n) => n + 1)}><RotateCcw />Retry</Button></div>
      : pages.length === 0 ? <p className="py-24 px-6 text-center text-muted-foreground">No PDF has been added.</p>
      : <>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-2 py-2" aria-label="PDF controls">
          <div className="flex items-center gap-1">
            <Button size="icon" variant="ghost" title="Previous page" aria-label="Previous page" disabled={current <= 1} onClick={() => goToPage(current - 1)}><ArrowUp /></Button>
            <label className="flex items-center gap-2 text-xs font-mono"><span className="sr-only">Page</span><input aria-label="Page number" type="number" min={1} max={pages.length} value={current} onChange={(e) => { const n = Number(e.target.value); if (Number.isInteger(n) && n >= 1 && n <= pages.length) goToPage(n); }} className="w-12 h-9 border border-border bg-background text-center" /><span>/ {pages.length}</span></label>
            <Button size="icon" variant="ghost" title="Next page" aria-label="Next page" disabled={current >= pages.length} onClick={() => goToPage(current + 1)}><ArrowDown /></Button>
          </div>
          <div className="flex items-center gap-1">
            <Button size="icon" variant="ghost" title="Zoom out" aria-label="Zoom out" disabled={scale <= 0.1} onClick={() => changeZoom(1 / 1.2)}><ZoomOut /></Button>
            <output className="w-12 text-center text-xs font-mono" aria-label="Zoom level">{Math.round(scale * 100)}%</output>
            <Button size="icon" variant="ghost" title="Zoom in" aria-label="Zoom in" disabled={scale >= 4} onClick={() => changeZoom(1.2)}><ZoomIn /></Button>
            <Button size="icon" variant="ghost" title="Fit to width" aria-label="Fit to width" aria-pressed={fit === "width"} className={fit === "width" ? "text-primary" : ""} onClick={() => setFit("width")}><Expand /></Button>
            <Button size="icon" variant="ghost" title="Fit to page" aria-label="Fit to page" aria-pressed={fit === "page"} className={fit === "page" ? "text-primary" : ""} onClick={() => setFit("page")}><Scan /></Button>
            {typeof document !== "undefined" && document.fullscreenEnabled && <Button size="icon" variant="ghost" title={fullscreen ? "Exit full screen" : "Full screen"} aria-label={fullscreen ? "Exit full screen" : "Full screen"} onClick={() => void toggleFullscreen()}>{fullscreen ? <Minimize /> : <Maximize />}</Button>}
          </div>
        </div>
        {fullscreenError && <p role="status" className="text-xs text-muted-foreground px-3 py-2">{fullscreenError}</p>}
        <div ref={setScrollRoot} tabIndex={0} aria-label="Scrollable PDF pages" className="pdf-scroll overflow-auto overscroll-contain bg-secondary">
          <div className="pdf-pages flex flex-col items-center gap-5 p-4" style={{ minWidth: widest * scale + 32 }}>
            {pages.map((info) => <PdfPage key={info.page.pageNumber} info={info} scale={scale} scrollRoot={scrollRoot} onVisible={onVisible} />)}
          </div>
        </div>
      </>}
  </div>;
}