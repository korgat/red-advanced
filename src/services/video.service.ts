import axios from 'axios'

import type { IVideo, IVideosPagination } from '@/types/video.types'

class VideoService {
	getTrendingVideos() {
		return axios.get<IVideo[]>('http://localhost:4200/api/videos/trending')
	}
	getExploreVideos() {
		return axios.get<IVideosPagination>('http://localhost:4200/api/videos/explore')
	}
}

export const videoService = new VideoService()
