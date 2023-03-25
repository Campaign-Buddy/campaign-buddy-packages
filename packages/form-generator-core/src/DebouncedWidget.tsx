import {
	Aggregates,
	CampaignBuddySchema,
} from '@campaign-buddy/json-schema-core';
import { EntityApi, FieldSettings } from '@campaign-buddy/frontend-types';
import React, { useMemo } from 'react';
import { useState, useEffect, useCallback } from 'react';
import { WidgetLookup, WidgetProps } from './FormGeneratorProps';
import {
	getAggregationSupport,
	removeDisabledAggregations,
	usePartialDataSubscription,
} from './utility';

interface FormWidgetProps {
	schema: CampaignBuddySchema;
	widgetLookup: WidgetLookup;
	path: string;
	updateValue: (path: string, data: any) => void;
	aggregation: Aggregates | string | undefined;
	entityApi: EntityApi | undefined;
	updateFieldSettings:
		| ((path: string, fieldSetting: FieldSettings<string | Aggregates>) => void)
		| undefined;
	currentUserRole: string | undefined;
	shouldShowFieldSettingControls: boolean;
}

export const FormWidget: React.FC<React.PropsWithChildren<FormWidgetProps>> = ({
	schema,
	widgetLookup,
	path,
	updateValue,
	aggregation,
	entityApi,
	updateFieldSettings,
	currentUserRole,
	shouldShowFieldSettingControls,
}) => {
	let Widget: React.FC<React.PropsWithChildren<WidgetProps<any>>> = () => null;

	if (schema['$uiWidget'] && widgetLookup[schema['$uiWidget']]) {
		Widget = widgetLookup[schema['$uiWidget']];
	} else if (schema.type === 'integer') {
		Widget = widgetLookup.number;
	} else if (typeof schema.type === 'string') {
		Widget = widgetLookup[schema.type];
	}

	if (!Widget) {
		console.error(
			`Could not find widget for schema definition at ${path}`,
			schema
		);
		return null;
	}

	if (!schema.title) {
		console.error(`Schema definition at ${path} does not have title`, schema);
		return null;
	}

	return (
		<DebouncedWidget
			path={path}
			updateValue={updateValue}
			Widget={Widget}
			label={schema.title ?? ''}
			aggregation={aggregation}
			schema={schema}
			entityApi={entityApi}
			updateFieldSettings={updateFieldSettings}
			currentUserRole={currentUserRole}
			shouldShowFieldSettingControls={shouldShowFieldSettingControls}
		/>
	);
};

interface DebouncedWidgetProps<T>
	extends Omit<
		WidgetProps<T>,
		| 'onChange'
		| 'updateFieldSettings'
		| 'aggregationSupport'
		| 'aggregatedValue'
		| 'value'
		| 'fieldSettings'
	> {
	path: string;
	updateValue: (path: string, data: T) => void;
	aggregation: Aggregates | string | undefined;
	Widget: React.FC<React.PropsWithChildren<WidgetProps<T>>>;
	schema: CampaignBuddySchema;
	entityApi: EntityApi | undefined;
	updateFieldSettings:
		| ((path: string, fieldSetting: FieldSettings<string | Aggregates>) => void)
		| undefined;
	shouldShowFieldSettingControls: boolean;
}

export const DebouncedWidget: React.FC<
	React.PropsWithChildren<DebouncedWidgetProps<any>>
> = ({
	path,
	updateValue: propsUpdateValue,
	Widget,
	label,
	aggregation: propsAggregation,
	schema,
	entityApi,
	updateFieldSettings: propsUpdateFieldSettings,
	currentUserRole,
	shouldShowFieldSettingControls,
}) => {
	const { data, aggregatedData, fieldSettingsData } =
		usePartialDataSubscription(path);
	const dataOrDefault = data ?? schema?.default;

	const [value, setValue] = useState(dataOrDefault);
	const [fieldSettings, setFieldSettings] = useState(fieldSettingsData);

	useEffect(() => {
		setValue(dataOrDefault);
	}, [dataOrDefault]);

	useEffect(() => {
		setFieldSettings(fieldSettingsData);
	}, [fieldSettingsData]);

	const updateValue = useCallback(
		(data: any) => {
			setValue(data);
			propsUpdateValue(path, data);
		},
		[propsUpdateValue, path]
	);

	const updateFieldSettings = useCallback(
		(fieldSettings: FieldSettings<string | Aggregates>) => {
			setFieldSettings(fieldSettings);
			propsUpdateFieldSettings?.(path, fieldSettings);
		},
		[path, propsUpdateFieldSettings]
	);

	const aggregationSupport = useMemo(
		() => getAggregationSupport(propsAggregation, schema),
		[propsAggregation, schema]
	);

	const aggregatedValue = useMemo(
		() =>
			removeDisabledAggregations(
				aggregatedData,
				fieldSettings?.aggregationSettings
			),
		[fieldSettings?.aggregationSettings, aggregatedData]
	);

	const aggregation = useMemo(
		() =>
			removeDisabledAggregations(
				propsAggregation,
				fieldSettings?.aggregationSettings
			),
		[fieldSettings?.aggregationSettings, propsAggregation]
	);

	return (
		<Widget
			value={value}
			onChange={updateValue}
			label={label}
			aggregatedValue={aggregatedValue}
			aggregation={aggregation}
			schema={schema}
			entityApi={entityApi}
			fieldSettings={fieldSettings}
			updateFieldSettings={
				shouldShowFieldSettingControls ? updateFieldSettings : undefined
			}
			aggregationSupport={aggregationSupport}
			currentUserRole={currentUserRole}
		/>
	);
};
