'use client'

import { useQuery } from '@tanstack/react-query'
import { Compass, Flame } from 'lucide-react'
import React from 'react'

import Heading from '@/ui/heading/Heading'
import SkeletonLoader from '@/ui/skeleton-loader/SkeletonLoader'
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
			<Heading icon={Compass}>Explore</Heading>
			<div className='grid grid-cols-6 gap-5'>
				{isLoading ? (
					<SkeletonLoader
						className='h-44'
						count={6}
					/>
				) : (
					data?.data.videos.map(video => (
						<VideoCard
							key={video.id}
							icon={Flame}
							item={video}
						/>
					))
				)}
			</div>
		</section>
	)
}

export default Explore
