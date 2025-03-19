import type { Metadata } from 'next';

import { DynamicExploreSection } from './components/ExploreSection';
import TrendingSection from './components/TrendingSection';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Explore videos on red videos platform',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'RED Video'
  }
};

export const revalidate = 100;
export const dynamic = 'force-static';

export default function HomePage() {
  return (
    <div className='flex flex-col gap-4 p-layout h-full'>
      <TrendingSection />
      <DynamicExploreSection />
    </div>
  );
}
