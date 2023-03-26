import React, { useCallback, useMemo } from 'react';
import { EntityApi, EntityFieldSettings } from '@campaign-buddy/frontend-types';
import {
	CampaignBuddySchema,
	UiLayout,
	Aggregates,
} from '@campaign-buddy/json-schema-core';
import {
	useFormGeneratorState,
	FormUiLayout,
	FormRoot,
	UiSectionProps,
	WidgetLookup,
} from '@campaign-buddy/form-generator-core';
import { DataUpdaterProvider, FormStateProvider } from './useFieldData';
import { useDataUpdater } from './useDataUpdater';
import { DebouncedWidget } from './DebouncedWidget';

const defaultData = {};
const defaultFieldSettings = {};

export interface FormGeneratorProps {
	schema: CampaignBuddySchema;
	data: any;
	onChange: (data: any) => void;
	widgets: WidgetLookup;
	uiLayout?: UiLayout;
	UiSection?: React.FC<React.PropsWithChildren<UiSectionProps>>;
	aggregates?: Aggregates;

	/**
	 * Not technically needed, but some
	 * widgets may fail if an entity
	 * api is not provided
	 */
	entityApi?: EntityApi;

	/**
	 * Field level settings for the data being
	 * operated on
	 */
	fieldSettings?: EntityFieldSettings;

	/**
	 * Allows for widget components to update field settings
	 * for individual fields
	 */
	updateFieldSettings?: (fieldSettings: EntityFieldSettings) => void;

	/**
	 * The role of the current user. The semantic
	 * values for role is left to the consumer. This
	 * property is used to match field visibility
	 * settings in fieldSettings. If left undefined,
	 * it is assumed the current user has all visibility
	 * permissions.
	 */
	currentUserRole?: string;
}

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

	const dataUpdaterContext = useMemo(
		() => ({
			updateDataAtPath,
			updateFieldSettingsAtPath,
		}),
		[updateDataAtPath, updateFieldSettingsAtPath]
	);

	return (
		<FormRoot>
			<DataUpdaterProvider value={dataUpdaterContext}>
				<FormStateProvider value={{ data, fieldSettings, aggregatedData }}>
					<FormUiLayout
						uiLayout={uiLayout}
						schema={resolvedSchema}
						widgetLookup={widgets}
						UiSection={UiSection}
						aggregates={fullAggregates}
						entityApi={entityApi}
						shouldShowFieldSettingControls={Boolean(
							providedUpdateFieldSettings
						)}
						currentUserRole={currentUserRole}
						FormWidgetRenderer={DebouncedWidget}
					/>
				</FormStateProvider>
			</DataUpdaterProvider>
		</FormRoot>
	);
};
