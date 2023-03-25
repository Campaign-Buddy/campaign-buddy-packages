import React, { useContext, useMemo } from 'react';
import { MappedTypeDescription } from '@syncedstore/core/types/doc';

interface SyncedStoreContextData {
	dataStore: MappedTypeDescription<{ data: Record<any, any> }>;
	fieldSettingsStore: MappedTypeDescription<{ data: Record<any, any> }>;
	aggregatedData: any;
}

const SyncedStoreContext = React.createContext<
	SyncedStoreContextData | undefined
>(undefined);

export interface SyncedStoreProviderProps {
	dataStore: MappedTypeDescription<{ data: Record<any, any> }>;
	fieldSettingsStore: MappedTypeDescription<{ data: Record<any, any> }>;
	aggregatedData: any;
}

export function SyncedStoreProvider({
	dataStore,
	fieldSettingsStore,
	aggregatedData,
	children,
}: React.PropsWithChildren<SyncedStoreProviderProps>) {
	const contextValue = useMemo(
		() => ({
			dataStore,
			fieldSettingsStore,
			aggregatedData,
		}),
		[aggregatedData, dataStore, fieldSettingsStore]
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
