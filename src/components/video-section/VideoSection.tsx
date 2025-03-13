import type { LucideIcon } from 'lucide-react'
import React from 'react'

import Heading from '@/ui/heading/Heading'
import SkeletonLoader from '@/ui/skeleton-loader/SkeletonLoader'

import VideoBlock from './video-block/VideoBlock'
import VideoList from './video-list/VideoList'
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
	isList?: boolean
}

const VideoSection = (props: VideoSectionProps) => {
	const { className = '', heading, isLoading, videos, isList = false, ...rest } = props
	const videoContent = isList ? <VideoList videos={videos} /> : <VideoBlock videos={videos} />

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
				<div
					className={cn('grid grid-cols-6 gap-5 mt-4', {
						'grid-cols-1 gap-3': isList
					})}
				>
					<SkeletonLoader
						className={cn('h-44 rounded-lg', {
							'h-32 ': isList
						})}
						count={isList ? 3 : 6}
					/>
				</div>
			)}
			{!isLoading && videoContent}
		</section>
	)
}

export default VideoSection
