import type { Metadata } from 'next'

import { LikedSection } from './components'
import { NO_INDEX_PAGE } from '@/const/seo.const'

export const metadata: Metadata = {
	title: 'Liked',
	...NO_INDEX_PAGE
}

export default function LikedVideosPage() {
	return <LikedSection />
}
