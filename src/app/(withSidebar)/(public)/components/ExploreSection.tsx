'use client'

import { useQuery } from '@tanstack/react-query'
import { Compass } from 'lucide-react'
import React from 'react'

import VideoSection from '@/components/video-section/VideoSection'

import { cn } from '@/lib/utils'
import { videoService } from '@/services/video'

interface ExploreSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const ExploreSection = (props: ExploreSectionProps) => {
	const { className = '', ...rest } = props
	const { data, isLoading } = useQuery({
		queryKey: ['explore'],
		queryFn: () => videoService.getExploreVideos()
	})

	return (
		<VideoSection
			{...rest}
			className={cn('', {}, [className])}
			videos={data?.data.videos}
			heading={{ text: 'Explore', icon: Compass }}
			isLoading={isLoading}
		/>
	)

	// return (
	// 	<section
	// 		{...rest}
	// 		className={cn('', {}, [className])}
	// 	>
	// 		<Heading icon={Compass}>Explore</Heading>
	// 		<div className='grid grid-cols-6 gap-5'>
	// 			{isLoading ? (
	// 				<SkeletonLoader
	// 					className='h-44'
	// 					count={6}
	// 				/>
	// 			) : (
	// 				data?.data.videos.map(video => (
	// 					<VideoCard
	// 						key={video.id}
	// 						item={video}
	// 					/>
	// 				))
	// 			)}
	// 		</div>
	// 	</section>
	// )
}

export default ExploreSection
