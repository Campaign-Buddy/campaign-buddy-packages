import React, { useCallback, useMemo } from 'react';
import { FormGeneratorProps } from './FormGeneratorProps';
import {
	useDataUpdater,
	usePartialDataPublisher,
	PartialDataSubscriptionContextProvider,
} from './utility';
import {
	useFormGeneratorState,
	FormUiLayout,
	FormRoot,
} from '@campaign-buddy/form-generator-core';
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

	const updateDataAtPath = useDataUpdater(schema, data, onChange);

	const updateFieldSettingsOrNoop = useCallback(
		(newFieldSettings: any) => {
			providedUpdateFieldSettings?.(newFieldSettings);
		},
		[providedUpdateFieldSettings]
	);
	const updateFieldSettingsAtPath = useDataUpdater(
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
					shouldShowFieldSettingControls={Boolean(providedUpdateFieldSettings)}
					currentUserRole={currentUserRole}
					FormWidgetRenderer={DebouncedWidget}
				/>
			</PartialDataSubscriptionContextProvider>
		</FormRoot>
	);
};
