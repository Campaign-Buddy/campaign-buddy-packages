export function SUM(...numbers: (number[] | number)[]): number {
	return numbers.reduce<number>((total, cur) => {
		if (typeof cur === 'number' || (typeof cur === 'string' && !isNaN(cur))) {
			return total + cur;
		}

		if (Array.isArray(cur)) {
			return total + SUM(...cur);
		}

		return total;
	}, 0);
}
