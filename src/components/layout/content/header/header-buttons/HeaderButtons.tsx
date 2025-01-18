import { Bell, LayoutGrid, SquarePlus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { STUDIO } from '@/configs/studio.pages'
import { cn } from '@/lib/utils'

interface HeaderButtonsProps extends React.HTMLAttributes<HTMLDivElement> {}

const HeaderButtons = (props: HeaderButtonsProps) => {
	const { className = '', ...rest } = props

	return (
		<div
			{...rest}
			className={cn('flex items-center gap-5', {}, [className])}
		>
			<Link href={STUDIO.UPLOAD_VIDEO}>
				<SquarePlus
					size={28}
					className='opacity-80 hover:opacity-100'
				/>
			</Link>
			<Link href={STUDIO.HOME}>
				<LayoutGrid
					size={28}
					className='opacity-80 hover:opacity-100'
				/>
			</Link>
			<Link href={STUDIO.SETTINGS}>
				<Bell
					size={28}
					className='opacity-80 hover:opacity-100'
				/>
			</Link>
		</div>
	)
}

export default HeaderButtons
