import type { Metadata } from 'next'

import { Explore } from '@/components/explore'
import Trending from '@/components/trending/Trending'

export const metadata: Metadata = {
	title: 'Home',
	description: 'Explore videos on red videos platform',
	alternates: {
		canonical: '/'
	},
	openGraph: {
		type: 'website',
		url: '/',
		title: 'RED Video'
	}
}

export const revalidate = 100
export const dynamic = 'force-static'

export default function Home() {
	return (
		<div className='flex flex-col gap-4'>
			<Trending />
			<Explore />
		</div>
	)
}
