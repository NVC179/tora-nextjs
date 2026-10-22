import { notFound } from 'next/navigation'
import { projectsData } from '../../../data/projects'
import { isSection, sections } from '../../../lib/sections'
import ProjectDetail from '../../../components/ProjectDetail'

export function generateStaticParams() {
  return sections.flatMap(section => projectsData[section]
    .filter(project => !project.externalLink && section !== 'studio')
    .map(project => ({ section, projectId: String(project.id) })))
}

export default async function ProjectPage({ params }: {
  params: Promise<{ section: string; projectId: string }>
}) {
  const { section, projectId } = await params
  if (!isSection(section) || section === 'studio') notFound()
  const project = projectsData[section].find(item => String(item.id) === projectId && !item.externalLink)
  if (!project) notFound()
  return <ProjectDetail key={`${section}/${projectId}`} project={project} />
}
