'use client'

import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import Button from '@/ui/button/Button'
import Field from '@/ui/field/Field'

import { useAuthForm } from './useAuthForm'
import { cn } from '@/lib/utils'

import styles from './captcha.module.scss'

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const AuthForm = (props: AuthFormProps) => {
	const { className = '', ...rest } = props
	const [isLogin, setIsLogin] = useState(true)

	const { isLoading, onSubmit, recaptchaRef, errors, register, watch } = useAuthForm(
		isLogin ? 'login' : 'register'
	)

	return (
		<div
			{...rest}
			className={cn('', {}, [className])}
		>
			<div className='flex justify-center mb-6'>
				<Button
					className={cn('border-b-4 hover:border-white border-transparent', {
						'border-border text-white': isLogin
					})}
					type='button'
					onClick={() => setIsLogin(true)}
				>
					Login
				</Button>
				<Button
					className={cn('border-b-4 hover:border-white border-transparent', {
						'border-border text-white': !isLogin
					})}
					type='button'
					onClick={() => setIsLogin(false)}
				>
					Register
				</Button>
			</div>
			<form onSubmit={onSubmit}>
				<Field
					label='Email'
					type='email'
					registration={register('email', { required: 'Email is required!' })}
					errorMessage={errors.email?.message}
					placeholder='Enter email:'
				/>
				<Field
					label='Password'
					type='password'
					registration={register('password', { required: 'Password is required!' })}
					errorMessage={errors.password?.message}
					placeholder='Enter password:'
				/>
				{!isLogin && (
					<Field
						label='Password confirmation'
						type='password'
						registration={register('confirmPassword', {
							required: 'Password confirmation is required!',
							validate: value => value === watch('password') || 'Passwords don`t match!'
						})}
						errorMessage={errors.confirmPassword?.message}
						placeholder='Enter password again:'
					/>
				)}
				<ReCAPTCHA
					ref={recaptchaRef}
					size='normal'
					sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
					theme='light'
					className={styles.recaptcha}
				/>
				<div className='text-center mt-6'>
					<Button
						type='submit'
						variant='primary'
						isLoading={isLoading}
					>
						{isLogin ? 'Login' : 'Register'}
					</Button>
				</div>
			</form>
		</div>
	)
}

export default AuthForm
