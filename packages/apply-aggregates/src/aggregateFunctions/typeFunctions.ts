import { QueryResults, toStrings } from './aggregateUtilities';

export function TO_NUMBER(...numbers: QueryResults<string>): number {
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

export function TO_BOOLEAN(...values: QueryResults<string>): boolean {
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

interface Option {
	displayValue: string;
	id: string;
}

export function TO_OPTIONS_FROM_STRINGS(
	...values: QueryResults<any>
): Option[] {
	return toStrings(values).map((x) => ({
		displayValue: x,
		id: `#aggregate_${x}`,
	}));
}

interface DehyrdatedEntity {
	id: string;
}

export function TO_ENTITY_FROM_ID(
	...values: QueryResults<any>
): DehyrdatedEntity | undefined {
	const stringValue = toStrings(values)?.[0];

	if (!stringValue) {
		return;
	}

	return {
		id: stringValue,
	};
}

export function TO_ENTITIES_FROM_IDS(
	...values: QueryResults<any>
): DehyrdatedEntity[] | undefined {
	return toStrings(values).map((id) => ({
		id,
	}));
}
