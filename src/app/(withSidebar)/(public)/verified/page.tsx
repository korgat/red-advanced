import { Check } from 'lucide-react'

import LinkButton from '@/ui/button/LinkButton'

import { PUBLIC } from '@/configs/public.pages'

export default function verifiedPage() {
	return (
		<div className='flex items-center justify-center p-layout h-full'>
			<div className='text-center'>
				<p className='text-4xl font-medium flex items-center gap-4 text-gray-400 mb-4'>
					<Check
						className='text-green-500'
						size={60}
					/>{' '}
					Email successfully verified!
				</p>
				<LinkButton
					variant='secondary'
					className='inline-flex'
					href={PUBLIC.AUTH}
				>
					Login
				</LinkButton>
			</div>
		</div>
	)
}
