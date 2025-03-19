import type { Metadata } from 'next';

import StudioSection from './components/StudioSection';
import { NO_INDEX_PAGE } from '@/const/seo.const';

export const metadata: Metadata = {
  title: 'Studio',
  ...NO_INDEX_PAGE
};

export default function StudioPage() {
  return <StudioSection />;
}
