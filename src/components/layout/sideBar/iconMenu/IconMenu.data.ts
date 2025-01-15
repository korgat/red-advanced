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
import { PAGE } from '@/configs/public-page.config'

export const MAIN_LIST_DATA: IIconMenuItem[] = [
	{
		name: 'Explore',
		icon: Compass,
		link: PAGE.HOME
	},
	{
		name: 'Trending',
		icon: Flame,
		link: PAGE.TRENDING
	},
	{
		name: 'Video games',
		icon: Joystick,
		link: PAGE.VIDEO_GAMES
	}
]

export const SECONDARY_LIST_DATA: IIconMenuItem[] = [
	{
		icon: TvMinimalPlay,
		name: 'My channel',
		link: PAGE.MY_CHANNEL
	},
	{
		icon: CirclePlay,
		name: 'Subscriptions',
		link: PAGE.SUBSCRIPTIONS
	},
	{
		icon: History,
		name: 'History',
		link: PAGE.HISTORY
	},
	{
		icon: FolderHeart,
		name: 'Liked videos',
		link: PAGE.LIKED_VIDEOS
	}
]

export const ADDITIONAL_LIST_DATA: IIconMenuItem[] = [
	{
		icon: Settings,
		name: 'Settings',
		link: PAGE.SETTINGS
	},
	{
		icon: Info,
		name: 'Send Feedback',
		link: PAGE.FEEDBACK
	}
]
