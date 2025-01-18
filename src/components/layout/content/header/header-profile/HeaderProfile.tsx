import Image from 'next/image'
import React from 'react'

import { cn } from '@/lib/utils'

interface HeaderProfileProps extends React.HTMLAttributes<HTMLDivElement> {}

const HeaderProfile = (props: HeaderProfileProps) => {
	const { className = '', ...rest } = props

	return (
		<div
			{...rest}
			className={cn('', {}, [className])}
		>
			<Image
				src='/uploads/avatars/visual.jpg'
				alt=''
				width={40}
				height={40}
				className='rounded-lg clear-start min-w-10'
			/>
		</div>
	)
}

export default HeaderProfile
