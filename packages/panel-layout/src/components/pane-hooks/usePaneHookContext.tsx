import React, { useContext, useMemo, useRef } from 'react';
import { PaneModel, TabIcon } from '../../panelLayoutModel';

interface PaneHookContext {
	pane: PaneModel;
	title: React.MutableRefObject<string | undefined>;
	icon: React.MutableRefObject<TabIcon | undefined>;
}

const PaneHookContext = React.createContext<PaneHookContext | undefined>(
	undefined
);

export interface PaneHookContextProviderProps {
	pane: PaneModel;
}

export function PaneHookContextProvider({
	pane,
	children,
}: React.PropsWithChildren<PaneHookContextProviderProps>) {
	const title = useRef<string>();
	const icon = useRef<TabIcon>();

	const context = useMemo<PaneHookContext>(
		() => ({
			pane,
			title,
			icon,
		}),
		[pane]
	);

	return (
		<PaneHookContext.Provider value={context}>
			{children}
		</PaneHookContext.Provider>
	);
}

export function usePaneHookContext() {
	const context = useContext(PaneHookContext);

	if (!context) {
		throw new Error('Not in a pane context');
	}

	return context;
}
