import React, { useContext, useMemo } from 'react';
import { SyncedFormDocument } from './useStore';

interface SyncedStoreContextData {
	store: SyncedFormDocument;
	aggregatedData: any;
}

const SyncedStoreContext = React.createContext<
	SyncedStoreContextData | undefined
>(undefined);

export interface SyncedStoreProviderProps {
	store: SyncedFormDocument;
	aggregatedData: any;
}

export function SyncedStoreProvider({
	store,
	aggregatedData,
	children,
}: React.PropsWithChildren<SyncedStoreProviderProps>) {
	const contextValue = useMemo(
		() => ({
			store,
			aggregatedData,
		}),
		[aggregatedData, store]
	);

	return (
		<SyncedStoreContext.Provider value={contextValue}>
			{children}
		</SyncedStoreContext.Provider>
	);
}

export function useSyncedStoreContext() {
	const context = useContext(SyncedStoreContext);

	if (!context) {
		throw new Error('SyncedStoreContextProvider is missing');
	}

	return context;
}
