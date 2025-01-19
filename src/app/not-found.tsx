import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Not Found'
}
export default function NotFound() {
	return (
		<div className='flex items-center justify-center h-full'>
			<div className='text-center'>
				<h1 className='text-9xl font-bold mb-4'>404</h1>
				<p className='text-xl font-semibold'>Page doesn&apos;t exist!</p>
			</div>
		</div>
	)
}
