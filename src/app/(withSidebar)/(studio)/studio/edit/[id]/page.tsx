import type { Metadata } from 'next';

import EditSection from './components/EditSection';
import { NO_INDEX_PAGE } from '@/const/seo.const';

export const metadata: Metadata = {
  title: 'Edit Video',
  ...NO_INDEX_PAGE
};

export default function EditPage() {
  return <EditSection />;
}
