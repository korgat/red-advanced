import { Explore } from '@/components/explore'
import Trending from '@/components/trending/Trending'

export const revalidate = 100
export const dynamic = 'force-static'

export default function Home() {
	return (
		<div>
			<Trending />
			<Explore />
		</div>
	)
}
