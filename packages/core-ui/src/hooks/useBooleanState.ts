import { useCallback, useState } from 'react';

export function useBooleanState(
	initialValue?: boolean
): [
  value: boolean,
  toggleOn: () => void,
  toggleOff: () => void,
  toggle: () => void
] {
	const [state, setState] = useState(initialValue ?? false);

	const toggle = useCallback(() => setState((prev) => !prev), []);
	const toggleOn = useCallback(() => setState(true), []);
	const toggleOff = useCallback(() => setState(false), []);

	return [state, toggleOn, toggleOff, toggle];
}
