import React, { useCallback } from 'react';

export function useCombinedRefs<T>(
	...refs: (React.RefCallback<T> | React.MutableRefObject<T>)[]
): React.RefCallback<T> {
	return useCallback((target: T) => {
		for (const ref of refs) {
			if (isRefCallback(ref)) {
				ref(target);
			} else {
				ref.current = target;
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, refs);
}

function isRefCallback<T>(
	ref: React.RefCallback<T> | React.MutableRefObject<T>
): ref is React.RefCallback<T> {
	return typeof ref === 'function';
}
