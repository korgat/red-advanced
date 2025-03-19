import type { Metadata } from 'next';

import { PlaylistSection } from './components';
import { NO_INDEX_PAGE } from '@/const/seo.const';

export const metadata: Metadata = {
  title: 'Playlists',
  ...NO_INDEX_PAGE
};

export default function PlaylistsPage() {
  return <PlaylistSection />;
}
