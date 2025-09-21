// utils/staticProjectSelection.ts
import { ProjectDetail } from '../types/project';

export const getStaticRandomProject = (projects: ProjectDetail[]): {
  featuredProject: ProjectDetail;
  otherProjects: ProjectDetail[];
} => {
  // Use current hour as seed để change theo giờ
  const now = new Date();
  const hourSeed = now.getHours() + now.getDate(); // Changes every hour + daily variation
  
  const randomIndex = hourSeed % projects.length;
  const featuredProject = projects[randomIndex];
  const otherProjects = projects.filter((_, index) => index !== randomIndex);
  
  return { featuredProject, otherProjects };
};
