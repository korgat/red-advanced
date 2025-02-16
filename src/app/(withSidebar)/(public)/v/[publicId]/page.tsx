import type { Metadata } from 'next'

import VideoPageContainer from './components/VideoPageContainer'
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

	return <VideoPageContainer video={video} />
}
