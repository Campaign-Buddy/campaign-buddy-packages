import React, { useEffect, useRef } from 'react';

export function useSyncedRef<T>(value: T): React.MutableRefObject<T> {
	const ref = useRef(value);

	useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref;
}
