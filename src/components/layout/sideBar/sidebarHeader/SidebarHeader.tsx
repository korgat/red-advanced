import { Menu, SquarePlay } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { PAGE } from '@/configs/public-page.config'
import { cn } from '@/lib/utils'

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	onBurgerClick: () => void
}

const SidebarHeader = (props: SidebarHeaderProps) => {
	const { className = '', onBurgerClick, ...rest } = props

	return (
		<div
			{...rest}
			className={cn('flex items-center gap-5 mb-10 whitespace-nowrap', {}, [className])}
		>
			<button
				onClick={onBurgerClick}
				className='opacity-80 hover:opacity-100'
			>
				<Menu />
			</button>
			<Link
				href={PAGE.HOME}
				className='flex items-center gap-0.5 '
			>
				<SquarePlay
					className='text-primary min-w-7'
					width={28}
					height={28}
				/>
				<span className='text-xl font-medium'>Red Video</span>
			</Link>
		</div>
	)
}

export default SidebarHeader
