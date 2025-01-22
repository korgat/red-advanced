import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'

import Providers from '@/providers/Providers'

import '@/styles/globals.scss'

const notoSans = Noto_Sans({
	variable: '--font-noto-sans',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: {
		absolute: 'RED Video',
		template: `%s | RED Video`
	},
	description: 'Red video platform'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${notoSans.className} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
