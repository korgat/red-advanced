import type { RefObject } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

import type { HTMLCustomVideoElement } from '../videoPlayer.types'

const SKIP_TIME_SECONDS = 10

interface Props {
	setCurrentTime: React.Dispatch<React.SetStateAction<number>>
}

export const useSkipTime = (
	playerRef: RefObject<HTMLCustomVideoElement | null>,
	{ setCurrentTime }: Props
) => {
	const skipTime = (type?: 'forward' | 'backward') => {
		if (!playerRef.current) return
		const currentTime = playerRef.current.currentTime

		if (type === 'forward') {
			const forwardTime = currentTime + SKIP_TIME_SECONDS
			playerRef.current.currentTime = forwardTime
			setCurrentTime(forwardTime)
		} else {
			const backwardTime = currentTime - SKIP_TIME_SECONDS
			playerRef.current.currentTime = backwardTime
			setCurrentTime(backwardTime)
		}
	}

	useHotkeys('right', e => {
		e.preventDefault()
		skipTime('forward')
	})

	useHotkeys('left', e => {
		e.preventDefault()
		skipTime('backward')
	})
}
