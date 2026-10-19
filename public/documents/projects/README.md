# Project PDFs

Place real project PDFs in this directory. They are deployed at
`/documents/projects/<filename>.pdf` by Vite's public-file handling.

Update `src/data/project-documents.ts`: add one record per PDF to the matching
project's array. Empty arrays are intentional until actual project documents
are supplied. Do not add the sample CV as project evidence.

```ts
"solar-pv-design": [
  {
    id: "solar-report",
    filename: "solar-design.pdf",
    title: "Solar PV design report",
    description: "Project design report and supporting drawings.",
    order: 1,
  },
],
```

Add more records with unique IDs and increasing `order` for multiple PDFs.
Replace a PDF under the same filename to update it, or change `filename` to
match its replacement. Filenames are relative to this directory, not full URLs.
Names are case-sensitive on deployment. Publish after adding or replacing files.

The viewer preserves PDF pages and allows continuous scrolling, page selection,
zoom, fit-to-width, fit-to-page and supported browser full-screen viewing.
Download, print and direct-open controls are intentionally omitted. Public PDFs
are still accessible to a determined visitor; this is not copy protection.

After publication, check each project's document view, scrolling, mobile zoom,
landscape drawings and missing-file errors. No production PDFs can be verified
until the actual PDFs are added and the update is published.

## Files changed for this integration

- `src/components/PdfViewer.tsx` — continuous canvas PDF rendering and viewing controls.
- `src/data/project-documents.ts` — central local PDF configuration for the six existing projects.
- `src/data/project-documents.test.ts` — local path, ordering and empty-configuration tests.
- `src/pages/Evidence.tsx` — display configured documents only, without direct-open controls.
- `src/pages/Project.tsx` — replace the case-study image placeholder with project PDFs.
- `src/pages/Index.tsx`, `src/components/Header.tsx` — crimson link and navigation hover states.
- `src/index.css`, `tailwind.config.ts`, `src/components/ui/button.tsx` — crimson tokens and PDF sizing.
- `package.json`, `bun.lockb` — PDF.js dependency and dependency lockfile.
- `public/documents/projects/.gitkeep`, `public/documents/projects/README.md` — local directory and instructions.
- `AGENTS.md`, `roadmap.md` — architecture rule and verification status.

The contact function, existing project records, public routes and `netlify.toml`
were left unchanged. Preview checks passed for three-page scrolling, zoom,
portrait/landscape pages, full-screen, phone sizing, missing-file errors and retry
using a temporary test fixture. Visual review caught page-navigation scrolling
the toolbar behind the fixed site menu; navigation now scrolls only the PDF pane.
Test fixtures were not added to the portfolio or production files.