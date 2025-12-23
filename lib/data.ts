import { LucideIcon, Code, Palette, Zap, Database, Terminal } from "lucide-react";

export type Skill = {
  name: string;
  icon: LucideIcon;
  description: string;
};

export const skills: Skill[] = [
  { name: "HTML", icon: Code, description: "Structure semantique et accessibilite native." },
  { name: "CSS", icon: Palette, description: "UI responsive, flex/grid, animations legeres." },
  { name: "JavaScript", icon: Zap, description: "Logique front, interactions fluides et propres." },
  { name: "Python", icon: Terminal, description: "Scripts, APIs simples, automatisations." },
  { name: "SQL", icon: Database, description: "Modelisation basique, requetes CRUD et filtres." },
  { name: "React", icon: Code, description: "Composants reutilisables, hooks, state management." },
  { name: "Next.js", icon: Code, description: "Routing App Router, performances et SEO." },
];

export type Project = {
  title: string;
  description: string;
  stack: string;
  features: string[];
  codeUrl?: string;
  demoUrl?: string;
};

export const projects: Project[] = [
  {
    title: "Site vitrine - Boucherie Limare",
    description: "Vitrine React/Next.js Tailwind en TypeScript, proche du style de ce portfolio avec CTA clairs et pages optimisées.",
    stack: "Next.js, React, Tailwind, TypeScript",
    features: [
      "Mise en avant des spécialités et promotions",
      "Parcours mobile-first avec sections claires",
      "Call-to-action contact et infos pratiques",
    ],
    demoUrl: "https://boucherie-limare.com",
    codeUrl: "https://github.com/AntoineDev-fr/Site-boucherie-limare",
  },
  {
    title: "Annuaire entreprises multi-sites (C#)",
    description: "Application C# pour gérer des entreprises réparties sur plusieurs sites (Rouen, Lyon, etc.), équipes et postes (compta, support…).",
    stack: "C#, ASP.NET Core, SQL",
    features: [
      "CRUD entreprises, agences et employés",
      "Filtrage par site, poste, équipe",
      "Gestion des rôles et contacts internes",
    ],
    codeUrl: "https://github.com/AntoineDev-fr/EnterpriseDirectory-WPF",
  },
  {
    title: "Arcane Ticketing (C#)",
    description: "Gestionnaire de tickets sur thème Arcane : demandes, statut, priorisation, historique.",
    stack: "C#, ASP.NET Core MVC, SQL",
    features: [
      "CRUD complet tickets et commentaires",
      "Statuts, priorités, affectation équipes",
      "Historique et filtres par projet/utilisateur",
    ],
    codeUrl: "https://github.com/AntoineDev-fr/HextechAssist",
  },
];

export const timeline = [
  {
    title: "Formation Concepteur Developpeur d'Applications en alternance",
    detail: "Approfondissement des fondamentaux web, bonnes pratiques et projets guides.",
  },
  {
    title: "Terminale - specialites NSI et Maths",
    detail: "Decouverte des bases de l'algorithmie et de la logique de programmation.",
  },
  {
    title: "Stage de 3e - MCN",
    detail: "Premiere immersion en entreprise, decouverte du cycle de developpement.",
  }
];

export const softSkills = [
  {
    title: "Esprit d'equipe",
    text: "Collaboration et partage pour avancer vite et proprement.",
  },
  {
    title: "Adaptabilite",
    text: "Capacite a monter en competence sur de nouveaux outils et contraintes.",
  },
  {
    title: "Communication",
    text: "Restitution claire, ecoute des besoins, feedback concis.",
  },
];
