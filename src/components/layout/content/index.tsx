import React from 'react'

import Header from './header/Header'
import { cn } from '@/lib/utils'

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const Content = (props: ContentProps) => {
	const { className = '', children, ...rest } = props

	return (
		<div
			{...rest}
			className={cn('relative flex flex-col flex-grow flex-shrink basis-0', {}, [className])}
		>
			<Header />
			{children}
		</div>
	)
}

export default Content
