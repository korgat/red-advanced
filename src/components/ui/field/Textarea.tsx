import { type TextareaHTMLAttributes, useId } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

import { cn } from '@/lib/utils'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string
	resize?: boolean
	errorMessage?: string
	registration: UseFormRegisterReturn
	filedClass?: string
}

const Textarea = (props: TextareaProps) => {
	const {
		className = '',
		filedClass = '',
		label,
		errorMessage,
		registration,
		resize = false,
		...rest
	} = props
	const id = useId()

	return (
		<div className={cn('mb-4', {}, [className])}>
			{label && (
				<label
					htmlFor={id}
					className='block text-gray-400 font-semibold mb-2'
				>
					{label}
				</label>
			)}
			<textarea
				id={id}
				className={cn(
					'w-full px-3 py-2 border rounded shadow-sm transition-colors focus:outline-none focus:ring-0 focus:border-white bg-transparent block',
					{
						'border-red-500 border-border': errorMessage,
						'resize-none': !resize
					},
					[filedClass]
				)}
				{...rest}
				{...registration}
			/>

			{errorMessage && <p className='text-red-500 text-sm mt-1'>{errorMessage}</p>}
		</div>
	)
}

export default Textarea
