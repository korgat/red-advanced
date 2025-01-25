'use client'

import React from 'react'

import Content from './content'
import SideBar from './sideBar/SideBar'
import { cn } from '@/lib/utils'

interface LayoutProps extends React.HTMLAttributes<HTMLElement> {}

const Layout = (props: LayoutProps) => {
	const { className = '', children, ...rest } = props

	return (
		<main
			{...rest}
			className={cn('flex min-h-screen', {}, [className])}
		>
			<SideBar />
			<Content>{children}</Content>
		</main>
	)
}

export default Layout
