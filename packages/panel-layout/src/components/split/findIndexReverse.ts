export function findIndexReverse<T>(
	arr: T[],
	find: (el: T) => boolean
): number {
	for (let i = arr.length - 1; i >= 0; i--) {
		if (find(arr[i])) {
			return i;
		}
	}
	return -1;
}
