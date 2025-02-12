import { SquarePlay } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { PUBLIC } from '@/configs/public.pages'
import { STUDIO } from '@/configs/studio.pages'
import { cn } from '@/lib/utils'

interface LogoProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const Logo = (props: LogoProps) => {
	const { className = '', ...rest } = props
	const pathname = usePathname()

	return (
		<Link
			{...rest}
			className={cn('flex items-center gap-0.5', {}, [className])}
			href={PUBLIC.HOME}
		>
			<SquarePlay
				className='text-primary min-w-7'
				width={28}
				height={28}
			/>
			<span className='text-xl font-medium'>
				{pathname.includes(STUDIO.HOME) ? 'Studio' : 'Red Video'}
			</span>
		</Link>
	)
}

export default Logo
