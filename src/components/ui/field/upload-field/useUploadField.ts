import { useMutation } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'
import { useCallback } from 'react'
import toast from 'react-hot-toast'

import { fileService } from '@/services/file'
import type { UploadResponseItem } from '@/types/file.types'

interface props {
	folder: string
	onSuccess?: (data: AxiosResponse<UploadResponseItem[]>) => void
	onError?: (error: Error) => void
}

export function useUploadField({ folder, onSuccess, onError }: props) {
	const { mutate, isPending, isSuccess } = useMutation({
		mutationKey: ['upload-file'],
		mutationFn: (data: FormData) => fileService.upload(data, folder),
		onSuccess: onSuccess,
		onError: onError
			? onError
			: error => {
					toast.error(error.message)
				}
	})

	const uploadFile = useCallback(
		(file: File) => {
			const formData = new FormData()
			formData.append('file', file)
			mutate(formData)
		},
		[mutate]
	)

	return { uploadFile, isLoading: isPending, isSuccess }
}
