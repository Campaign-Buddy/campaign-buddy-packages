import { useMemo } from 'react';

let _id = 0;

export function useHtmlId(): string {
	return useMemo(() => `campaign-buddy-${_id++}`, []);
}
