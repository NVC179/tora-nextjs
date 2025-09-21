// components/ImageGallery.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ProjectImage } from '../types/project';

interface ImageGalleryProps {
  images: ProjectImage[];
  projectTitle: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, projectTitle }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <>
      {/* Gallery Grid - Centered */}
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {images.map((image, index) => (
            <div 
              key={image.id}
              className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
              
              {/* Zoom Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white bg-opacity-95 rounded-full p-3 shadow-lg">
                  <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          {/* Background Overlay - Stronger blur */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-95 backdrop-blur-sm"
            onClick={closeLightbox}
          />

          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-[70] text-white hover:text-gray-300 transition-colors duration-200 bg-black bg-opacity-50 rounded-full p-2"
            aria-label="Close lightbox"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 z-[70] text-white hover:text-gray-300 transition-colors duration-200 bg-black bg-opacity-50 rounded-full p-3"
                aria-label="Previous image"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 z-[70] text-white hover:text-gray-300 transition-colors duration-200 bg-black bg-opacity-50 rounded-full p-3"
                aria-label="Next image"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Main Image Container */}
          <div className="relative z-[65] max-w-[95vw] max-h-[95vh] flex items-center justify-center">
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain shadow-2xl"
              sizes="95vw"
              priority
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-[70] text-white bg-black bg-opacity-70 px-4 py-2 rounded-full text-sm">
            {selectedImage + 1} / {images.length}
          </div>

          {/* Image Title */}
          {images[selectedImage].title && (
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-[70] text-white bg-black bg-opacity-70 px-6 py-3 rounded-lg text-center max-w-md">
              <h3 className="font-medium">{images[selectedImage].title}</h3>
              {images[selectedImage].description && (
                <p className="text-sm text-gray-300 mt-1">{images[selectedImage].description}</p>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ImageGallery;
