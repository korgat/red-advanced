import type { LucideIcon } from 'lucide-react'
import React from 'react'

import Heading from '@/ui/heading/Heading'
import SkeletonLoader from '@/ui/skeleton-loader/SkeletonLoader'

import VideoBlock from './video-block/VideoBlock'
import { cn } from '@/lib/utils'
import type { IVideo } from '@/types/video.types'

interface VideoSectionProps extends React.HTMLAttributes<HTMLDivElement> {
	heading: {
		text: string
		tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
		icon?: LucideIcon
	}
	isLoading?: boolean
	videos?: IVideo[]
}

const VideoSection = (props: VideoSectionProps) => {
	const { className = '', heading, isLoading, videos, ...rest } = props

	return (
		<section
			{...rest}
			className={cn('', {}, [className])}
		>
			<Heading
				className='mb-0'
				tag={heading.tag}
				icon={heading.icon}
			>
				{heading.text}
			</Heading>

			{isLoading && (
				<div className='grid grid-cols-6 gap-5 mt-4'>
					<SkeletonLoader
						className='h-44'
						count={6}
					/>
				</div>
			)}
			{!isLoading && <VideoBlock videos={videos} />}
		</section>
	)
}

export default VideoSection
