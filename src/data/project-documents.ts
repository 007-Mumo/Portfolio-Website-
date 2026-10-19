export interface ProjectDocument {
  id: string;
  filename: string;
  title: string;
  description: string;
  order: number;
}

export const projectDocuments: Record<string, ProjectDocument[]> = {
  "unifi-captive-portal": [
  
    {
      id: "unifi-feasibility",
      filename: "Unifi-Captive portal/ECONOMIC FEASIBILITY STUDY OF A GPON BILLING SYSTEM.pdf",
      title: "Economic Feasibility Study",
      description: "Economic feasibility study for the project.",
      order: 1,
    },
  ],

  "solar-pv-design": [
    {
      id: "solar-horizon",
      filename: "Solar -PV Design/Horizon.pdf",
      title: "Horizon",
      description: "Solar PV project document.",
      order: 1,
    },
    {
      id: "solar-plot",
      filename: "Solar -PV Design/Plot.pdf",
      title: "Solar Plot",
      description: "Solar project plot document.",
      order: 2,
    },
    {
      id: "solar-wajir-schematics",
      filename: "Solar -PV Design/WAJIR SCHEMATICS .pdf",
      title: "Wajir Schematics",
      description: "Electrical schematics for the Wajir project.",
      order: 3,
    },
    {
      id: "solar-wajir-report",
      filename: "Solar -PV Design/WAJIR_Project.VC0-Report.pdf",
      title: "Wajir Project Report",
      description: "Wajir project report.",
      order: 4,
    },
  ],

  "lighting-design-dialux": [
    {
      id: "lighting-hadu",
      filename: "Lighting Design Dialux/HADU VOCATIONAL TRAINING CENTRE _Report.pdf",
      title: "Hadu Lighting Design",
      description: "Lighting design documentation.",
      order: 1,
    },
  ],

  "power-systems-troubleshooting": [
    {
      id: "ac-combiner-board",
      filename: "Power Systems-Trouble shooting/AC Combiner Board.pdf",
      title: "AC Combiner Board",
      description: "AC combiner board documentation.",
      order: 1,
    },
    {
      id: "anita-sld",
      filename: "Power Systems-Trouble shooting/ANITA.SLD.pdf",
      title: "ANITA Single-Line Diagram",
      description: "Electrical single-line diagram documentation.",
      order: 2,
    },
    {
      id: "koma-gardens",
      filename: "Power Systems-Trouble shooting/KOMA GARDENS.pdf",
      title: "Koma Gardens",
      description: "Electrical project documentation.",
      order: 3,
    },
    {
      id: "sld-diagram-1",
      filename: "Power Systems-Trouble shooting/SLD DIAGRAM 1.pdf",
      title: "HADU MAIN SLD ",
      description: "Electrical distribution diagram.",
      order: 4,
    },
    {
      id: "sld-diagram-2",
      filename: "Power Systems-Trouble shooting/SLD DIAGRAM 2.pdf",
      title: "HADU SUB SLD ",
      description: "Electrical distribution diagram.",
      order: 5,
    },
  ],



  "site-documentation-mep": [
    {
      id: "kes-lights",
      filename: "Site Documentation - MEP/KES-1.A.LIGHTS.pdf",
      title: "KES Lighting Layout",
      description: "Lighting layout documentation.",
      order: 1,
    },
    {
      id: "kes-power",
      filename: "Site Documentation - MEP/KES-1.A.POWER.pdf",
      title: "KES Power Layout",
      description: "Electrical power layout documentation.",
      order: 2,
    },
    {
      id: "kes-anita-power",
      filename: "Site Documentation - MEP/KES-1.ANITA.POWER.pdf",
      title: "Anita Power Layout",
      description: "Electrical power layout documentation.",
      order: 3,
    },
    {
      id: "lighting-hadu-mep",
      filename: "Site Documentation - MEP/LIGHTING-HADU.pdf",
      title: "Hadu Lighting",
      description: "Lighting documentation.",
      order: 4,
    },
    {
      id: "lighting",
      filename: "Site Documentation - MEP/LIGHTING.pdf",
      title: "Lighting Plan",
      description: "Lighting layout documentation.",
      order: 5,
    },
    {
      id: "mech-d",
      filename: "Site Documentation - MEP/MECH - D.pdf",
      title: "Mechanical Drawing D",
      description: "Mechanical services drawing.",
      order: 6,
    },
    {
      id: "mech-p",
      filename: "Site Documentation - MEP/MECH - P.pdf",
      title: "Mechanical Drawing P",
      description: "Mechanical services drawing.",
      order: 7,
    },
    {
      id: "mech-all",
      filename: "Site Documentation - MEP/MECH-ALL.pdf",
      title: "Mechanical Services — All",
      description: "Combined mechanical services drawing.",
      order: 8,
    },
    {
      id: "power-hadu",
      filename: "Site Documentation - MEP/POWER - HADU .pdf",
      title: "Hadu Power",
      description: "Electrical power documentation.",
      order: 9,
    },
    {
      id: "power",
      filename: "Site Documentation - MEP/POWER.pdf",
      title: "Power Plan",
      description: "Electrical power layout documentation.",
      order: 10,
    },
    
  ],
};

export function documentUrl(filename: string): string {
  const segments = filename.split("/");

  if (
    !filename.toLowerCase().endsWith(".pdf") ||
    segments.some(
      (part) => !part || part === "." || part === "..",
    ) ||
    /[:\\?#]/.test(filename)
  ) {
    throw new Error("Project documents must be local PDF filenames.");
  }

  return `/documents/projects/${segments
    .map(encodeURIComponent)
    .join("/")}`;
}

export function getProjectDocuments(
  projectId: string,
  config = projectDocuments,
): ProjectDocument[] {
  return [...(config[projectId] ?? [])].sort(
    (a, b) => a.order - b.order,
  );
}