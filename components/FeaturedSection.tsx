// components/FeaturedSection.tsx
'use client';

import React, { useMemo } from 'react';
import { featuredData } from '../data/featured';
import { FeaturedSectionProps, FeaturedItem } from '../types/featured';
import FeaturedItemCard from './FeaturedItemCard';


const FeaturedSection: React.FC<FeaturedSectionProps> = ({ 
  otherProjects,
  className = "" 
}) => {
  const { title, items } = featuredData;

  const { featuredItem, regularItems } = useMemo(() => {
    const featured = items.find((item: FeaturedItem) => item.featured) || null;
    const regular = items.filter((item: FeaturedItem) => !item.featured);
    
    return {
      featuredItem: featured,
      regularItems: regular
    };
  }, [items]);

  return (
    <section 
      id="featured" 
      className={`container mx-auto px-6 pb-16 pt-4 max-w-7xl ${className}`}
      data-aos="fade"
    >
      <div className="grid grid-cols-1 gap-8">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
        </div>

        {/* Featured Item - Full Width */}
        {featuredItem && (
          <FeaturedItemCard 
            item={featuredItem} 
            isFeatured={true} 
          />
        )}

        {/* Regular Items Grid */}
        {regularItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {regularItems.map((item: FeaturedItem) => (
              <FeaturedItemCard 
                key={item.id} 
                item={item} 
                isFeatured={false} 
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedSection;
