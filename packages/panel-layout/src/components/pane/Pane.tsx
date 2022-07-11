import React from 'react';
import * as portals from 'react-reverse-portal';
import { PaneModel } from '../../panelLayoutModel';
import { usePaneNode } from './PaneContentProvider';

interface IPaneProps {
	pane: PaneModel;
}

export const Pane: React.FC<React.PropsWithChildren<IPaneProps>> = ({
	pane,
}) => {
	const paneNode = usePaneNode(pane.getId());

	if (!paneNode) {
		return null;
	}

	return <portals.OutPortal node={paneNode} />;
};
