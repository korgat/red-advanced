import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import SkeletonLoader from '@/ui/skeleton-loader/SkeletonLoader'

import { useProfile } from '@/hooks/useProfile'

import { STUDIO } from '@/configs/studio.pages'
import { cn } from '@/lib/utils'

interface ProfileAvatarProps extends React.HTMLAttributes<HTMLDivElement> {}

const ProfileAvatar = (props: ProfileAvatarProps) => {
	const { className = '', ...rest } = props
	const { data, isPending } = useProfile()
	return (
		<div
			{...rest}
			className={cn('', {}, [className])}
		>
			{!isPending ? (
				<Link
					className='relative'
					href={STUDIO.SETTINGS}
				>
					<Image
						src={data?.data.channel?.avatarUrl || '/avatar.png'}
						alt={data?.data.name || 'user'}
						width={40}
						height={40}
						className='rounded-lg clear-start min-w-10'
					/>
					{data?.data.verificationToken && (
						<div className='absolute -bottom-3.5 -left-4  text-xs bg-red-600 p-0.5 px-1 text-center rounded-lg whitespace-nowrap'>
							Not verified
						</div>
					)}
				</Link>
			) : (
				<SkeletonLoader className='w-10 rounded-lg' />
			)}
		</div>
	)
}

export default ProfileAvatar
