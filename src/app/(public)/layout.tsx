import Layout from '@/components/layout/Layout'

export default function PublicLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return <Layout>{children}</Layout>
}
