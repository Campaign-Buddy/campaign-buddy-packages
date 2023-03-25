import React, { useCallback, useMemo } from 'react';
import { FormGeneratorProps } from './FormGeneratorProps';
import {
	useDataUpdater,
	usePartialDataPublisher,
	PartialDataSubscriptionContextProvider,
} from './utility';
import { FormUiLayout } from './FormUiLayout';
import styled from 'styled-components';
import { useFormGeneratorState } from './useFormGeneratorState';
import { DebouncedWidget } from './DebouncedWidget';

const defaultData = {};
const defaultFieldSettings = {};

export const FormGenerator: React.FC<
	React.PropsWithChildren<FormGeneratorProps>
> = ({
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
	const { resolvedSchema, aggregatedData, uiLayout, fullAggregates } =
		useFormGeneratorState({
			schema,
			data,
			currentUserRole,
			aggregates,
			providedUiLayout,
			fieldSettings,
			entityApi,
		});

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
					schema={resolvedSchema}
					widgetLookup={widgets}
					updateValue={updateData}
					UiSection={UiSection}
					aggregates={fullAggregates}
					entityApi={entityApi}
					updateFieldSettings={updateFieldSettings}
					shouldShowFieldSettingControls={Boolean(providedUpdateFieldSettings)}
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
