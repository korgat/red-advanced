import { axiosAuth, axiosCommon } from '@/api/axios';

import type { IComment, ICommentData } from '../../types/comments.types';

class CommentService {
  private path = '/comments';

  async getCommentsPublicId(publicId?: string | null) {
    const { data } = await axiosCommon.get<IComment[]>(`${this.path}/by-video/${publicId}`);
    return data;
  }

  create(data: ICommentData) {
    return axiosAuth.post<IComment>(this.path, data);
  }

  update(id: string, data: ICommentData) {
    return axiosAuth.put<IComment>(`${this.path}/${id}`, data);
  }

  delete(id: string) {
    return axiosAuth.delete<IComment>(`${this.path}/${id}`);
  }
}

export const commentService = new CommentService();
