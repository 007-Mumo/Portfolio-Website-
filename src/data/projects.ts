import switchgear from "@/assets/Eng-Site.jpeg";
import solar from "@/assets/STOCK PANEL DESIGN.jpg";
import fibre from "@/assets/eng-fibre.jpg";
import drawings from "@/assets/Eng-Drawings .jpg";
import site from "@/assets/Eng-Drawings .jpg";
import lighting from "@/assets/Eng-Lighting (2).jpg";
import wifi from "@/assets/TEL.jpeg";
import testing from "@/assets/Eng.Switch Gear.jpg";

export const heroImages = [switchgear, solar, fibre, drawings, site, lighting, wifi, testing];

export type Filter =
  | "Electrical Design"
  | "Solar & Energy"
  | "Telecommunications & ICT"
  | "Software & Automation"
  | "Site Engineering";

export const filters: Filter[] = [
  "Electrical Design",
  "Solar & Energy",
  "Telecommunications & ICT",
  "Software & Automation",
  "Site Engineering",
];

export interface Project {
  id: string;
  code: string;
  title: string;
  category: string;
  filters: Filter[];
  type: "Academic project" | "Design study" | "Simulation" | "Site work" | "Technical case study";
  summary: string;
  coverImage: string;
  // Editable metadata — "To be confirmed" until verified.
  meta: { date: string; location: string; status: string; team: string; role: string; deliverables: string };
  context: string;
  role: string;
  approach: string[];
  tools: string[];
  challenges: string;
  lessons: string;
}

const tbc = "To be confirmed";

export const projects: Project[] = [
  {
    id: "unifi-captive-portal",
    code: "PRJ-01",
    title: "UniFi Captive Portal Wi-Fi Billing System",
    category: "Telecommunications / Software",
    filters: ["Telecommunications & ICT", "Software & Automation"],
    type: "Academic project",
    summary: "A Wi-Fi access and billing system for student hostels, linking network access management with mobile payment workflows. Final-year engineering project.",
    coverImage: wifi,
    meta: { date: "March 2026", location: "Nairobi, Kenya", status: "Final-year project", team: "The University of Nairobi", role: "Developer & system designer", deliverables: "Backend, database, admin dashboard, report" },
    context: "Student hostels need a simple way to sell timed Wi-Fi access without manual vouchers. The project explores how network authorisation can be tied to mobile payments.",
    role: "Designed the system architecture and developed the backend, database and controller integration as part of a final-year project.",
    approach: [
      "Flask backend development",
      "PostgreSQL database integration",
      "UniFi controller integration",
      "PayHero M-Pesa STK Push payment workflow",
      "Payment callback handling and session management",
      "Client authorisation and timed Wi-Fi access",
      "Administrative dashboard and transaction tracking",
    ],
    tools: ["Python", "Flask", "PostgreSQL", "UniFi Controller", "REST APIs"],
    challenges: "Handling asynchronous payment callbacks reliably and keeping network sessions in sync with payment records. Implemented versus planned features are to be listed once documented.",
    lessons: "No production deployment or live revenue is claimed. Results to be added from the project report.",
  },
  {
    id: "solar-pv-design",
    code: "PRJ-02",
    title: "Solar PV System Design and Analysis",
    category: "Renewable Energy",
    filters: ["Solar & Energy"],
    type: "Design study",
    summary: "Solar system design work including PVsyst modelling, string sizing and technical assessment.",
    coverImage: solar,
    meta: { date: "Ongoing", location: "Country wide ", status: "In progress", team :"Smart Lamp Energy LTD ", role: "PV Design Engineer", deliverables: "PVsyst report, array layout, system diagram" },
    context: "Assessing energy demand and sizing a PV system with storage to meet it reliably.",
    role: "Responsibilities to be confirmed from project records.",
    approach: ["PV array configuration and string sizing", "MPPT allocation", "Hybrid inverter integration", "Battery storage considerations", "Energy demand and system sizing", "Performance simulation", "Technical and financial assessment"],
    tools: ["PVsyst", "Microsoft Excel", "AutoCAD"],
    challenges: "Balancing array size, inverter limits and battery capacity against demand and budget.",
    lessons: "Installed capacity and performance figures will be shown only once verified.",
  },
  {
    id: "lighting-design-dialux",
    code: "PRJ-03",
    title: "Lighting Design and DIALux Analysis",
    category: "Electrical Design",
    filters: ["Electrical Design"],
    type: "Design study",
    summary: "Lighting design covering fixture selection, illuminance and uniformity analysis with DIALux.",
    coverImage: lighting,
    meta: { date: "Ongoing", location: "Country wide ", status: "In progress", team: "Archscan Associates LTD ", role: "Junior Consultanting Engineer", deliverables: "Lighting layouts, luminaire schedules, DIALux outputs" },
    context: "Providing compliant, comfortable lighting levels while managing energy use.",
    role: "Responsibilities to be confirmed from project records.",
    approach: ["Lighting design objectives", "Fixture selection and positioning", "Illuminance and uniformity analysis", "DIALux visualisations", "Lighting layouts and schedules", "Design rationale and calculations"],
    tools: ["DIALux", "AutoCAD Electrical"],
    challenges: "Achieving uniformity targets with practical fixture positions.",
    lessons: "DIALux outputs and layouts to be added.",
  },
  {
    id: "power-systems-troubleshooting",
    code: "PRJ-04",
    title: "Electrical Power Systems and Troubleshooting",
    category: "Power Systems",
    filters: ["Electrical Design", "Site Engineering"],
    type: "Technical case study",
    summary: "Investigations into distribution, inverter and changeover systems, and power quality.",
    coverImage: testing,
    meta: { date: "Ongoing", location: "Country wide ", status: "In progress", team: "Jumba Engineering Services LTD ", role: "Field Systems Engineer", deliverables: "Test results, recommendations" },
    context: "Understanding faults and imbalance in low-voltage installations through measurement.",
    role: "Responsibilities to be confirmed from project records.",
    approach: ["Inverter and changeover system operation", "Three-phase voltage measurements", "Load distribution and imbalance", "Protective-device coordination", "Fault investigation workflow"],
    tools: ["Multimeter", "Clamp meter", "EasyPower", "Microsoft Excel"],
    challenges: "Measured results are kept separate from hypotheses and proposed corrective actions.",
    lessons: "Findings to be added where supporting records exist.",
  },
 
  {
    id: "site-documentation-mep",
    code: "PRJ-05",
    title: "Site Documentation and MEP Coordination",
    category: "Site Engineering",
    filters: ["Site Engineering"],
    type: "Site work",
    summary: "Drawing reviews, inspection reports, snagging schedules and BOQ support.",
    coverImage: site,
    meta: { date: "Ongoing", location: "Country wide ", status: "In progress", team: "Jumba Engineering Services LTD ", role: "MEP Engineer", deliverables: "Inspection reports, snag lists, BOQ workbooks" },
    context: "Keeping electrical, mechanical and plumbing work coordinated and documented on site.",
    role: "Responsibilities to be confirmed from project records.",
    approach: ["Electrical and MEP drawing reviews", "Site inspection reports", "Snagging schedules", "BOQ and valuation workbooks", "Testing and commissioning templates"],
    tools: ["AutoCAD", "Microsoft Excel", "Microsoft Word"],
    challenges: "Records will be anonymised to remove client and commercially sensitive details.",
    lessons: "Anonymised documents to be added.",
  },
];
