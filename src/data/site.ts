// Edit these fields to update personal details across the site.
// Leave a value empty ("") to hide it until verified.

export const site = {
  name: "BMM",
  monogram: "BM",

  title: "Graduate Engineer | Electrical and Electronics Engineering",

  // Image must exist inside public/.
  profilePhoto: "/Electrical%20Engineer.jpeg",

  quotation:
    "Engineering is the discipline of turning complex problems into reliable, practical systems.",

  introduction:
    "Electrical and electronics engineer working across power systems, renewable energy, telecommunications, ICT infrastructure, and engineering design. My work combines technical analysis, digital engineering tools, practical implementation, and a commitment to dependable engineering solutions.",

  disciplineStrip: [
    "POWER SYSTEMS",
    "SOLAR ENERGY",
    "TELECOMMUNICATIONS",
    "ICT",
    "MEP",
    "AUTOMATION",
  ],

  disciplines: "Power Systems / Renewable Energy / Telecommunications / ICT",

  location: "Nairobi, Kenya",

  origin: "https://mosaic-muse-09.lovable.app",

  email: "",
  phone: "",
  linkedin: "",
  github: "",

  // Source repository — fill in when connected to GitHub.
  repo: {
    owner: "",
    name: "",
    branch: "main",
  },

  cvUrl: "/cv/brian-mumo-musyoki-cv.pdf",
  cvIsSample: true,
};

export const repoUrl =
  site.repo.owner && site.repo.name
    ? `https://github.com/${site.repo.owner}/${site.repo.name}`
    : "";

export const repoZipUrl = repoUrl
  ? `${repoUrl}/archive/refs/heads/${site.repo.branch}.zip`
  : "";