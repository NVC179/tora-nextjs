import Link from "next/link";
import Image from "next/image";

type Project = {
  slug: string;
  image: string;
  title: string;
  category: string;
  year: string | number;
  subtitle: string;
  description: string;
  location: string;
  backgroundImage?: string;
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="project-card">
        <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="project-image object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">
              {project.category}
            </span>
            <span className="text-xs text-gray-400">
              {project.year}
            </span>
          </div>
          
          <h3 className="text-lg font-light text-gray-900 mb-1 group-hover:text-gray-600 transition-colors">
            {project.title}
          </h3>
          
          <p className="text-sm text-gray-500 mb-3">
            {project.subtitle}
          </p>
          
          <p className="text-sm text-gray-600 line-clamp-2">
            {project.description}
          </p>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <span className="text-xs text-gray-400 uppercase tracking-wide">
              {project.location}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}