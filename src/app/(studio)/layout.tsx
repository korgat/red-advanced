import Layout from '@/components/layout/Layout'

export default function StudioLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return <Layout>{children}</Layout>
}
