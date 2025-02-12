'use client'

import React, { type RefObject, useEffect, useState } from 'react'

import type { HTMLCustomVideoElement } from '../videoPlayer.types'
import { getVideoInfo } from '../videoPlayer.utils'

import { cn } from '@/lib/utils'

interface ProgressbarProps extends React.HTMLAttributes<HTMLDivElement> {
	progress?: number
	playerRef: RefObject<HTMLCustomVideoElement | null>
}

const Progressbar = (props: ProgressbarProps) => {
	const { className = '', playerRef, ...rest } = props
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const player = playerRef?.current

		const updateProgress = () => {
			if (!player) return

			const { progress } = getVideoInfo(player)
			setProgress(progress)
		}

		player?.addEventListener('timeupdate', updateProgress)

		return () => {
			player?.removeEventListener('timeupdate', updateProgress)
		}
	}, [playerRef])

	return (
		<div
			{...rest}
			className={cn('absolute -top-0.5 left-0 w-full bg-gray-200', {}, [className])}
		>
			<div
				style={{
					width: `${progress}%`
				}}
				className='h-1 bg-primary relative'
			></div>
		</div>
	)
}

export default Progressbar
