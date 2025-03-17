'use client'

import React from 'react'

import { AuthForm } from '@/components/form/auth-form'
import Logo from '@/components/logo/Logo'

import { cn } from '@/lib/utils'

interface AuthSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const AuthSection = (props: AuthSectionProps) => {
	const { className = '', ...rest } = props

	return (
		<div
			{...rest}
			className={cn('h-screen flex items-center justify-center p-layout', {}, [className])}
		>
			<div className='w-80 flex flex-col items-center'>
				<Logo className='mb-6' />
				<AuthForm className='w-full' />
			</div>
		</div>
	)
}

export default AuthSection
