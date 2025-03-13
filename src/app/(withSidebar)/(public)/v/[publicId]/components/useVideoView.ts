import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'

import { videoService } from '@/services/video'
import { watchHistoryService } from '@/services/watch-history'

export const useVideoView = (videoId: string, publicId: string) => {
	const { mutate: updateWatchHistory } = useMutation({
		mutationKey: ['update-watch-history'],
		mutationFn: () => watchHistoryService.addToHistory(videoId)
	})

	const { mutate: updateViews } = useMutation({
		mutationKey: ['update-video-views'],
		mutationFn: () => videoService.updateViews(publicId)
	})

	useEffect(() => {
		updateViews()
		updateWatchHistory()
	}, [updateViews, updateWatchHistory])
}
