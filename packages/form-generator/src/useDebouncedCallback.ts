import { useMemo } from 'react';

function debounce<T extends Function>(cb: T, wait = 250) {
    let h: NodeJS.Timeout;
    let callable = (...args: any) => {
        clearTimeout(h);
        h = setTimeout(() => cb(...args), wait);
    };
    return <T>(<any>callable);
}

export function useDebouncedCallback<T extends Function>(cb: T, deps: any[], wait = 250): T {
	return useMemo(() => debounce(cb, wait), [wait, ...deps]);
}
