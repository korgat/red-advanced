export const transformVideoDuration = (duration: number) => {
	return Math.floor(duration / 60) + ':' + ('0' + Math.floor(duration % 60)).slice(-2)
}
