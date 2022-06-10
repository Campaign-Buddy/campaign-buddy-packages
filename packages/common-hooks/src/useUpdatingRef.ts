import React, { useRef } from 'react';

export function useUpdatingRef<T>(value: T): React.MutableRefObject<T> {
	const ref = useRef(value);
	ref.current = value;

	return ref;
}
