import { RadioTower } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import type { ISubscriptionMenuItem } from './SubscriptionMenuItem.types'
import { cn } from '@/lib/utils'

interface SubscriptionMenuItemProps
	extends React.HTMLAttributes<HTMLLIElement>,
		ISubscriptionMenuItem {}

const SubscriptionMenuItem = (props: SubscriptionMenuItemProps) => {
	const { className = '', iconSrc, name, link, status, ...rest } = props

	return (
		<li
			{...rest}
			className={cn('', {}, [className])}
		>
			<Link
				className='flex items-center gap-5 py-1.5 group whitespace-nowrap'
				href={link}
			>
				<Image
					className='rounded-full group-hover:scale-105'
					src={iconSrc}
					alt='name'
					width={24}
					height={24}
				></Image>
				<span className='group-hover:text-primary group-hover:translate-x-0.5 transition'>
					{name}
				</span>
				{status === 'live' && <RadioTower />}
				{status === 'active' && <span className='h-0.5 w-0.5 bg-blue-500'></span>}
			</Link>
		</li>
	)
}

export default SubscriptionMenuItem
