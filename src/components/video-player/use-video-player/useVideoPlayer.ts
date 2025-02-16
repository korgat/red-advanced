import { useRef } from 'react'

import { type HTMLCustomVideoElement } from '../videoPlayer.types'

import { useFullScreen } from './useFullScreen'
import { usePlayPause } from './usePlayPause'
import { useQuality } from './useQuality'
import { useVideoTime } from './useVideoTime'

interface Props {
	fileName: string
}

export function useVideoPlayer({ fileName }: Props) {
	const playerRef = useRef<HTMLCustomVideoElement>(null)

	const { isPlaying, setIsPlaying, togglePlayPause } = usePlayPause(playerRef)
	const { quality, changeQuality } = useQuality({ fileName, playerRef, setIsPlaying })
	const { videoTime } = useVideoTime(playerRef)
	const { toggleFullScreen } = useFullScreen(playerRef)

	return {
		state: {
			isPlaying,
			videoTime,
			quality
		},
		fn: {
			togglePlayPause,
			changeQuality,
			toggleFullScreen
		},
		playerRef
	}
}
