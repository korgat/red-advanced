import { axiosCommon } from '@/api/axios'

import type { IPaginationParams } from '@/types/pagination.types'
import type { ISingleVideoResponse, IVideo, IVideosPagination } from '@/types/video.types'

class VideoService {
	private path = '/videos'
	getAll(searchTerm?: string | null) {
		return axiosCommon.get<IVideosPagination>(this.path, {
			params: {
				...(searchTerm && { searchTerm: searchTerm })
			}
		})
	}

	getByPublicId(publicId?: string | null) {
		return axiosCommon.get<ISingleVideoResponse>(`${this.path}/by-publicId/${publicId}`)
	}

	getTrendingVideos() {
		return axiosCommon.get<IVideo[]>(`${this.path}/trending`)
	}
	getExploreVideos(userId?: string, params?: IPaginationParams, excludeIds?: string[]) {
		const excludeIdsString = excludeIds?.join(',') || ''
		return axiosCommon.get<IVideosPagination>(`${this.path}/explore`, {
			params: userId
				? {
						userId,
						...params,
						excludeIds: excludeIdsString
					}
				: params
		})
	}
	getVideoGames() {
		return axiosCommon.get<IVideosPagination>(`${this.path}/games`)
	}

	updateViews(publicId: string) {
		return axiosCommon.put(`${this.path}/update-views-count/${publicId}`)
	}
}

export const videoService = new VideoService()
