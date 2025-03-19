import type { Metadata } from 'next';

import TrendingSection from './components/TrendingSection';
import { PUBLIC } from '@/configs/public.pages';

export const metadata: Metadata = {
  title: 'Trending',
  description: 'Best videos in trends.',
  alternates: {
    canonical: PUBLIC.TRENDING
  },
  openGraph: {
    type: 'website',
    url: PUBLIC.TRENDING,
    title: 'Trending'
  }
};

export const revalidate = 100;
export const dynamic = 'force-static';

export default function TrendingPage() {
  return <TrendingSection />;
}
