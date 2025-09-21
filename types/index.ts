export interface Project {
  id: number
  title: string
  location: string
  period: string
  image: string
  category: string
  description: string
  gallery: string[]
}

export interface ProjectsData {
  works: Project[]
  journal: Project[]
  shop: Project[]
  studio: Project[]
}

export interface Categories {
  works: string[]
  journal: string[]
  shop: string[]
  studio: string[]
}
