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
}

export default ExploreSection
