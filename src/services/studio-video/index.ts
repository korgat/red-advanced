import type { TVideoForm } from '@/components/form/video-form/videoForm.types';

import { axiosAuth } from '@/api/axios';

import type { IPaginationParams } from '@/types/pagination.types';
import type { IFullVideo, IStudioVideoResponse, IVideosPagination } from '@/types/video.types';

class StudioVideoService {
  private path = '/studio/videos';

  getAll(params?: IPaginationParams) {
    return axiosAuth.get<IVideosPagination>(this.path, {
      params
    });
  }

  byId(id: string) {
    return axiosAuth.get<IStudioVideoResponse>(`${this.path}/${id}`);
  }

  create(dto: TVideoForm) {
    return axiosAuth.post(this.path, dto);
  }

  update(id: string, dto: TVideoForm) {
    return axiosAuth.put(`${this.path}/${id}`, dto);
  }

  delete(id: string) {
    return axiosAuth.delete<IFullVideo>(`${this.path}/${id}`);
  }
}

export const studioVideoService = new StudioVideoService();
