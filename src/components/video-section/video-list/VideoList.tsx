import React from 'react'

import VideoItem from '@/ui/video-item/VideoItem'
import VideoNotFound from '@/ui/video-not-found/VideoNotFound'

import { cn } from '@/lib/utils'
import type { IVideo } from '@/types/video.types'

interface VideoListProps extends React.HTMLAttributes<HTMLDivElement> {
	videos?: IVideo[]
}

const VideoList = (props: VideoListProps) => {
	const { className = '', videos, ...rest } = props

	return videos?.length ? (
		<div
			{...rest}
			className={cn('flex flex-col gap-3 mt-4', {}, [className])}
		>
			{videos.map(video => (
				<VideoItem
					key={video.id}
					item={video}
				/>
			))}
		</div>
	) : (
		<VideoNotFound className='h-full' />
	)
}

export default VideoList
