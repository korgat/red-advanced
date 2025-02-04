import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useProfile } from '@/hooks/useProfile'

import type { ISettingsForm } from './settingForm.types'
import { profileService } from '@/services/profile'

export function useSettingsForm() {
	const {
		formState: { errors },
		reset,
		register,
		handleSubmit,
		control
	} = useForm<ISettingsForm>({
		mode: 'onChange'
	})
	const { data, isSuccess, isPending: isFormDataLoading, refetch } = useProfile()

	const { mutate, isPending: isLoading } = useMutation({
		mutationKey: ['update-profile'],
		mutationFn: (data: ISettingsForm) => profileService.updateProfile(data),
		onSuccess: () => {
			refetch()
		}
	})

	const onSubmit = handleSubmit((data: ISettingsForm) => {
		mutate(data)
	})

	useEffect(() => {
		if (!isSuccess) return
		const channel = data?.data.channel
			? {
					avatarUrl: data?.data.channel?.avatarUrl,
					bannerUrl: data?.data.channel?.bannerUrl,
					description: data?.data.channel?.description,
					slug: data?.data.channel?.slug
				}
			: {}

		reset({
			channel,
			email: data?.data.email,
			name: data?.data.name
		})
	}, [data?.data, isSuccess, reset])

	return {
		isLoading,
		isFormDataLoading,
		errors,
		control,
		register,
		onSubmit
	}
}
