import {
	Aggregates,
	CampaignBuddySchema,
} from '@campaign-buddy/json-schema-core';
import { EntityApi, FieldSettings } from '@campaign-buddy/frontend-types';
import React, { useMemo } from 'react';
import { useState, useEffect, useCallback } from 'react';
import { WidgetLookup, WidgetProps } from './FormGeneratorProps';
import { getAggregationSupport, removeDisabledAggregations } from './utility';

interface FormWidgetProps {
	schema: CampaignBuddySchema;
	widgetLookup: WidgetLookup;
	path: string;
	updateValue: (path: string, data: any) => void;
	data: any;
	aggregatedData: any;
	isEditable: boolean;
	aggregation: Aggregates | string | undefined;
	entityApi: EntityApi | undefined;
	updateFieldSettings:
		| ((path: string, fieldSetting: FieldSettings<string | Aggregates>) => void)
		| undefined;
	fieldSettings: FieldSettings | undefined;
}

export const FormWidget: React.FC<FormWidgetProps> = ({
	schema,
	widgetLookup,
	path,
	updateValue,
	data,
	aggregatedData,
	isEditable,
	aggregation,
	entityApi,
	updateFieldSettings,
	fieldSettings,
}) => {
	let Widget: React.FC<WidgetProps<any>> = () => null;

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
			value={data}
			Widget={Widget}
			label={schema.title ?? ''}
			aggregatedValue={aggregatedData}
			isEditable={isEditable}
			aggregation={aggregation}
			hasAggregation={aggregation !== undefined}
			schema={schema}
			entityApi={entityApi}
			updateFieldSettings={updateFieldSettings}
			fieldSettings={fieldSettings}
		/>
	);
};

interface DebouncedWidgetProps<T>
	extends Omit<
		WidgetProps<T>,
		'onChange' | 'updateFieldSettings' | 'aggregationSupport'
	> {
	path: string;
	updateValue: (path: string, data: T) => void;
	value: T | undefined;
	aggregatedValue: T | undefined;
	aggregation: Aggregates | string | undefined;
	isEditable: boolean;
	Widget: React.FC<WidgetProps<T>>;
	schema: CampaignBuddySchema;
	entityApi: EntityApi | undefined;
	updateFieldSettings:
		| ((path: string, fieldSetting: FieldSettings<string | Aggregates>) => void)
		| undefined;
	fieldSettings: FieldSettings | undefined;
}

export const DebouncedWidget: React.FC<DebouncedWidgetProps<any>> = ({
	path,
	updateValue: propsUpdateValue,
	value: propsValue,
	Widget,
	label,
	aggregatedValue: propsAggregatedValue,
	isEditable,
	hasAggregation,
	aggregation: propsAggregation,
	schema,
	entityApi,
	updateFieldSettings: propsUpdateFieldSettings,
	fieldSettings: propsFieldSettings,
}) => {
	const [value, setValue] = useState(propsValue);
	const [fieldSettings, setFieldSettings] = useState(propsFieldSettings);

	useEffect(() => {
		setValue(propsValue);
	}, [propsValue]);

	useEffect(() => {
		setFieldSettings(propsFieldSettings);
	}, [propsFieldSettings]);

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
				propsAggregatedValue,
				fieldSettings?.aggregationSettings
			),
		[fieldSettings?.aggregationSettings, propsAggregatedValue]
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
			isEditable={isEditable}
			hasAggregation={
				hasAggregation && fieldSettings?.aggregationSettings !== false
			}
			aggregation={aggregation}
			schema={schema}
			entityApi={entityApi}
			fieldSettings={fieldSettings}
			updateFieldSettings={propsUpdateFieldSettings && updateFieldSettings}
			aggregationSupport={aggregationSupport}
		/>
	);
};
