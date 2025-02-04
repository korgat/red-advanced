import {
	CirclePlay,
	Compass,
	Flame,
	FolderHeart,
	History,
	Info,
	Joystick,
	Settings,
	TvMinimalPlay
} from 'lucide-react'

import type { IIconMenuItem } from './iconMenuItem/IconMenuItem.types'
import { PUBLIC } from '@/configs/public.pages'
import { STUDIO } from '@/configs/studio.pages'

export const MAIN_LIST_DATA: IIconMenuItem[] = [
	{
		name: 'Explore',
		icon: Compass,
		link: PUBLIC.HOME
	},
	{
		name: 'Trending',
		icon: Flame,
		link: PUBLIC.TRENDING
	},
	{
		name: 'Video games',
		icon: Joystick,
		link: PUBLIC.VIDEO_GAMES
	}
]

export const SECONDARY_LIST_DATA: IIconMenuItem[] = [
	{
		icon: TvMinimalPlay,
		name: 'My channel',
		link: PUBLIC.MY_CHANNEL
	},
	{
		icon: CirclePlay,
		name: 'Subscriptions',
		link: PUBLIC.SUBSCRIPTIONS
	},
	{
		icon: History,
		name: 'History',
		link: PUBLIC.HISTORY
	},
	{
		icon: FolderHeart,
		name: 'Liked videos',
		link: PUBLIC.LIKED_VIDEOS
	}
]

export const ADDITIONAL_LIST_DATA: IIconMenuItem[] = [
	{
		icon: Settings,
		name: 'Settings',
		link: STUDIO.SETTINGS
	},
	{
		icon: Info,
		name: 'Send Feedback',
		link: PUBLIC.FEEDBACK
	}
]
