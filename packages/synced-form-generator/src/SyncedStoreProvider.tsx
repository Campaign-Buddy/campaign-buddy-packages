import React, { useContext, useMemo } from 'react';
import {
	createSmartContext,
	useSmartContext,
} from '@campaign-buddy/smart-context';
import { SyncedFormDocument } from './useStore';
import { ObjectLocation } from '@campaign-buddy/object-navigator';

const AggregatedDataContext = createSmartContext<any>(undefined);

interface SyncedStoreContextData {
	store: SyncedFormDocument;
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
		}),
		[store]
	);

	return (
		<SyncedStoreContext.Provider value={contextValue}>
			<AggregatedDataContext.Provider value={aggregatedData}>
				{children}
			</AggregatedDataContext.Provider>
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

export function useAggregatedDataAtPath(path: ObjectLocation) {
	return useSmartContext(AggregatedDataContext, path);
}
