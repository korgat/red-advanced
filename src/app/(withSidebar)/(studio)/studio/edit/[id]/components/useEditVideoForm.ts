import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import type { TVideoForm } from '@/components/form/video-form/videoForm.types'

import { STUDIO } from '@/configs/studio.pages'
import { studioVideoService } from '@/services/studio-video'

export const useEditVideoForm = (id: string) => {
	const router = useRouter()
	const queryClient = useQueryClient()
	const form = useForm<TVideoForm>({
		mode: 'onChange'
	})

	const { data, isSuccess } = useQuery({
		queryKey: ['studio-video', id],
		queryFn: () => studioVideoService.byId(id as string)
	})

	useEffect(() => {
		if (!isSuccess) return

		const initialVideo = data.data

		form.reset({
			title: initialVideo.title,
			description: initialVideo.description,
			maxResolution: initialVideo.maxResolution,
			thumbnailUrl: initialVideo.thumbnailUrl,
			tags: initialVideo.tags.map(tag => tag.name),
			videoFileName: initialVideo.videoFileName
		})
	}, [form, isSuccess, data])

	const { mutate, isPending } = useMutation({
		mutationKey: ['edit-video', id],
		mutationFn: (data: TVideoForm) => studioVideoService.update(id, data),
		async onSuccess() {
			form.reset()
			const { toast } = await import('react-hot-toast')
			toast.success('Video successfully updated!')
			queryClient.invalidateQueries({
				queryKey: ['studioVideoList']
			})
			router.push(STUDIO.HOME)
		},
		async onError() {
			const { toast } = await import('react-hot-toast')
			toast.error('Video updating has error!')
		}
	})

	const onSubmit = form.handleSubmit((data: TVideoForm) => {
		mutate(data)
	})
	return {
		form,
		isPublishing: isPending,
		onSubmit
	}
}
