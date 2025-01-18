import { Flame } from 'lucide-react'
import React from 'react'

import Heading from '@/ui/heading/Heading'
import VideoCard from '@/ui/video-card/VideoCard'

import { cn } from '@/lib/utils'
import { videoService } from '@/services/video.service'

interface TrendingProps extends React.HTMLAttributes<HTMLDivElement> {}

const Trending = async (props: TrendingProps) => {
	const { className = '', ...rest } = props
	const data = await videoService.getTrendingVideos()

	return (
		<section
			{...rest}
			className={cn('', {}, [className])}
		>
			<Heading icon={Flame}>Trending</Heading>
			<div className='grid grid-cols-6 gap-5'>
				{data &&
					data?.data.map(video => (
						<VideoCard
							key={video.id}
							icon={Flame}
							item={video}
						/>
					))}
			</div>
		</section>
	)
}

export default Trending
