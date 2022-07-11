import isEqual from 'lodash.isequal';
import { useEffect } from 'react';
import { TabIcon } from '../../panelLayoutModel';
import { usePaneHookContext } from './usePaneHookContext';

export function useTabIcon(icon?: TabIcon) {
	const { icon: iconRef, pane } = usePaneHookContext();

	if (icon) {
		iconRef.current = icon;
	}

	useEffect(() => {
		if (iconRef.current && !isEqual(iconRef.current, pane.getTabIcon())) {
			pane.setTabIcon(iconRef.current);
		}
	});
}
