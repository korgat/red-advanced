import { axiosCommon } from '@/api/axios'

import type { IVideo, IVideosPagination } from '@/types/video.types'

class VideoService {
	public _videoPath = '/videos'
	getAll(searchTerm?: string | null) {
		return axiosCommon.get<IVideosPagination>(this._videoPath, {
			params: {
				...(searchTerm && { searchTerm: searchTerm })
			}
		})
	}
	getTrendingVideos() {
		return axiosCommon.get<IVideo[]>(`${this._videoPath}/trending`)
	}
	getExploreVideos() {
		return axiosCommon.get<IVideosPagination>(`${this._videoPath}/explore`)
	}
}

export const videoService = new VideoService()
