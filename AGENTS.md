# Architecture rules
- Keep editable profile content in site data, engineering records in project data, and local PDF metadata in project-document data so pages share one source of truth.
- Use four canonical public pages and /projects/:id case studies; legacy URLs redirect for compatibility.
- Embed a reusable PDF.js canvas viewer within case studies, with local public PDF filenames in the central project-document configuration, so documents remain project-connected without browser PDF download/print controls or document backend services.
- Submit public contact messages through a validated Cloud function into a private table; never expose message reads to visitors.