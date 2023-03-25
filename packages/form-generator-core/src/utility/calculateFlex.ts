export function calculateFlex(cols: number) {
	return `1 0 calc(${Math.floor((cols / 12) * 100)}% - 8px)`;
}
