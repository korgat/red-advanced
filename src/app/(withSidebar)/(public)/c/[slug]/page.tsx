import { Video } from 'lucide-react'
import type { Metadata } from 'next'

import VideoSection from '@/components/video-section/VideoSection'

import HeaderSection from './components/HeaderSection'
import { channelService } from '@/services/channel'

interface IChanelPageProps {
	params: Promise<{ slug: string }>
}

export const revalidate = 100
export const dynamic = 'force-static'

export async function generateStaticParams() {
	const { data } = await channelService.getAllChannels()
	const existingChannels = data.reduce(
		(acc, channel) => {
			if (channel.slug) {
				acc.push({ slug: channel.slug })
			}
			return acc
		},
		[] as { slug: string }[]
	)

	return existingChannels
}

export async function generateMetadata({ params }: IChanelPageProps): Promise<Metadata> {
	const { slug } = await params
	const data = await channelService.getChannel(slug)
	const channel = data.data

	return {
		title: channel.user.name,
		description: channel.description,
		openGraph: {
			type: 'profile',
			images: [channel.bannerUrl]
		}
	}
}

export default async function ChannelPage({ params }: IChanelPageProps) {
	const { slug } = await params
	const data = await channelService.getChannel(slug)

	return (
		<div className='p-layout h-full'>
			<HeaderSection channel={data.data} />
			<VideoSection
				heading={{ text: 'Videos', icon: Video }}
				videos={data.data.videos}
			/>
		</div>
	)
}
