import { Flame } from 'lucide-react'
import React from 'react'

import VideoSection from '@/components/video-section/VideoSection'

import { cn } from '@/lib/utils'
import { videoService } from '@/services/video'

interface TrendingSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const TrendingSection = async (props: TrendingSectionProps) => {
	const { className = '', ...rest } = props
	const { data } = await videoService.getTrendingVideos()

	return (
		<VideoSection
			{...rest}
			className={cn('h-full', {}, [className])}
			heading={{ text: 'Trending', icon: Flame }}
			videos={data}
		/>
	)
}

export default TrendingSection
