// components/FeaturedItemCard.tsx
import React from 'react';
import Image from 'next/image';
import { FeaturedItemCardProps } from '../types/featured';
import Link from 'next/link';

const FeaturedItemCard: React.FC<FeaturedItemCardProps> = ({
    item,
    isFeatured = false
}) => {
      if (!item) {
    console.error('FeaturedItemCard: item prop is undefined');
    return null;
  }

  // Debug: Check if item has slug
  if (!item.slug) {
    console.error('FeaturedItemCard: item.slug is undefined', item);
    return null;
  }
    if (isFeatured) {
        return (
            <Link
                href={`/projects/${item.slug}`}
                className="group block hover:opacity-90 transition-opacity duration-300"
            >
                {/* Consistent height với regular items trên mobile */}
                <div className="relative h-64 md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden mb-6">
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        priority={true}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
                </div>

                {/* Responsive content layout */}
                <div className="max-w-3xl mx-auto text-center">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                        {item.title}
                    </h3>
                    <hr className="w-full h-0.2 bg-gray-300 mb-4" />
                    <h4 className="text-orange-600 font-medium mb-4 uppercase tracking-wider text-sm">
                        {item.category}
                    </h4>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                        {item.excerpt}
                    </p>
                </div>
            </Link>
        );
    }

    return (
        <Link
            href={`/projects/${item.slug}`}
            className="group block hover:opacity-90 transition-opacity duration-300"
        >
            {/* Consistent height h-64 across all items */}
            <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-25 transition-all duration-300" />
            </div>

            <div className="space-y-3">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
                    {item.title}
                </h3>
                <hr className="w-full h-0.2 bg-gray-300 mb-4" />
                <h4 className="text-orange-600 font-medium uppercase tracking-wider text-sm">
                    {item.category}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {item.excerpt}
                </p>
            </div>
        </Link>
    );
};

export default FeaturedItemCard;
