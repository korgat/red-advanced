import { Menu } from 'lucide-react'
import React from 'react'

import Logo from '@/components/logo/Logo'

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
				title='Toggle sidebar'
			>
				<Menu />
			</button>
			<Logo />
		</div>
	)
}

export default SidebarHeader
