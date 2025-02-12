import type { HTMLCustomVideoElement } from './videoPlayer.types'

export const getVideoInfo = (video: HTMLCustomVideoElement) => {
	const currentTime = video.currentTime
	const originalTime = video.duration

	return {
		currentTime,
		originalTime,
		progress: (currentTime / originalTime) * 100
	}
}
