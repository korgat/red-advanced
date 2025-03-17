import { axiosAuth } from '@/api/axios'

import type { TUploadForm } from '@/app/(withSidebar)/(studio)/studio/upload/components/uploadForm/uploadForm.types'
import type { IPaginationParams } from '@/types/pagination.types'
import type { IFullVideo, IStudioVideoResponse, IVideosPagination } from '@/types/video.types'

class StudioVideoService {
	private path = '/studio/videos'

	getAll(params?: IPaginationParams) {
		return axiosAuth.get<IVideosPagination>(this.path, {
			params
		})
	}

	byId(id: string) {
		return axiosAuth.get<IStudioVideoResponse>(`${this.path}/${id}`)
	}

	create(dto: TUploadForm) {
		return axiosAuth.post(this.path, dto)
	}

	update(id: string, dto: TUploadForm) {
		return axiosAuth.put(`${this.path}/${id}`, dto)
	}

	delete(id: string) {
		return axiosAuth.delete<IFullVideo>(`${this.path}/${id}`)
	}
}

export const studioVideoService = new StudioVideoService()
