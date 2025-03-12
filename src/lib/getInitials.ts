export const getInitials = (value: string | undefined) => {
	if (!value) {
		return 'AU'
	}

	const nameParts = value.split(' ')

	if (nameParts.length === 1) {
		return (nameParts[0].substring(0, 2) || 'AU').toUpperCase()
	}

	const firstInitial = nameParts[0] && nameParts[0][0] ? nameParts[0][0] : 'A'
	const secondInitial = nameParts[1] && nameParts[1][0] ? nameParts[1][0] : 'U'

	return `${firstInitial}${secondInitial}`.toUpperCase()
}
