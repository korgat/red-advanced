export const getInitials = (value: string | undefined) => {
	if (!value) {
		return 'AU'
	}
	const [firstName, secondName] = value.split(' ')
	return `${firstName[0]}${secondName[0]}`.toLocaleUpperCase()
}
