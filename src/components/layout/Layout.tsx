'use client'

import React, { useEffect } from 'react'

import Content from './content'
import SideBar from './sideBar/SideBar'
import { cn } from '@/lib/utils'
import { authService } from '@/services/auth'

interface LayoutProps extends React.HTMLAttributes<HTMLElement> {}

const Layout = (props: LayoutProps) => {
	const { className = '', children, ...rest } = props

	useEffect(() => {
		authService.initializeAuth()
	}, [])

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
