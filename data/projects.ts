// data/projects.ts
export interface Project {
  id: string
  title: string
  description: string
  images: string[]
  category: string
  year: string
  location: string
}

export const projects: Project[] = [
  {
    id: 'a3003',
    title: 'Căn hộ A3003',
    description: 'Sắc và hình của hoài niệm',
    images: ['/projects/a3003/main.jpg'],
    category: 'Apartment',
    year: '2024',
    location: 'Hà Nội'
  },
  {
    id: 'seeson-popup',
    title: 'Seeson Pop-up Store',
    description: 'Không gian linh hoạt như quả bóng bay',
    images: ['/projects/seeson/main.jpg'],
    category: 'Commercial',
    year: '2024',
    location: 'Sài Gòn'
  },
  // Add more projects based on the website content
]
