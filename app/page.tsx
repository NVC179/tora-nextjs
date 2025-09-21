// app/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import HomePage from '../components/HomePage';

export const metadata: Metadata = {
  title: 'tôra studio - Featured Projects',
  description: 'Discover our featured architecture and interior design projects',
};

// Server Component - chỉ handle metadata và import Client Component
export default function Page() {
  return <HomePage />;
}
