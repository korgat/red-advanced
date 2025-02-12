'use client'

import { useMutation } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

import Button, { type ButtonProps } from '@/ui/button/Button'
import SkeletonLoader from '@/ui/skeleton-loader/SkeletonLoader'

import { useProfile } from '@/hooks/useProfile'

import { PUBLIC } from '@/configs/public.pages'
import { cn } from '@/lib/utils'
import { channelService } from '@/services/channel'

interface SubscriptionButtonProps extends ButtonProps {
	slug: string
}

const SubscriptionButton = (props: SubscriptionButtonProps) => {
	const { className = '', slug, variant = 'primary', ...rest } = props
	const router = useRouter()
	const { data, refetch } = useProfile()
	const isSubscribed = data?.data.subscriptions.some(chanel => chanel.slug === slug)
	const { mutate, isPending } = useMutation({
		mutationKey: ['subscribe'],
		mutationFn: () => channelService.toggleSubscribe(slug),
		onSuccess: () => {
			refetch()
		}
	})
	const clickHandler = () => {
		if (data) {
			mutate()
		} else {
			router.push(PUBLIC.AUTH)
		}
	}
	return (
		<Button
			{...rest}
			variant={variant}
			className={cn('', {}, [className])}
			onClick={clickHandler}
			disabled={isPending}
		>
			{isSubscribed ? 'Unsubscribe' : 'Subscribe'}
		</Button>
	)
}

export default SubscriptionButton

export const DynamicSubscriptionButton = dynamic(() => Promise.resolve(SubscriptionButton), {
	ssr: false,
	loading: () => <SkeletonLoader className='h-10 w-40 rounded-md' />
})
