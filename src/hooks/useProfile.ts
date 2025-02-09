import { useQuery } from '@tanstack/react-query'

import { profileService } from '@/services/profile'

export function useProfile() {
	const { data, isPending, isRefetching, isSuccess, refetch } = useQuery({
		queryKey: ['profile'],
		queryFn: () => profileService.getProfile(),
		refetchInterval: 1800000 //30 min.
	})

	return { data, isPending, isRefetching, isSuccess, refetch }
}
