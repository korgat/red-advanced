import type { Metadata } from 'next';

import AuthSection from './components/authSection';
import { NO_INDEX_PAGE } from '@/const/seo.const';

export const metadata: Metadata = {
  title: 'Auth',
  ...NO_INDEX_PAGE
};

export default function SearchPage() {
  return <AuthSection />;
}
