import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'

import Providers from '@/providers/Providers'

import { SITE_NAME } from '@/const/constants'

import '@/styles/globals.scss'

const notoSans = Noto_Sans({
	variable: '--font-noto-sans',
	subsets: ['latin']
})

export const metadata: Metadata = {
	icons: {
		icon: '/images/logo.svg',
		shortcut: '/images/logo.svg',
		apple: '/images/256.png',
		other: {
			rel: 'touch-icons',
			url: '/images/256.png',
			sizes: '256x256',
			type: 'image/png'
		}
	},
	metadataBase: new URL(process.env.DOMAIN || ''),
	title: {
		absolute: `${SITE_NAME}`,
		template: `%s | ${SITE_NAME}`
	},
	description: 'Video platform for watching video',
	openGraph: {
		type: 'website',
		siteName: 'My domain',
		emails: [`info@redvideo.com`],
		images: [
			{
				url: '/images/og.jpg',
				width: 909,
				height: 500,
				alt: `${SITE_NAME}`
			}
		]
	},
	applicationName: `${SITE_NAME}`,
	manifest: '/manifest.json',
	formatDetection: {
		telephone: false
	}
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
