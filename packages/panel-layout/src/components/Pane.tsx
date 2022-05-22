import React from 'react';
import { PaneModel } from '../panelLayoutModel';
import { useObserverState } from './useObservedState';

interface IPaneProps {
	pane: PaneModel;
}

export const Pane: React.FC<React.PropsWithChildren<IPaneProps>> = ({
	pane,
}) => {
	const location = useObserverState(pane, () => pane.getLocation());

	return <p>I am a pane at {location}</p>;
};
