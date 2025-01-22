import { LogIn } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'

import LinkButton from '@/ui/button/LinkButton'

import { selectIsAuth } from '@/store/auth/auth.selectors'

import { PUBLIC } from '@/configs/public.pages'
import { cn } from '@/lib/utils'

interface HeaderProfileProps extends React.HTMLAttributes<HTMLDivElement> {}

const HeaderProfile = (props: HeaderProfileProps) => {
	const { className = '', ...rest } = props
	const isAuth = useSelector(selectIsAuth)

	return (
		<div
			{...rest}
			className={cn('', {}, [className])}
		>
			{isAuth ? (
				<Image
					src='/uploads/avatars/visual.jpg'
					alt=''
					width={40}
					height={40}
					className='rounded-lg clear-start min-w-10'
				/>
			) : (
				<LinkButton
					className='p-0 border text-white opacity-80 hover:opacity-100 hover:border-white w-10 h-10'
					href={PUBLIC.AUTH}
				>
					<LogIn />
				</LinkButton>
			)}
		</div>
	)
}

export default HeaderProfile
