import React, { useMemo } from 'react';
import { PaneModel, PaneDefinition } from '../../panelLayoutModel';
import { useTabTitle } from '../pane-hooks';
import { useTabIcon } from '../pane-hooks/useTabIcon';
import { useObserverState } from '../useObservedState';

export interface PaneWrapperProps {
	paneDefinitions: Record<string, PaneDefinition>;
	pane: PaneModel;
}

export function PaneWrapper({ paneDefinitions, pane }: PaneWrapperProps) {
	const location = useObserverState(pane, pane.getLocation);
	const parameters = useObserverState(pane, pane.getParameters);

	const toolname = useMemo(() => {
		try {
			const uri = new URL(location);

			if (uri.protocol !== 'campaign-buddy:') {
				return location;
			}

			return uri.pathname.split('/')[0];
		} catch {
			return location;
		}
	}, [location]);

	const definition = paneDefinitions[toolname ?? ''];

	useTabTitle(definition?.defaultTitle);
	useTabIcon(definition?.defaultIcon);

	if (!definition) {
		return null;
	}

	const { Component } = definition;

	return <Component location={location} parameters={parameters} />;
}
