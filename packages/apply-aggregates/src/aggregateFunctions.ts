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

export function TO_NUMBER(...numbers: (string | string[])[]): number {
	if (numbers.length !== 1) {
		return 0;
	}

	let value = numbers[0];

	if (Array.isArray(value)) {
		if (value.length !== 1) {
			return 0;
		}

		value = value[0];
	}

	if (!isNaN(parseInt(value))) {
		return parseInt(value);
	}

	return 0;
}

export function TO_BOOLEAN(...values: (string | string[])[]): boolean {
	if (values.length !== 1) {
		return false;
	}

	let value = values[0];

	if (Array.isArray(value)) {
		if (value.length !== 1) {
			return false;
		}

		value = value[0];
	}

	return Boolean(value);
}
