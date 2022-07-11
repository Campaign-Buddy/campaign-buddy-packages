import React from 'react';
import {
	PanelLayoutModel,
	PaneModel,
	PaneDefinition,
} from '../panelLayoutModel';
import { PaneContentProvider } from './pane';
import { PanelLayout } from './panel-layout';
import { useObserverState } from './useObservedState';

export interface IPanelLayoutRootProps {
	panelLayout: PanelLayoutModel;
	paneDefintions: Record<string, PaneDefinition>;
}

export function PanelLayoutRoot({
	panelLayout,
	paneDefintions,
}: IPanelLayoutRootProps) {
	const panes = useObserverState(panelLayout.modelRegistry, () =>
		panelLayout.modelRegistry
			.getRegistry()
			.filter((x): x is PaneModel => x instanceof PaneModel)
	);

	return (
		<PaneContentProvider panes={panes} paneDefinitions={paneDefintions}>
			<PanelLayout panelLayout={panelLayout} />
		</PaneContentProvider>
	);
}
