import React, { useMemo } from 'react';
import { useSyncedStore } from '@syncedstore/react';
import styled from 'styled-components';
import { SyncedFormGeneratorProps } from './FormGeneratorProps';
import {
	usePartialDataPublisher,
	PartialDataSubscriptionContextProvider,
	useStore,
	useSyncedDataUpdater,
} from './utility';
import { DebouncedWidget } from './DebouncedWidget';
import {
	FormUiLayout,
	useFormGeneratorState,
} from '@campaign-buddy/form-generator-core';

export const SyncedFormGenerator: React.FC<
	React.PropsWithChildren<SyncedFormGeneratorProps>
> = ({
	doc,
	fieldSettingsDoc,
	schema,
	widgets,
	uiLayout: providedUiLayout,
	UiSection,
	aggregates,
	entityApi,
	currentUserRole,
}) => {
	const dataStore = useStore(doc);
	const fieldSettingsStore = useStore(fieldSettingsDoc);

	const data = useSyncedStore(dataStore);
	const fieldSettings = useSyncedStore(fieldSettingsStore);

	const { resolvedSchema, aggregatedData, fullAggregates, uiLayout } =
		useFormGeneratorState({
			schema,
			data,
			currentUserRole,
			fieldSettings,
			providedUiLayout,
			entityApi,
			aggregates,
		});

	const updateDataAtPath = useSyncedDataUpdater(schema, dataStore);

	const updateFieldSettingsAtPath = useSyncedDataUpdater(
		schema,
		fieldSettingsStore
	);

	const { subscribe: subscribeToDataAtPath, getDataAtPath } =
		usePartialDataPublisher(data.data);

	const {
		subscribe: subscribeToFieldSettingsAtPath,
		getDataAtPath: getFieldSettingsAtPath,
	} = usePartialDataPublisher(fieldSettings.data);

	const {
		subscribe: subscribeToAggregatedDataAtPath,
		getDataAtPath: getAggregatedDataAtPath,
	} = usePartialDataPublisher(aggregatedData);

	const partialDataSubscriptionContextProviderValue = useMemo(
		() => ({
			subscribeToDataAtPath,
			getDataAtPath,
			updateDataAtPath,
			subscribeToAggregatedDataAtPath,
			getAggregatedDataAtPath,
			subscribeToFieldSettingsAtPath,
			getFieldSettingsAtPath,
			updateFieldSettingsAtPath,
		}),
		[
			getAggregatedDataAtPath,
			getDataAtPath,
			getFieldSettingsAtPath,
			subscribeToAggregatedDataAtPath,
			subscribeToDataAtPath,
			subscribeToFieldSettingsAtPath,
			updateDataAtPath,
			updateFieldSettingsAtPath,
		]
	);

	return (
		<FormRoot>
			<PartialDataSubscriptionContextProvider
				value={partialDataSubscriptionContextProviderValue}
			>
				<FormUiLayout
					uiLayout={uiLayout}
					schema={resolvedSchema}
					widgetLookup={widgets}
					UiSection={UiSection}
					aggregates={fullAggregates}
					entityApi={entityApi}
					shouldShowFieldSettingControls={Boolean(fieldSettingsDoc)}
					currentUserRole={currentUserRole}
					FormWidgetRenderer={DebouncedWidget}
				/>
			</PartialDataSubscriptionContextProvider>
		</FormRoot>
	);
};

const FormRoot = styled.div`
	display: flex;
	flex-direction: column;
`;
