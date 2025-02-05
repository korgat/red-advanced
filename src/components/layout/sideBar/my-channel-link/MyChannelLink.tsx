import { MonitorPlay } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { match } from 'path-to-regexp'
import React from 'react'

import { useProfile } from '@/hooks/useProfile'

import { PUBLIC } from '@/configs/public.pages'
import { cn } from '@/lib/utils'

interface MyChannelLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
	isSidebarOpen: boolean
}

const MyChannelLink = (props: MyChannelLinkProps) => {
	const { className = '', isSidebarOpen, ...rest } = props
	const pathName = usePathname()
	const { data } = useProfile()
	const linkUrl = data?.data?.channel?.slug || ''

	if (!linkUrl) return null
	const isActive = !!match(PUBLIC.CHANNEL(linkUrl))(pathName)
	return (
		<Link
			{...rest}
			className={cn('flex items-center gap-5 py-1.5 group whitespace-nowrap ', {}, [className])}
			href={PUBLIC.CHANNEL(linkUrl)}
		>
			<MonitorPlay
				className={cn('min-w-6', {
					'group-hover:rotate-12 group-hover:text-primary transition': !isActive,
					'text-primary transition': !isSidebarOpen && isActive
				})}
			/>
			<span
				className={cn('border-b border-transparent', {
					'group-hover:translate-x-0.5 group-hover:text-primary transition': !isActive,
					'border-white': isActive
				})}
			>
				My Channel
			</span>
		</Link>
	)
}

export default MyChannelLink
