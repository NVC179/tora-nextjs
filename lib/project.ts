import fs from "node:fs/promises";
import path from "node:path";

type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  location?: string;
  cover: string;
  images: string[];
  excerpt: string;
  content: string[];
};

const dataPath = path.join(process.cwd(), "content", "projects.json");

export async function getAllProjects(opts?: { limit?: number }): Promise<Project[]> {
  const raw = await fs.readFile(dataPath, "utf8");
  const arr: Project[] = JSON.parse(raw);
  const sorted = arr; // có thể sort theo thời gian nếu bổ sung field date
  return opts?.limit ? sorted.slice(0, opts.limit) : sorted;
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const list = await getAllProjects();
  return list.map(p => p.slug);
}

export async function getProjectBySlug(slug: string): Promise<Project> {
  const list = await getAllProjects();
  const found = list.find(p => p.slug === slug);
  if (!found) throw new Error("Not found");
  return found;
}
