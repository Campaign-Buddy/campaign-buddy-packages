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

export function JOIN(separator: string, ...messages: (string[] | string)[]): string {
	const result = messages.reduce<string>((all, cur, index) => {
		if (Array.isArray(cur)) {
			return `${all}${separator}${JOIN(separator, ...cur)}`;
		}

		if (typeof cur === 'object') {
			return all;
		}

		return `${all}${separator}${cur}`;
	}, '');

	if (result.length === 0) {
		return result;
	}

	return result.substring(separator.length);
}
