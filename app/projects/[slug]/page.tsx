// app/projects/[slug]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import ImageGallery from '../../../components/ImageGallery';
import { projectsData } from '../../../data/featured';
import Header from '../../../components/Header';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for SEO - Fix async params
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params; // Await params first
  const project = projectsData[slug];

  if (!project) {
    return {
      title: 'Project Not Found - tôra studio',
    };
  }

  return {
    title: `${project.title} - tôra studio`,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: project.images.length > 0 ? [project.images[0].src] : [],
    },
  };
}

// Generate static params for build time
export async function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({
    slug,
  }));
}

// Main component - Fix async params
const ProjectDetailPage: React.FC<ProjectPageProps> = async ({ params }) => {
  const { slug } = await params; // Await params first
  const project = projectsData[slug];

  if (!project) {
    notFound();
  }

  return (
    <>
      {/* Header với backgroundImage từ project data */}
      <Header
        backgroundImage={project.backgroundImage} // Sử dụng dedicated background
        title={project.title}
        subtitle={project.category}
        showHeroContent={true}
      />
      <div className="pt-[80vh] bg-white">
        <div className="container mx-auto px-6 pb-16 max-w-7xl">
          {/* Project Details - Full Width Distribution */}
          <div className="container-fluid mt-2 pt-2 mb-16">
            {/* Top border line */}
            <div className="w-full mb-8">
              <hr className="border-gray-200 border-t-2" />
            </div>

            <div className="w-full px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center w-full">
                {/* Location Field */}
                <div className="creative-field-area relative flex-1">
                  <h3 className="creative-field-title text-lg font-semibold text-gray-900 mb-3">
                    Địa điểm
                  </h3>
                  <p className="creative-field-text text-gray-700">
                    {project.location}
                  </p>

                  {/* Vertical separator line - hidden on mobile */}
                  <div className="hidden md:block absolute top-0 right-0 h-full w-px bg-gray-200"></div>
                </div>

                {/* Year Field */}
                <div className="creative-field-area relative flex-1">
                  <h3 className="creative-field-title text-lg font-semibold text-gray-900 mb-3">
                    Năm thực hiện
                  </h3>
                  <p className="creative-field-text text-gray-700">
                    {project.year}
                  </p>

                  {/* Vertical separator line - hidden on mobile */}
                  <div className="hidden md:block absolute top-0 right-0 h-full w-px bg-gray-200"></div>
                </div>

                {/* Category Field */}
                <div className="creative-field-area flex-1">
                  <h3 className="creative-field-title text-lg font-semibold text-gray-900 mb-3">
                    Hạng mục
                  </h3>
                  <p className="creative-field-text text-gray-700">
                    {project.category}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom border line */}
            <div className="w-full mt-8">
              <hr className="border-gray-200 border-t-2" />
            </div>
          </div>



          {/* Image Gallery - Centered */}
          <div className="mb-12">
            <div className="max-w-5xl mx-auto">
              <ImageGallery images={project.images} projectTitle={project.title} />
            </div>
          </div>

          {/* Project Description - Aligned with Image Gallery */}
          <div className="max-w-5xl mx-auto">
            <div className="prose prose-lg max-w-none">

              <div className="text-gray-700 leading-relaxed space-y-4">
                {project.fullDescription.split('\n').map((paragraph, index) => {
                  const trimmedParagraph = paragraph.trim();
                  if (trimmedParagraph === '') {
                    return <br key={index} />;
                  }
                  return (
                    <p key={index} className="mb-4 text-justify">
                      {trimmedParagraph}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>


          {/* Navigation */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex justify-center">
              <Link
                href="/#featured"
                className="inline-flex items-center text-orange-600 hover:text-orange-700 transition-colors duration-200 font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Quay lại danh sách dự án
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailPage;
