import { axiosAuth } from '@/api/axios';

import type { IProgressProcessingResponse, UploadResponseItem } from '@/types/file.types';

class FileService {
  private path = '/upload-file';
  upload(file: FormData, folder?: string) {
    return axiosAuth.post<UploadResponseItem[]>(this.path, file, {
      params: { folder },
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }

  getProcessingStatus(fileName: string) {
    return axiosAuth.get<IProgressProcessingResponse>(`${this.path}/status/${fileName}`);
  }
}

export const fileService = new FileService();
