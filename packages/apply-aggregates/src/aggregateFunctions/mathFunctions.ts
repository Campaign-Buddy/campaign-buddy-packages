import { asSingleValue, QueryResults } from './aggregateUtilities';

export function SUM(...numbers: QueryResults<number>): number {
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

export function BETWEEN_RANGE(
	min: number,
	max: number,
	...values: QueryResults<number>
): number {
	return Math.min(max, Math.max(min, asSingleValue(values, min)));
}

export function FLOOR(...values: (number | number[])[]): number {
	return Math.floor(asSingleValue(values, NaN));
}
