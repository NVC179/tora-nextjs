import Hero from '../components/Hero';
import FeaturedSection from '../components/FeaturedSection';
import Header from '../components/Header';
import { projectsData } from '../data/featured';
import { getStaticRandomProject } from '../utils/staticSelectProject';

export default function HomePage() {
  const allProjects = Object.values(projectsData);
  const { featuredProject, otherProjects } = getStaticRandomProject(allProjects);

  if (!featuredProject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dự án...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Add Header specifically for homepage */}
      <Header/>    

      <div className="pt-[80vh]">
        <FeaturedSection 
          otherProjects={otherProjects} 
          className="mb-16" 
        />
        {/* Other homepage sections */}
      </div>
    </>
  );
}
