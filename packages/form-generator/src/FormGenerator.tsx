import React, { useCallback, useMemo } from 'react';
import { FormGeneratorProps } from './FormGeneratorProps';
import {
	applyAggregates,
	getFullAggregates,
} from '@campaign-buddy/apply-aggregates';
import {
	generateUiLayout,
	useDataUpdater,
	hasDynamicSchemas,
	resolveDynamicSchemas,
	cleanUiLayout,
	useHydratedEntities,
	usePartialDataPublisher,
	PartialDataSubscriptionContextProvider,
} from './utility';
import { FormUiLayout } from './FormUiLayout';
import styled from 'styled-components';
import { useStableValue } from '@campaign-buddy/common-hooks';

const defaultData = {};
const defaultFieldSettings = {};

export const FormGenerator: React.FC<FormGeneratorProps> = ({
	schema,
	data = defaultData,
	onChange,
	widgets,
	uiLayout: providedUiLayout,
	UiSection,
	aggregates,
	entityApi,
	updateFieldSettings: providedUpdateFieldSettings,
	fieldSettings = defaultFieldSettings,
	currentUserRole,
}) => {
	const resolvedSchema = useMemo(() => {
		if (!hasDynamicSchemas(schema)) {
			return schema;
		}

		return resolveDynamicSchemas(schema, data);
	}, [schema, data]);

	const stableSchema = useStableValue(resolvedSchema);

	const uiLayout = useMemo(() => {
		if (!providedUiLayout) {
			return generateUiLayout(stableSchema);
		}

		return cleanUiLayout(
			providedUiLayout,
			stableSchema,
			fieldSettings,
			currentUserRole
		);
	}, [currentUserRole, fieldSettings, providedUiLayout, stableSchema]);

	const updateData = useDataUpdater(schema, data, onChange);

	const updateFieldSettingsOrNoop = useCallback(
		(newFieldSettings: any) => {
			providedUpdateFieldSettings?.(newFieldSettings);
		},
		[providedUpdateFieldSettings]
	);
	const updateFieldSettings = useDataUpdater(
		schema,
		fieldSettings,
		updateFieldSettingsOrNoop
	);

	const fullAggregates = useMemo(
		() => getFullAggregates(aggregates, stableSchema),
		[aggregates, stableSchema]
	);

	const { hydratedData } = useHydratedEntities(entityApi, data, resolvedSchema);

	const aggregatedData = useMemo(
		() => applyAggregates(hydratedData, fullAggregates),
		[hydratedData, fullAggregates]
	);

	const { subscribe: subscribeToDataAtPath, getDataAtPath } =
		usePartialDataPublisher(data);

	const {
		subscribe: subscribeToFieldSettingsAtPath,
		getDataAtPath: getFieldSettingsAtPath,
	} = usePartialDataPublisher(fieldSettings);

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
					shouldShowFieldSettingControls={Boolean(providedUpdateFieldSettings)}
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
