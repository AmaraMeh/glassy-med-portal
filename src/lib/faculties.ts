export type FacultySpecialty = {
  year: number;
  name: string;
};

export type FacultyDefinition = {
  slug: string;
  displayName: string;
  frenchName: string;
  basePath: string;
  primaryColorClass: string;
  heroTagline?: string;
  specialties?: FacultySpecialty[];
};

export const FACULTIES: FacultyDefinition[] = [
  {
    slug: "medicine",
    displayName: "Faculty of Medicine",
    frenchName: "Faculté de Médecine",
    basePath: "/",
    primaryColorClass: "text-primary",
    heroTagline: "University of Béjaïa Interactive Student Portal",
  },
  {
    slug: "technologie",
    displayName: "Faculty of Technology",
    frenchName: "Faculté de Technologie",
    basePath: "/faculties/technologie",
    primaryColorClass: "text-blue-600",
    heroTagline: "Portail de la Faculté de Technologie",
    specialties: [
      { year: 1, name: "ST LMD" },
      { year: 1, name: "ST ING" },
      { year: 1, name: "Architecture" },
    ],
  },
  {
    slug: "lettres-langues",
    displayName: "Faculty of Letters and Languages",
    frenchName: "Faculté des Lettres et des Langues",
    basePath: "/faculties/lettres-langues",
    primaryColorClass: "text-rose-600",
    heroTagline: "Portail de la Faculté des Lettres et des Langues",
    specialties: [
      { year: 1, name: "Anglais" },
      { year: 1, name: "Français" },
      { year: 1, name: "Arabe" },
      { year: 1, name: "Tamazight" },
      { year: 1, name: "Traduction" },
    ],
  },
  {
    slug: "droit-sciences-politiques",
    displayName: "Faculty of Law and Political Science",
    frenchName: "Faculté de Droit et des Sciences Politiques",
    basePath: "/faculties/droit-sciences-politiques",
    primaryColorClass: "text-emerald-600",
    heroTagline: "Portail de la Faculté de Droit et Sciences Politiques",
    specialties: [
      { year: 1, name: "Droit" },
    ],
  },
  {
    slug: "segc",
    displayName: "Faculty of Economic Sciences, Management and Commercial Sciences",
    frenchName: "Sciences Économiques, de Gestion et Commerciales",
    basePath: "/faculties/segc",
    primaryColorClass: "text-teal-600",
    heroTagline: "Portail de la Faculté SEGC",
    specialties: [
      { year: 1, name: "SEGC" },
    ],
  },
  {
    slug: "shs",
    displayName: "Faculty of Human and Social Sciences",
    frenchName: "Faculté des Sciences Humaines et Sociales",
    basePath: "/faculties/shs",
    primaryColorClass: "text-fuchsia-600",
    heroTagline: "Portail de la Faculté des Sciences Humaines et Sociales",
    specialties: [
      { year: 1, name: "STAPS" },
      { year: 1, name: "Sciences humaines" },
      { year: 1, name: "Sciences sociales" },
    ],
  },
  {
    slug: "sciences-exactes",
    displayName: "Faculty of Exact Sciences",
    frenchName: "Faculté des Sciences Exactes",
    basePath: "/faculties/sciences-exactes",
    primaryColorClass: "text-indigo-600",
    heroTagline: "Portail de la Faculté des Sciences Exactes",
    specialties: [
      { year: 1, name: "Informatique LMD" },
      { year: 1, name: "Informatique ING" },
      { year: 1, name: "Sciences de la matière" },
      { year: 1, name: "Mathématiques" },
    ],
  },
  {
    slug: "snv",
    displayName: "Faculty of Natural and Life Sciences",
    frenchName: "Faculté des Sciences de la Nature et de la Vie",
    basePath: "/faculties/snv",
    primaryColorClass: "text-green-700",
    heroTagline: "Portail de la Faculté SNV",
    specialties: [
      { year: 1, name: "Biologie" },
      { year: 1, name: "Sciences de la matière" },
    ],
  },
];

export const getFacultyBySlug = (slug?: string | null) => {
  if (!slug) return null;
  return FACULTIES.find(f => f.slug === slug) || null;
};

export const getFacultyByBasePath = (path: string) => {
  return FACULTIES.find(f => f.basePath === path) || null;
};

