// Constantes globais da aplicação

export const APP_CONFIG = {
  name: "Portfolio AEther",
  version: "1.0.0",
  description: "Portfolio pessoal desenvolvido com React, TypeScript e Tailwind CSS",
  author: "AEther",
  email: "contato@aether.dev",
} as const;

export const NAVIGATION_ITEMS = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "#about" },
  { label: "Projetos", href: "#projects" },
  { label: "Contato", href: "#contact" },
] as const;

export const PROJECT_CATEGORIES = [
  "Todos",
  "Web",
  "Mobile",
  "Desktop",
  "API",
  "Outros",
] as const;

export const TECHNOLOGIES = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "JavaScript",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Next.js",
  "Vue.js",
  "Angular",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Docker",
  "AWS",
  "Firebase",
] as const;

export const ANIMATION_CONFIG = {
  default: {
    duration: 300,
    easing: "ease-in-out",
  },
  fast: {
    duration: 150,
    easing: "ease-out",
  },
  slow: {
    duration: 500,
    easing: "ease-in-out",
  },
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const SOCIAL_LINKS = {
  github: "https://github.com/aether",
  linkedin: "https://linkedin.com/in/aether",
  twitter: "https://twitter.com/aether",
  instagram: "https://instagram.com/aether",
} as const; 