import { useEffect, useRef, useState } from 'react'

import { EnumVideoPlayerQuality, type HTMLCustomVideoElement } from './videoPlayer.types'
import { getVideoInfo } from './videoPlayer.utils'

const SKIP_TIME_SECONDS = 10

interface Props {
	fileName: string
}

export function useVideoPlayer({ fileName }: Props) {
	const playerRef = useRef<HTMLCustomVideoElement>(null)

	const [isPlaying, setIsPlaying] = useState(false)
	const [quality, setQuality] = useState(EnumVideoPlayerQuality['1080p'])
	const [videoTime, setVideoTime] = useState(0)

	const togglePlayPause = () => {
		if (isPlaying) {
			playerRef.current?.pause()
		} else {
			playerRef.current?.play()
		}
		setIsPlaying(!isPlaying)
	}

	const skipTime = (type?: 'forward' | 'backward') => {
		if (!playerRef.current?.currentTime) return

		if (type === 'forward') {
			playerRef.current.currentTime += SKIP_TIME_SECONDS
		} else {
			playerRef.current.currentTime -= SKIP_TIME_SECONDS
		}
	}

	const toggleFullScreen = () => {
		if (!playerRef.current) return

		if (playerRef.current.requestFullscreen) {
			playerRef.current.requestFullscreen()
		} else if (playerRef.current?.mozRequestFullScreen) {
			playerRef.current.mozRequestFullScreen()
		} else if (playerRef.current.webkitRequestFullscreen) {
			playerRef.current.webkitRequestFullscreen()
		} else if (playerRef.current.msRequestFullscreen) {
			playerRef.current.msRequestFullscreen()
		}
	}

	const changeQuality = (quality: EnumVideoPlayerQuality) => {
		if (!playerRef.current) return
		setQuality(quality)
		const lastTime = playerRef.current.currentTime

		playerRef.current.src = `/uploads/videos/${quality}/${fileName}`
		playerRef.current.currentTime = lastTime
		playerRef.current.play()
		setIsPlaying(true)
	}

	useEffect(() => {
		if (!playerRef?.current) return
		const { originalTime } = getVideoInfo(playerRef.current)

		setVideoTime(originalTime)
	}, [playerRef.current?.duration])

	return {
		state: {
			isPlaying,
			videoTime,
			quality
		},
		fn: {
			togglePlayPause,
			changeQuality,
			toggleFullScreen,
			skipTime
		},
		playerRef
	}
}
