import { type InputHTMLAttributes } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

import { cn } from '@/lib/utils'

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string
	errorMessage?: string
	registration: UseFormRegisterReturn
}

const Field = (props: FieldProps) => {
	const { className = '', label, errorMessage, registration, ...rest } = props

	return (
		<div className={cn('mb-4', {}, [className])}>
			<label>
				<span className='block text-gray-400 font-semibold mb-2'>{label}</span>
				<input
					className={cn(
						'w-full px-3 py-2 border rounded shadow-sm transition-colors focus:outline-none focus:ring-0 focus:border-white bg-transparent',
						{
							'border-red-500 border-border': errorMessage
						}
					)}
					{...rest}
					{...registration}
				/>
			</label>
			{errorMessage && <p className='text-red-500 text-sm mt-1'>{errorMessage}</p>}
		</div>
	)
}

export default Field
