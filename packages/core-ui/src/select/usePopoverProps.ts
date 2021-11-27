import { useMemo } from 'react';

export function usePopoverProps(setQuery: (query: string) => void) {
	return useMemo(
		() => ({
			minimal: true,
			portalClassName: 'campaign-buddy-select',
			onClosing: () => setQuery(''),
			enforceFocus: false,
			shouldReturnFocusOnClose: false,
		}),
		[setQuery]
	);
}
