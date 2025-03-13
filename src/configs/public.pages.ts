class PublicPage {
	AUTH = '/auth'

	HOME = '/'
	TRENDING = '/trending'
	VIDEO_GAMES = '/video-games'

	MY_CHANNEL = '/my-channel'
	SUBSCRIPTIONS = '/my/subscriptions'
	HISTORY = '/my/history'
	LIKED_VIDEOS = '/my/liked-videos'

	SETTINGS = '/settings'
	FEEDBACK = '/feedback'

	VIDEO(url: string) {
		return `/v/${url}`
	}

	CHANNEL(path: string) {
		return `/c/${path}`
	}

	SEARCH(searchTerm: string) {
		return `/s?term=${searchTerm}`
	}
}

export const PUBLIC = new PublicPage()
