'use client'

import React, { useState } from 'react'

import Content from './content'
import SideBar from './sideBar/SideBar'
import { cn } from '@/lib/utils'

import styles from './Layout.module.scss'

interface LayoutProps extends React.HTMLAttributes<HTMLElement> {}

const Layout = (props: LayoutProps) => {
	const { className = '', children, ...rest } = props
	const [isOpen, setIsOpen] = useState(true)

	const toggleSideBar = () => {
		setIsOpen(prev => !prev)
	}

	return (
		<main
			{...rest}
			className={cn(
				'flex min-h-screen',
				{
					[styles.showedSidebar]: isOpen,
					[styles.hidedSidebar]: !isOpen
				},
				[className]
			)}
		>
			<SideBar onBurgerClick={toggleSideBar} />
			<Content>{children}</Content>
		</main>
	)
}

export default Layout
