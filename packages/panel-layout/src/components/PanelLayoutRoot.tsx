import React from 'react';
import { PanelLayoutModel, PaneModel } from '../panelLayoutModel';
import { PaneContentProvider, PaneDefinition } from './pane';
import { PanelLayout } from './panel-layout';
import { useObserverState } from './useObservedState';

export interface IPanelLayoutRootProps {
	panelLayout: PanelLayoutModel;
	paneComponents: Record<string, PaneDefinition>;
}

export function PanelLayoutRoot({
	panelLayout,
	paneComponents,
}: IPanelLayoutRootProps) {
	const panes = useObserverState(panelLayout.modelRegistry, () =>
		panelLayout.modelRegistry
			.getRegistry()
			.filter((x): x is PaneModel => x instanceof PaneModel)
	);

	return (
		<PaneContentProvider panes={panes} paneComponents={paneComponents}>
			<PanelLayout panelLayout={panelLayout} />
		</PaneContentProvider>
	);
}
