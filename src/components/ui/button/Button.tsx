import { type ButtonHTMLAttributes, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children?: ReactNode
	isLoading?: boolean
	variant?: 'primary' | 'secondary' | 'simple'
}

const Button = (props: ButtonProps) => {
	const { className = '', isLoading, children, variant, ...rest } = props

	return (
		<button
			{...rest}
			className={cn(
				'py-2 px-10 font-semibold rounded transition-colors text-gray-500 hover:text-white disabled:bg-gray-400',
				{
					'bg-primary text-white hover:bg-red-400': variant === 'primary',
					'bg-gray-600 text-white hover:bg-gray-500': variant === 'secondary',
					'bg-border rounded font-medium hover:bg-gray-700/95': variant === 'simple'
				},
				[className]
			)}
			disabled={isLoading || props.disabled}
		>
			{isLoading ? 'Loading...' : children}
		</button>
	)
}

export default Button
