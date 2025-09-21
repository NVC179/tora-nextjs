// utils/featured.ts
import { FeaturedItem } from '../types/featured';

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const formatCategory = (category: string): string => {
  return category.toUpperCase().replace(/\s+/g, ' ').trim();
};

export const sortItemsByDate = (items: FeaturedItem[]): FeaturedItem[] => {
  return [...items].sort((a, b) => a.id - b.id);
};

export const filterItemsByCategory = (
  items: FeaturedItem[], 
  category: string
): FeaturedItem[] => {
  return items.filter(item => 
    item.category.toLowerCase() === category.toLowerCase()
  );
};
