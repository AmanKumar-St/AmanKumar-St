export interface NavOption {
  id: number;
  label: string;
  sectionId: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageText: string;
  liveUrl?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface Stat {
  value: string;
  label: string;
}

export type SectionId = 'hero' | 'about' | 'projects' | 'skills' | 'contact';