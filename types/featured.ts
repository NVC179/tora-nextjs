import { ProjectDetail } from "./project";

export interface FeaturedItem {
  id: number;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  href: string;
  featured: boolean;
  backgroundImage?: string;
}

export interface FeaturedData {
  title: string;
  items: FeaturedItem[];
}

export interface FeaturedSectionProps {
  className?: string;
}

export interface FeaturedItemCardProps {
  item: FeaturedItem;
  isFeatured?: boolean;
}