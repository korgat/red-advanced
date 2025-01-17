'use client'

import { useQuery } from '@tanstack/react-query'
import { Flame } from 'lucide-react'
import React from 'react'

import VideoCard from '@/ui/video-card/VideoCard'

import { cn } from '@/lib/utils'
import { videoService } from '@/services/video.service'

interface ExploreProps extends React.HTMLAttributes<HTMLDivElement> {}

const Explore = (props: ExploreProps) => {
	const { className = '', ...rest } = props
	const { data, isLoading } = useQuery({
		queryKey: ['explore'],
		queryFn: () => videoService.getExploreVideos()
	})

	return (
		<section
			{...rest}
			className={cn('', {}, [className])}
		>
			<h3>Explore</h3>
			<div className='grid grid-cols-6 gap-5'>
				{isLoading
					? 'Loading...'
					: data?.data.videos.map(video => (
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

export default Explore
