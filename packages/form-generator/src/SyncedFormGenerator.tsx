import React, { useMemo } from 'react';
import { useStableValue } from '@campaign-buddy/common-hooks';
import { useSyncedStore } from '@syncedstore/react';
import styled from 'styled-components';
import { SyncedFormGeneratorProps } from './FormGeneratorProps';
import {
	applyAggregates,
	getFullAggregates,
} from '@campaign-buddy/apply-aggregates';
import {
	generateUiLayout,
	hasDynamicSchemas,
	resolveDynamicSchemas,
	cleanUiLayout,
	useHydratedEntities,
	usePartialDataPublisher,
	PartialDataSubscriptionContextProvider,
	useStore,
	useSyncedDataUpdater,
} from './utility';
import { FormUiLayout } from './FormUiLayout';

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

	const resolvedSchema = useMemo(() => {
		if (!hasDynamicSchemas(schema)) {
			return schema;
		}

		return resolveDynamicSchemas(schema, data.data);
	}, [schema, data]);

	const stableSchema = useStableValue(resolvedSchema);

	const uiLayout = useMemo(() => {
		if (!providedUiLayout) {
			return generateUiLayout(stableSchema);
		}

		return cleanUiLayout(
			providedUiLayout,
			stableSchema,
			fieldSettings.data,
			currentUserRole
		);
	}, [currentUserRole, fieldSettings, providedUiLayout, stableSchema]);

	const updateData = useSyncedDataUpdater(schema, dataStore);

	const updateFieldSettings = useSyncedDataUpdater(schema, fieldSettingsStore);

	const fullAggregates = useMemo(
		() => getFullAggregates(aggregates, stableSchema),
		[aggregates, stableSchema]
	);

	const { hydratedData } = useHydratedEntities(
		entityApi,
		data.data,
		resolvedSchema
	);

	const aggregatedData = useMemo(
		() => applyAggregates(hydratedData, fullAggregates),
		[hydratedData, fullAggregates]
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
			subscribeToAggregatedDataAtPath,
			getAggregatedDataAtPath,
			subscribeToFieldSettingsAtPath,
			getFieldSettingsAtPath,
		}),
		[
			getAggregatedDataAtPath,
			getDataAtPath,
			getFieldSettingsAtPath,
			subscribeToAggregatedDataAtPath,
			subscribeToDataAtPath,
			subscribeToFieldSettingsAtPath,
		]
	);

	return (
		<FormRoot>
			<PartialDataSubscriptionContextProvider
				value={partialDataSubscriptionContextProviderValue}
			>
				<FormUiLayout
					uiLayout={uiLayout}
					schema={stableSchema}
					widgetLookup={widgets}
					updateValue={updateData}
					UiSection={UiSection}
					aggregates={fullAggregates}
					entityApi={entityApi}
					updateFieldSettings={updateFieldSettings}
					shouldShowFieldSettingControls={Boolean(fieldSettingsDoc)}
					currentUserRole={currentUserRole}
				/>
			</PartialDataSubscriptionContextProvider>
		</FormRoot>
	);
};

const FormRoot = styled.div`
	display: flex;
	flex-direction: column;
`;
