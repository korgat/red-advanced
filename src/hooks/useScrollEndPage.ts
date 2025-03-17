import { useEffect } from 'react'

interface Props {
	hasNextPage: boolean
	isFetchingNextPage: boolean
	onEnd: () => void
}

export function useScrollEndPage({ onEnd, hasNextPage, isFetchingNextPage }: Props) {
	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + document.documentElement.scrollTop >=
					document.documentElement.offsetHeight * 0.99 &&
				hasNextPage &&
				!isFetchingNextPage
			) {
				onEnd()
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [hasNextPage, isFetchingNextPage, onEnd])
}
