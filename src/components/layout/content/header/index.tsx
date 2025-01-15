import React from 'react'

import { cn } from '@/lib/utils'

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {}

const Header = (props: HeaderProps) => {
	const { className = '', ...rest } = props

	return (
		<header
			{...rest}
			className={cn('', {}, [className])}
		>
			Header
		</header>
	)
}

export default Header
