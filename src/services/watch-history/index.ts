import { axiosAuth } from '@/api/axios'

import type { IVideo } from '@/types/video.types'

class WatchHistoryService {
	private path = '/watch-history'

	getUserHistory() {
		return axiosAuth.get<{ video: IVideo }[]>(this.path)
	}

	addToHistory(videoId: string) {
		return axiosAuth.post(this.path, { videoId })
	}

	clearHistory() {
		return axiosAuth.delete(this.path)
	}
}

export const watchHistoryService = new WatchHistoryService()
