import { axiosAuth } from '@/api/axios'

class FileService {
	upload(file: FormData, folder?: string) {
		return axiosAuth.post<{ url: string; name: string }[]>(`/upload-file`, file, {
			params: { folder },
			headers: { 'Content-Type': 'multipart/form-data' }
		})
	}
}

export const fileService = new FileService()
