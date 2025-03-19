import type { Metadata } from 'next';

import SettingsSection from './SettingsSection';
import { NO_INDEX_PAGE } from '@/const/seo.const';

export const metadata: Metadata = {
  title: 'Search',
  ...NO_INDEX_PAGE
};

export default function SettingsPage() {
  return <SettingsSection />;
}
