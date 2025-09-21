// components/AboutSection.tsx
'use client';

import React from 'react';
import Image from 'next/image';

const AboutSection: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Main About Content */}
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column - Image */}
          <div className="relative">
            {/* Option 1: Tỷ lệ cao hơn - 3:4 (portrait) */}
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/logo/aboutme.png"
                alt="tôra studio team"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:pl-8">
            <div className="mb-8">
              {/* <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Về <span className="text-orange-600">tôra studio</span>
              </h1> */}
              
              <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                <p className="text-xl leading-relaxed text-gray-600 mb-8">
                  Văn phòng được thành lập năm 2020 tại Hà Nội.  
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 pt-8 border-t border-gray-200">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Hòm thư</h4>
                <p className="text-gray-600 text-sm">
                  torastudiovn@gmail.com<br />
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Địa chỉ</h4>
                <p className="text-gray-600 text-sm">
                  23C Tông Đản,<br />
                  Hoàn Kiếm, Hà Nội
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
