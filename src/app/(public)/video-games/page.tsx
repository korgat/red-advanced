import type { Metadata } from 'next'

import VideoGamesSection from './components/VideoGamesSection'
import { PUBLIC } from '@/configs/public.pages'

export const metadata: Metadata = {
	title: 'Video Games',
	description: "Best game' videos",
	alternates: {
		canonical: PUBLIC.VIDEO_GAMES
	},
	openGraph: {
		type: 'website',
		url: PUBLIC.VIDEO_GAMES,
		title: 'Video Games'
	}
}

export const revalidate = 100
export const dynamic = 'force-static'

export default function VideoGamesPage() {
	return <VideoGamesSection />
}
