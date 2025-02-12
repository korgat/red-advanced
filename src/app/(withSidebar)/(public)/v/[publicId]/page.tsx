import type { Metadata } from 'next'

import { ToggleArticle } from '@/ui/toggle-article'
import VideoCard from '@/ui/video-card/VideoCard'

import ChannelInfoSection from './components/ChannelInfoSection'
import HeaderSection from './components/HeaderSection'
import PlayerSection from './components/PlayerSection'
import { stripHtml } from '@/lib/stripHtml'
import { videoService } from '@/services/video'

interface IChanelPageProps {
	params: Promise<{ publicId: string }>
}

export const revalidate = 100
export const dynamic = 'force-static'

export async function generateStaticParams() {
	const { data } = await videoService.getAll()
	const existingChannels = data.videos.reduce(
		(acc, video) => {
			if (video.publicId) {
				acc.push({ publicId: video.publicId })
			}
			return acc
		},
		[] as { publicId: string }[]
	)

	return existingChannels
}

export async function generateMetadata({ params }: IChanelPageProps): Promise<Metadata> {
	const { publicId } = await params
	const { data: video } = await videoService.getByPublicId(publicId)

	return {
		title: video.title,
		description: stripHtml(video.description).slice(0, 150),
		openGraph: {
			type: 'video.other',
			images: [video.thumbnailUrl]
		}
	}
}

export default async function VideoPage({ params }: IChanelPageProps) {
	const { publicId } = await params
	const { data: video } = await videoService.getByPublicId(publicId)

	return (
		<div className='grid grid-cols-[3fr_.8fr] gap-20'>
			<div>
				<PlayerSection fileName={video.videoFileName} />

				<HeaderSection
					title={video.title}
					viewsCount={video.viewsCount.toLocaleString()}
					likesCount={video.likes.length}
					videoId={video.id}
				/>

				<ChannelInfoSection
					channelAvatar={video.channel.avatarUrl}
					slug={video.channel.slug}
					channelName={video.channel.user.name}
					subscribersCount={video.channel.subscribers.length}
				/>

				<ToggleArticle content={video.description} />
			</div>

			<div className='grid grid-cols-1 gap-10'>
				{video.similarVideos.map(video => (
					<VideoCard
						key={video.publicId}
						item={video}
					/>
				))}
			</div>
		</div>
	)
}
