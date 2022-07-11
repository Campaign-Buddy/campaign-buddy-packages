import React, { useMemo } from 'react';
import { PaneModel } from '../../panelLayoutModel';
import { PaneDefinition } from './PaneDefinition';
import { useObserverState } from '../useObservedState';

export interface PaneWrapperProps {
	paneComponents: Record<string, PaneDefinition>;
	pane: PaneModel;
}

export function PaneWrapper({ paneComponents, pane }: PaneWrapperProps) {
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

	const definition = paneComponents[toolname];

	if (!definition) {
		return null;
	}

	const { Component } = definition;

	return <Component location={location} />;
}
