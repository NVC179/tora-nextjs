export interface ProductInfo {
  size: string;
  material: string;
  price: string;
}

export interface Project {
  id: number
  title: string
  location?: string | undefined
  period?: string | undefined
  image: string
  category?: string
  description?: string
  gallery?: string[]
  shortDescription?: string | undefined
  externalLink?: string | undefined
  productInfo?: ProductInfo;
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
