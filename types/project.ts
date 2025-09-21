// types/project.ts
export interface ProjectImage {
  id: number;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

export interface ProjectDetail {
  id: string;
  title: string;
  category: string;
  year: string;
  shortDescription: string;
  fullDescription: string;
  location: string;
  images: ProjectImage[];
  backgroundImage?: string;
  slug?: string;
}

export interface ProjectDetailPageProps {
  project: ProjectDetail;
}
