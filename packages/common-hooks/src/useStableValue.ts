import { useEffect, useRef, useState } from 'react';
import isEqual from 'lodash.isequal';

/**
 * Returns a "stable" copy of value that only changes
 * if value changes. Array order does not matter
 *
 * Prefer to try to memoize value before using this
 * hook. Only use this hook when referential equality
 * is essential (i.e. not for premature performance
 * optimizations)
 */
export function useStableValue<T>(value: T): T {
	const previousValue = useRef(value);
	const [stableValue, setStableValue] = useState(value);

	useEffect(() => {
		if (!isEqual(previousValue.current, value)) {
			setStableValue(value);
		}

		return () => {
			previousValue.current = value;
		};
	}, [value]);

	return stableValue;
}
