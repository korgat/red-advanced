'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LazyMotion, domAnimation } from 'framer-motion'
import { type ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'

import { store } from '@/store'

const client = new QueryClient()

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<QueryClientProvider client={client}>
			<Provider store={store}>
				<LazyMotion features={domAnimation}>
					{children}
					<Toaster />
				</LazyMotion>
			</Provider>
		</QueryClientProvider>
	)
}

export default Providers
