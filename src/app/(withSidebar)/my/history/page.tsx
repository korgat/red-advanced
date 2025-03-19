import type { Metadata } from 'next';

import { HistorySection } from './components';
import { NO_INDEX_PAGE } from '@/const/seo.const';

export const metadata: Metadata = {
  title: 'History',
  ...NO_INDEX_PAGE
};

export default function HistoryPage() {
  return <HistorySection />;
}
