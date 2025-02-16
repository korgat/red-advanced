import { type RefObject, useEffect, useState } from 'react'

import type { HTMLCustomVideoElement } from '../videoPlayer.types'

export const useVideoTime = (playerRef: RefObject<HTMLCustomVideoElement | null>) => {
	const [videoTime, setVideoTime] = useState(0)

	useEffect(() => {
		if (!playerRef?.current) return
		const playerEl = playerRef.current

		const handleLoadedMetadata = () => {
			setVideoTime(playerEl.duration)
		}

		playerEl.addEventListener('loadedmetadata', handleLoadedMetadata)
		return () => {
			playerEl.removeEventListener('loadedmetadata', handleLoadedMetadata)
		}
	}, [playerRef])
	return { videoTime }
}
