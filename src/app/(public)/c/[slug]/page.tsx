// todo: dynamic meta
// export const metadata: Metadata = {
// 	title: 'Home',
// 	description: 'Explore videos on red videos platform',
// 	alternates: {
// 		canonical: '/'
// 	},
// 	openGraph: {
// 		type: 'website',
// 		url: '/',
// 		title: 'RED Video'
// 	}
// }
import { channelService } from '@/services/channel'

interface IChanelPageProps {
	params: {
		slug: string
	}
}

export const revalidate = 100
export const dynamic = 'force-static'

export default async function ChannelPage({ params }: IChanelPageProps) {
	const { slug } = await params
	const data = await channelService.getChannel(slug)
	return <div className='flex flex-col gap-4'>Channel 888 {slug}</div>
}
