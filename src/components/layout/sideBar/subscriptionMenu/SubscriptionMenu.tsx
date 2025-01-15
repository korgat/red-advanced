import React from 'react'

import SubscriptionMenuItem from './subscriptionMenuItem/SubscriptionMenuItem'
import type { ISubscriptionMenuItem } from './subscriptionMenuItem/SubscriptionMenuItem.types'
import { cn } from '@/lib/utils'

interface SubscriptionMenuProps extends React.HTMLAttributes<HTMLDivElement> {
	items: ISubscriptionMenuItem[]
	title?: string
}

const SubscriptionMenu = (props: SubscriptionMenuProps) => {
	const { className = '', items, title, ...rest } = props

	return (
		<>
			<h5 className='text-sm opacity-50 mb-3 whitespace-nowrap'>{title}</h5>
			<nav
				{...rest}
				className={cn('mb-5', {}, [className])}
			>
				<ul>
					{items.map(item => (
						<SubscriptionMenuItem
							key={item.name}
							iconSrc={item.iconSrc}
							name={item.name}
							link={item.link}
						/>
					))}
				</ul>
			</nav>
		</>
	)
}

export default SubscriptionMenu
