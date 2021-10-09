import { QueryResults, toStrings } from './aggregateUtilities';

export function JOIN(
	separator: string,
	...messages: QueryResults<string>
): string {
	const result = messages.reduce<string>((all, cur) => {
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

export function SPLIT(
	separator: string,
	...results: QueryResults<any>
): string[] {
	const messages = toStrings(results);

	return JOIN(separator, messages).split(separator);
}
