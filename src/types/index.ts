// Tipos globais da aplicação

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  link?: string;
  github?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  subject: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface Theme {
  name: string;
  value: string;
}

export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
}

export interface PerformanceMetrics {
  fps: number;
  memory: number;
  loadTime: number;
} 