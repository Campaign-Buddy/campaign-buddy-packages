import React, { useMemo } from 'react';
import { PaneModel, PaneDefinition } from '../../panelLayoutModel';
import { useObserverState } from '../useObservedState';

export interface PaneWrapperProps {
	paneDefinitions: Record<string, PaneDefinition>;
	pane: PaneModel;
}

export function PaneWrapper({ paneDefinitions, pane }: PaneWrapperProps) {
	const location = useObserverState(pane, pane.getLocation);

	const toolname = useMemo(() => {
		try {
			const uri = new URL(location);

			if (uri.protocol !== 'campaign-buddy:') {
				return null;
			}

			return uri.pathname.split('/')[0];
		} catch {
			return null;
		}
	}, [location]);

	if (!toolname) {
		return null;
	}

	const definition = paneDefinitions[toolname];

	if (!definition) {
		return null;
	}

	const { Component } = definition;

	return <Component location={location} />;
}
