import { type RefObject, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

import type { HTMLCustomVideoElement } from '../videoPlayer.types'

export const usePlayPause = (playerRef: RefObject<HTMLCustomVideoElement | null>) => {
	const [isPlaying, setIsPlaying] = useState(false)

	const togglePlayPause = () => {
		if (isPlaying) {
			playerRef.current?.pause()
		} else {
			playerRef.current?.play()
		}
		setIsPlaying(!isPlaying)
	}

	useHotkeys('space', e => {
		e.preventDefault()
		togglePlayPause()
	})

	return { isPlaying, setIsPlaying, togglePlayPause }
}
