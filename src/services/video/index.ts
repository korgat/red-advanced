import { axiosCommon } from '@/api/axios'

import type { IVideo, IVideosPagination } from '@/types/video.types'

class VideoService {
	private path = '/videos'
	getAll(searchTerm?: string | null) {
		return axiosCommon.get<IVideosPagination>(this.path, {
			params: {
				...(searchTerm && { searchTerm: searchTerm })
			}
		})
	}
	getTrendingVideos() {
		return axiosCommon.get<IVideo[]>(`${this.path}/trending`)
	}
	getExploreVideos() {
		return axiosCommon.get<IVideosPagination>(`${this.path}/explore`)
	}
	getVideoGames() {
		return axiosCommon.get<IVideosPagination>(`${this.path}/games`)
	}
}

export const videoService = new VideoService()
