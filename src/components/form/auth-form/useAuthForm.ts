import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useRef, useTransition } from 'react'
import type ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import type { IAuthData, IAuthForm } from './authForm.types'
import { PUBLIC } from '@/configs/public.pages'
import { authService } from '@/services/auth'
import type { TAuthType } from '@/services/auth/auth.types'

export const useAuthForm = (type: TAuthType) => {
	const [isPending, startTransition] = useTransition()
	const recaptchaRef = useRef<ReCAPTCHA>(null)
	const router = useRouter()

	const {
		formState: { errors },
		watch,
		register,
		handleSubmit,
		reset
	} = useForm<IAuthForm>()

	const { mutateAsync, isPending: isAuthPending } = useMutation({
		mutationKey: [type],
		mutationFn: (data: IAuthData) =>
			authService.authenticate(type, data, recaptchaRef.current?.getValue())
	})

	const onSubmit = handleSubmit(({ email, password }: IAuthForm) => {
		const captchaToken = recaptchaRef.current?.getValue()

		if (!captchaToken) {
			toast.error('Pass the captcha!', {
				id: 'recaptcha'
			})
			return
		}

		toast.promise(mutateAsync({ password, email }), {
			loading: 'Loading...',
			success: () => {
				startTransition(() => {
					reset()
					router.push(PUBLIC.HOME)
				})

				return 'Success login!'
			},
			error: (e: Error) => {
				if (axios.isAxiosError(e)) {
					return e.response?.data?.message
				}
			}
		})
	})

	const isLoading = isPending || isAuthPending

	return {
		onSubmit,
		register,
		watch,
		errors,
		recaptchaRef,
		isLoading
	}
}
