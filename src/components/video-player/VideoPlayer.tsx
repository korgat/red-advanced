'use client'

import { Maximize, Pause, Play } from 'lucide-react'
import React from 'react'

import Progressbar from './progressbar/Progressbar'
import { QualitySelector } from './quality-selector'
import { useVideoPlayer } from './useVideoPlayer'
import { EnumVideoPlayerQuality } from './videoPlayer.types'
import { cn } from '@/lib/utils'

interface VideoPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
	fileName: string
}

const VideoPlayer = (props: VideoPlayerProps) => {
	const { className = '', fileName, ...rest } = props
	const { fn, playerRef, state } = useVideoPlayer({ fileName })
	console.log('render', state)
	return (
		<div
			{...rest}
			className={cn('relative rounded-lg overflow-hidden', {}, [className])}
		>
			<video
				ref={playerRef}
				className='w-full h-full aspect-video'
				controls={false}
				src={`/uploads/videos/${EnumVideoPlayerQuality['1080p']}/${fileName}`}
				preload='metadata'
			/>

			<div className='flex items-center justify-between p-3 relative'>
				<div className='flex items-center gap-4'>
					<button
						onClick={fn.togglePlayPause}
						className='transition-colors hover:text-primary'
					>
						{state.isPlaying ? <Pause /> : <Play />}
					</button>
					<Progressbar playerRef={playerRef} />

					<div>
						<span>
							{Math.floor(state.videoTime / 60) +
								':' +
								('0' + Math.floor(state.videoTime % 60)).slice(-2)}
						</span>
					</div>
				</div>
				<div className='flex items-center gap-5'>
					<QualitySelector
						currentQuality={state.quality}
						setQuality={fn.changeQuality}
					/>
					<button
						onClick={fn.toggleFullScreen}
						className='hoverPrimary'
					>
						<Maximize />
					</button>
				</div>
			</div>
		</div>
	)
}

export default VideoPlayer
