import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { playlistService } from '@/services/playLists'
import type { IPlaylist, IPlaylistData } from '@/types/playlists.types'

export function useUserPlaylists() {
	const queryClient = useQueryClient()
	const {
		data: playlists,
		isPending: isPlaylistPending,
		refetch
	} = useQuery({
		queryKey: ['playlists'],
		queryFn: () => playlistService.getUserPlaylists()
	})

	const { mutate: createPlaylist, isPending: isCreatingPending } = useMutation({
		mutationKey: ['create-playlist'],
		mutationFn: (data: IPlaylistData) => playlistService.createPlaylist(data),
		onSuccess: response => {
			const playlist = response.data
			queryClient.setQueryData<{ data: IPlaylist[] }>(['playlists'], old => {
				if (!old) return { data: [playlist] }
				return {
					...old,
					data: [playlist, ...(old.data || [])]
				}
			})
			toast.success('Playlist was created')
		},
		onError: () => {
			toast.error('Playlist error')
		}
	})

	const { mutate: togglePlaylistVideo, isPending: isTogglingPlaylistVideo } = useMutation({
		mutationKey: ['update-playlist'],
		mutationFn: (data: { playlistId: string; videoId: string }) =>
			playlistService.toggleVideoInPlaylist(data.playlistId, data.videoId),
		onSuccess: () => {
			refetch()
		}
	})

	return {
		playlists,
		isPlaylistPending,
		createPlaylist,
		togglePlaylistVideo,
		isCreatingPending,
		isTogglingPlaylistVideo
	}
}
