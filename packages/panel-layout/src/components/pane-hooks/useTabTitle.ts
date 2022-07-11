import { useEffect } from 'react';
import { usePaneHookContext } from './usePaneHookContext';

export function useTabTitle(title?: string) {
	const { title: titleRef, pane } = usePaneHookContext();

	if (title) {
		titleRef.current = title;
	}

	useEffect(() => {
		if (titleRef.current && titleRef.current !== pane.getTabTitle()) {
			pane.setTabTitle(titleRef.current);
		}
	});
}
