'use client'

import React, { useState } from 'react'

import { Comments } from '@/components/comments'
import VideoPlayer from '@/components/video-player/VideoPlayer'

import { ToggleArticle } from '@/ui/toggle-article'
import VideoCard from '@/ui/video-card/VideoCard'

import ChannelInfoSection from './ChannelInfoSection'
import HeaderSection from './HeaderSection'
import { useVideoView } from './useVideoView'
import { cn } from '@/lib/utils'
import type { ISingleVideoResponse } from '@/types/video.types'

interface VideoPageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	video: ISingleVideoResponse
}

const VideoPageContainer = (props: VideoPageContainerProps) => {
	const { video } = props
	const [isTheatreMode, setIsTheatreMode] = useState(false)
	useVideoView(video.id, video.publicId)

	const toggleTheatreMode = () => {
		setIsTheatreMode(prev => !prev)
	}

	return (
		<div
			className={cn('grid grid-cols-[3fr_.8fr] gap-12', {
				'relative pt-[58%]': isTheatreMode
			})}
		>
			<div>
				<VideoPlayer
					className={cn('mb-5', {
						'absolute top-0 left-0 z-10': isTheatreMode
					})}
					fileName={video.videoFileName}
					maxResolution={video.maxResolution}
					toggleTheatreMode={toggleTheatreMode}
				/>

				<HeaderSection
					title={video.title}
					viewsCount={video.viewsCount.toLocaleString('en-us')}
					likesCount={video.likes.length}
					videoId={video.id}
				/>

				<ChannelInfoSection
					channelAvatar={video.channel.avatarUrl}
					slug={video.channel.slug}
					channelName={video.channel.user.name}
					subscribersCount={video.channel.subscribers.length}
				/>

				<ToggleArticle
					className='mb-4 text-gray-300'
					content={video.description}
				/>

				<Comments
					className='pt-8 border-t border-border'
					videoId={video.id}
					publicId={video.publicId}
					comments={video.comments}
					slug={video.channel.slug}
				/>
			</div>

			<div className='grid grid-cols-1 gap-10'>
				{video.similarVideos.map(video => (
					<VideoCard
						key={video.publicId}
						item={video}
					/>
				))}
			</div>
		</div>
	)
}

export default VideoPageContainer
