// app/studio/page.tsx
import React from 'react';
import AboutSection from '../../components/AboutSection';
import Header from '../../components/Header';

export default function StudioPage() {
  return (
    <>
      <Header showBackground={false} />
      <div className="pt-8">
        <AboutSection />
      </div>
    </>
  );
}
