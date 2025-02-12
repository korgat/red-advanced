import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectSidebarStatus } from '@/store/layout/layout.selectors'
import { toggleSidebar } from '@/store/layout/layout.slice'

import { IconMenu } from './iconMenu'
import {
	ADDITIONAL_LIST_DATA,
	MAIN_LIST_DATA,
	SECONDARY_LIST_DATA,
	STUDIO_LIST_DATA
} from './iconMenu/IconMenu.data'
import { SidebarHeader } from './sidebarHeader'
import { SubscriptionMenu } from './subscriptionMenu'
import { SUBSCRIPTION_LIST_DATA } from './subscriptionMenu/SubscriptionMenu.data'
import { STUDIO } from '@/configs/studio.pages'
import { cn } from '@/lib/utils'

const DynamicLogoutButton = dynamic(() => import('./logout-button').then(mod => mod.LogoutButton), {
	ssr: false
})
const DynamicChannelLink = dynamic(
	() => import('./my-channel-link').then(mod => mod.MyChannelLink),
	{
		ssr: false
	}
)

interface SideBarProps extends React.HTMLAttributes<HTMLElement> {}

const SideBar = (props: SideBarProps) => {
	const { className = '', ...rest } = props
	const pathname = usePathname()
	const dispatch = useDispatch()
	const isSidebarOpen = useSelector(selectSidebarStatus)

	const toggleSideBarHandler = () => {
		dispatch(toggleSidebar())
	}

	return (
		<aside
			{...rest}
			className={cn(
				'p-layout border-r border-border whitespace-nowrap overflow-hidden transition-[width]',
				{
					'w-opened-sidebar': isSidebarOpen,
					'w-closed-sidebar': !isSidebarOpen
				},
				[className]
			)}
		>
			<SidebarHeader onBurgerClick={toggleSideBarHandler} />
			<IconMenu
				isSidebarOpen={isSidebarOpen}
				items={MAIN_LIST_DATA}
				border
			/>
			<IconMenu
				isSidebarOpen={isSidebarOpen}
				items={SECONDARY_LIST_DATA}
			/>
			<DynamicChannelLink isSidebarOpen={isSidebarOpen} />
			<SubscriptionMenu
				className='mt-5'
				isSidebarOpen={isSidebarOpen}
				items={SUBSCRIPTION_LIST_DATA}
				title='Subscriptions'
			/>
			{pathname.includes(STUDIO.HOME) && (
				<IconMenu
					title='Studio'
					isSidebarOpen={isSidebarOpen}
					items={STUDIO_LIST_DATA}
					border
				/>
			)}

			<IconMenu
				className='mb-0'
				isSidebarOpen={isSidebarOpen}
				items={ADDITIONAL_LIST_DATA}
				title='More from youtube'
			/>
			<DynamicLogoutButton />
		</aside>
	)
}

export default SideBar
