import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import type { TUploadForm } from './uploadForm.types'
import { STUDIO } from '@/configs/studio.pages'
import { studioVideoService } from '@/services/studio-video'

export const useUploadForm = () => {
	const router = useRouter()
	const queryClient = useQueryClient()
	const {
		formState: { errors },
		watch,
		reset,
		register,
		handleSubmit,
		control
	} = useForm<TUploadForm>({
		mode: 'onChange'
	})
	const fileName = watch('videoFileName')
	const thumbnail = watch('thumbnailUrl')

	const { mutate, isPending } = useMutation({
		mutationKey: ['publish-video'],
		mutationFn: (data: TUploadForm) => studioVideoService.create(data),
		async onSuccess() {
			reset()
			const { toast } = await import('react-hot-toast')
			toast.success('Video successfully published!')
			queryClient.removeQueries({ queryKey: ['video-progress'] })
			router.push(STUDIO.HOME)
		},
		async onError() {
			const { toast } = await import('react-hot-toast')
			toast.error('Video creating has error!')
		}
	})

	const onSubmit = handleSubmit((data: TUploadForm) => {
		mutate(data)
	})
	return {
		fileName,
		thumbnail,
		control,
		errors,
		isPublishing: isPending,
		reset,
		register,
		onSubmit
	}
}
