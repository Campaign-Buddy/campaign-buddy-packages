import React from 'react';
import { PanelLayoutModel, PaneModel } from '../panelLayoutModel';
import { PanelLayout } from './panel-layout';
import { useObserverState } from './useObservedState';

export interface IPanelLayoutRootProps {
	panelLayout: PanelLayoutModel;
}

export function PanelLayoutRoot({ panelLayout }: IPanelLayoutRootProps) {
	const panes = useObserverState(panelLayout.modelRegistry, () => {
		const p = panelLayout.modelRegistry
			.getRegistry()
			.filter((x) => x instanceof PaneModel);

		console.log('panes', p);
		return p;
	});

	return <PanelLayout panelLayout={panelLayout} />;
}
