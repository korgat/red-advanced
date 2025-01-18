import type { Metadata } from 'next'

import { PUBLIC } from '@/configs/public.pages'

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
}

export default function Trending() {
	return <div>Trending</div>
}
