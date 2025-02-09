import Layout from '@/components/layout/Layout'

export default function UserLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return <Layout>{children}</Layout>
}
