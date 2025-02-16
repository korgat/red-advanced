import type { RefObject } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

import type { HTMLCustomVideoElement } from '../videoPlayer.types'

export const useFullScreen = (playerRef: RefObject<HTMLCustomVideoElement | null>) => {
	const toggleFullScreen = () => {
		if (!playerRef.current) return
		const player = playerRef.current
		const doc = document as Document & {
			mozCancelFullScreen?: () => Promise<void>
			webkitExitFullscreen?: () => Promise<void>
			msExitFullscreen?: () => Promise<void>
		}

		if (doc.fullscreenElement) {
			if (doc.exitFullscreen) {
				doc.exitFullscreen()
			} else if (doc.mozCancelFullScreen) {
				doc.mozCancelFullScreen()
			} else if (doc.webkitExitFullscreen) {
				doc.webkitExitFullscreen()
			} else if (doc.msExitFullscreen) {
				doc.msExitFullscreen()
			}
		} else {
			if (player.requestFullscreen) {
				player.requestFullscreen()
			} else if (player.mozRequestFullScreen) {
				player.mozRequestFullScreen()
			} else if (player.webkitRequestFullscreen) {
				player.webkitRequestFullscreen()
			} else if (player.msRequestFullscreen) {
				player.msRequestFullscreen()
			}
		}
	}

	useHotkeys('f', e => {
		e.preventDefault()
		toggleFullScreen()
	})
	return { toggleFullScreen }
}
