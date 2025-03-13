import type { Metadata } from 'next'

import { PlaylistsSection } from './components'
import { NO_INDEX_PAGE } from '@/const/seo.const'

export const metadata: Metadata = {
	title: 'Playlist',
	...NO_INDEX_PAGE
}

export default function PlaylistPage() {
	return <PlaylistsSection />
}
