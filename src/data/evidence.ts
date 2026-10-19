// Evidence library — add real PDFs to public/evidence/ and point `file` at them.
// Documents with an empty `file` show as "Pending upload" until the PDF is supplied.
export type EvidenceCategory =
  | "Technical Reports"
  | "Electrical Drawings"
  | "Solar PV & PVsyst Reports"
  | "Network Architecture"
  | "Calculations & Analysis"
  | "Site Inspection Reports"
  | "Testing & Commissioning"
  | "Academic Project Documentation"
  | "Other Technical Documents";

export const evidenceCategories: EvidenceCategory[] = [
  "Technical Reports",
  "Electrical Drawings",
  "Solar PV & PVsyst Reports",
  "Network Architecture",
  "Calculations & Analysis",
  "Site Inspection Reports",
  "Testing & Commissioning",
  "Academic Project Documentation",
  "Other Technical Documents",
];

export interface EvidenceDoc {
  id: string;
  title: string;
  description: string;
  category: EvidenceCategory;
  projectId?: string; // links to projects in src/data/projects.ts
  date: string;
  fileType: string;
  fileSize: string;
  pages?: number;
  file: string; // e.g. "/evidence/my-report.pdf" — empty until the real PDF is added
}

export const evidence: EvidenceDoc[] = [
  {
    id: "ev-cv",
    title: "Curriculum Vitae — Brian Mumo Musyoki",
    description: "Current CV summarising education, skills and engineering experience.",
    category: "Other Technical Documents",
    date: "2026",
    fileType: "PDF",
    fileSize: "—",
    file: "/cv/brian-mumo-musyoki-cv.pdf",
  },
  {
    id: "ev-unifi-report",
    title: "UniFi Captive Portal — Technical Project Report",
    description: "Final-year project report covering system architecture, database design, payment workflow and testing.",
    category: "Academic Project Documentation",
    projectId: "unifi-captive-portal",
    date: "To be confirmed",
    fileType: "PDF",
    fileSize: "—",
    file: "",
  },
  {
    id: "ev-unifi-topology",
    title: "Wi-Fi Billing Network Topology",
    description: "Network topology and controller integration diagrams for the captive portal system.",
    category: "Network Architecture",
    projectId: "unifi-captive-portal",
    date: "To be confirmed",
    fileType: "PDF",
    fileSize: "—",
    file: "",
  },
  {
    id: "ev-pvsyst-report",
    title: "PVsyst Simulation Report",
    description: "PV array configuration, string sizing, energy yield and performance-ratio simulation output.",
    category: "Solar PV & PVsyst Reports",
    projectId: "solar-pv-design",
    date: "To be confirmed",
    fileType: "PDF",
    fileSize: "—",
    file: "",
  },
  {
    id: "ev-solar-sld",
    title: "Solar PV Single-Line Diagram",
    description: "Single-line diagram covering PV array, inverter, battery storage and distribution.",
    category: "Electrical Drawings",
    projectId: "solar-pv-design",
    date: "To be confirmed",
    fileType: "PDF",
    fileSize: "—",
    file: "",
  },
  {
    id: "ev-lighting-calcs",
    title: "Lighting Design Calculations and DIALux Output",
    description: "Illuminance and uniformity analysis with luminaire schedules and design rationale.",
    category: "Calculations & Analysis",
    projectId: "lighting-design-dialux",
    date: "To be confirmed",
    fileType: "PDF",
    fileSize: "—",
    file: "",
  },
  {
    id: "ev-power-measurements",
    title: "Power Systems Measurement Records",
    description: "Three-phase voltage measurements, load distribution data and fault investigation notes.",
    category: "Testing & Commissioning",
    projectId: "power-systems-troubleshooting",
    date: "To be confirmed",
    fileType: "PDF",
    fileSize: "—",
    file: "",
  },
  {
    id: "ev-gpon-topology",
    title: "GPON Access Network Topology",
    description: "OLT, splitter architecture and subscriber connectivity diagrams from the simulation study.",
    category: "Network Architecture",
    projectId: "gpon-network-simulation",
    date: "To be confirmed",
    fileType: "PDF",
    fileSize: "—",
    file: "",
  },
  {
    id: "ev-site-inspection",
    title: "Site Inspection and Snagging Report",
    description: "Anonymised inspection records, snagging schedules and MEP coordination notes.",
    category: "Site Inspection Reports",
    projectId: "site-documentation-mep",
    date: "To be confirmed",
    fileType: "PDF",
    fileSize: "—",
    file: "",
  },
];
