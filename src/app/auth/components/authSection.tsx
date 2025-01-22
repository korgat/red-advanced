'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux'

import AuthForm from '@/components/form/auth-form/AuthForm'
import Logo from '@/components/logo/Logo'

import { selectIsAuth } from '@/store/auth/auth.selectors'

import { cn } from '@/lib/utils'

interface AuthSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const AuthSection = (props: AuthSectionProps) => {
	const { className = '', ...rest } = props
	const accessToken = useSelector(selectIsAuth)
	const router = useRouter()

	// useEffect(() => {
	// 	if (!accessToken) return
	// 	router.push(PUBLIC.HOME)
	// }, [accessToken, router])

	return (
		<div
			{...rest}
			className={cn('h-screen flex items-center justify-center', {}, [className])}
		>
			<div className='w-80 flex flex-col items-center'>
				<Logo className='mb-6' />
				<AuthForm className='w-full' />
			</div>
		</div>
	)
}

export default AuthSection
