import React from 'react'

import { IconMenu } from './iconMenu'
import { ADDITIONAL_LIST_DATA, MAIN_LIST_DATA, SECONDARY_LIST_DATA } from './iconMenu/IconMenu.data'
import { SidebarHeader } from './sidebarHeader'
import { SubscriptionMenu } from './subscriptionMenu'
import { SUBSCRIPTION_LIST_DATA } from './subscriptionMenu/SubscriptionMenu.data'
import { cn } from '@/lib/utils'

interface SideBarProps extends React.HTMLAttributes<HTMLElement> {
	onBurgerClick: () => void
}

const SideBar = (props: SideBarProps) => {
	const { className = '', onBurgerClick, ...rest } = props

	return (
		<aside
			{...rest}
			className={cn(
				'p-layout border-r border-border whitespace-nowrap overflow-hidden h-screen',
				{},
				[className]
			)}
		>
			<SidebarHeader onBurgerClick={onBurgerClick} />
			<IconMenu
				items={MAIN_LIST_DATA}
				border
			/>
			<IconMenu items={SECONDARY_LIST_DATA} />
			<SubscriptionMenu
				items={SUBSCRIPTION_LIST_DATA}
				title='Subscriptions'
			/>
			<IconMenu
				items={ADDITIONAL_LIST_DATA}
				title='More from youtube'
			/>
		</aside>
	)
}

export default SideBar
