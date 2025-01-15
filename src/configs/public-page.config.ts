class PublicPage {
	HOME = '/'
	TRENDING = '/trending'
	VIDEO_GAMES = '/video-games'

	SEARCH = '/search'

	MY_CHANNEL = '/my-channel'
	SUBSCRIPTIONS = '/subscriptions'
	HISTORY = '/history'
	LIKED_VIDEOS = '/liked-videos'

	SETTINGS = '/settings'
	FEEDBACK = '/feedback'

	VIDEO(url: string) {
		return `/v/${url}`
	}

	CHANNEL(path: string) {
		return `/c/${path}`
	}
}

export const PAGE = new PublicPage()
