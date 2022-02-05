import { MediaApi } from '@campaign-buddy/frontend-types';
import React, { createContext, useContext, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

interface FormWidgetContextData {
	mediaApi?: MediaApi;
}

const FormWidgetContext = createContext<FormWidgetContextData>({});

export interface FormWidgetProviderProps {
	queryClient: QueryClient;
	mediaApi: MediaApi;
}

export const FormWidgetProvider: React.FC<FormWidgetProviderProps> = ({
	queryClient,
	children,
	mediaApi,
}) => {
	const contextValue = useMemo(() => ({ mediaApi }), [mediaApi]);
	return (
		<QueryClientProvider client={queryClient}>
			<FormWidgetContext.Provider value={contextValue}>
				{children}
			</FormWidgetContext.Provider>
		</QueryClientProvider>
	);
};

export function useMediaApi() {
	const { mediaApi } = useContext(FormWidgetContext);
	if (!mediaApi) {
		throw new Error('mediaApi must be supplied through FormWidgetProvider');
	}

	return mediaApi;
}
