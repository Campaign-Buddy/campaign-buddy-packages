export function getRandomString() {
	return `${new Date().getMilliseconds()}${Math.random()}`;
}
