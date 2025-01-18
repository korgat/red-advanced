import React from 'react'

import HeaderButtons from './header-buttons/HeaderButtons'
import HeaderProfile from './header-profile/HeaderProfile'
import HeaderSearch from './header-search/HeaderSearch'
import { cn } from '@/lib/utils'

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {}

const Header = (props: HeaderProps) => {
	const { className = '', ...rest } = props

	return (
		<header
			{...rest}
			className={cn('flex items-center justify-between p-layout border-b border-border', {}, [
				className
			])}
		>
			<HeaderSearch />
			<div className='flex items-center gap-10'>
				<HeaderButtons />
				<HeaderProfile />
			</div>
		</header>
	)
}

export default Header
