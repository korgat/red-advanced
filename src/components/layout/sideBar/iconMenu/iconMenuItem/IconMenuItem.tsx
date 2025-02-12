'use client'

import Link from 'next/link'
import React, { memo } from 'react'

import type { IIconMenuItem } from './IconMenuItem.types'
import { cn } from '@/lib/utils'

interface IconMenuItemProps extends React.HTMLAttributes<HTMLLIElement>, IIconMenuItem {
	active: boolean
	isSidebarOpen: boolean
}

const IconMenuItem = memo((props: IconMenuItemProps) => {
	const { className = '', icon: Icon, name, link, active, isSidebarOpen, ...rest } = props

	return (
		<li
			{...rest}
			className={cn('', {}, [className])}
		>
			<Link
				className='flex items-center gap-5 py-1.5 group whitespace-nowrap '
				href={link}
				title={name}
			>
				<Icon
					className={cn('min-w-6', {
						'group-hover:rotate-12 group-hover:text-primary transition': !active,
						'text-primary transition': !isSidebarOpen && active
					})}
				/>
				<span
					className={cn('border-b border-transparent', {
						'group-hover:translate-x-0.5 group-hover:text-primary transition': !active,
						'border-white': active
					})}
				>
					{name}
				</span>
			</Link>
		</li>
	)
})

IconMenuItem.displayName = 'IconMenuItem'

export default IconMenuItem
