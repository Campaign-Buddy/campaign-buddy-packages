import { MediaApi } from '@campaign-buddy/frontend-types';
import React, { createContext, useContext, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export interface AvailableFormActions {
	canUpdateVisibilitySettings: boolean;
	canUpdateAggregationSettings: boolean;
}

export interface VisibilitySetting {
	roles: string[];
	label: string;
}

interface FormWidgetContextData {
	mediaApi?: MediaApi;
	visibilitySettings?: VisibilitySetting[];
	availableActions?: AvailableFormActions;
	showAggregationIndicator?: boolean;
}

const FormWidgetContext = createContext<FormWidgetContextData>({});

export interface FormWidgetProviderProps {
	queryClient: QueryClient;
	mediaApi: MediaApi;
	visibilitySettings?: VisibilitySetting[];
	availableActions?: AvailableFormActions;
	showAggregationIndicator?: boolean;
}

export const FormWidgetProvider: React.FC<
	React.PropsWithChildren<FormWidgetProviderProps>
> = ({
	queryClient,
	children,
	mediaApi,
	visibilitySettings,
	availableActions,
	showAggregationIndicator,
}) => {
	const contextValue = useMemo(
		() => ({
			mediaApi,
			visibilitySettings,
			availableActions,
			showAggregationIndicator,
		}),
		[availableActions, mediaApi, showAggregationIndicator, visibilitySettings]
	);
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

export function useVisibilitySettings(): VisibilitySetting[] {
	const { visibilitySettings } = useContext(FormWidgetContext);
	return visibilitySettings ?? [];
}

export function useAvailableActions(): AvailableFormActions {
	const { availableActions } = useContext(FormWidgetContext);
	return (
		availableActions ?? {
			canUpdateAggregationSettings: false,
			canUpdateVisibilitySettings: false,
		}
	);
}

export function useShouldShowAggregationIndicator(): boolean {
	const { showAggregationIndicator } = useContext(FormWidgetContext);
	return Boolean(showAggregationIndicator);
}
