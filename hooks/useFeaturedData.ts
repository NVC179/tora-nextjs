// hooks/useFeaturedData.ts
import { useState, useEffect } from 'react';
import { FeaturedData, FeaturedItem } from '../types/featured';

interface UseFeaturedDataReturn {
  data: FeaturedData | null;
  loading: boolean;
  error: string | null;
  featuredItem: FeaturedItem | null;
  regularItems: FeaturedItem[];
}

export const useFeaturedData = (initialData?: FeaturedData): UseFeaturedDataReturn => {
  const [data, setData] = useState<FeaturedData | null>(initialData || null);
  const [loading, setLoading] = useState<boolean>(!initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setData(initialData);
      setLoading(false);
      return;
    }

    // Simulate API call or fetch from external source
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);
        // Replace with actual API call
        const response = await fetch('/api/featured');
        if (!response.ok) {
          throw new Error('Failed to fetch featured data');
        }
        const result: FeaturedData = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [initialData]);

  const featuredItem = data?.items.find(item => item.featured) || null;
  const regularItems = data?.items.filter(item => !item.featured) || [];

  return {
    data,
    loading,
    error,
    featuredItem,
    regularItems
  };
};
