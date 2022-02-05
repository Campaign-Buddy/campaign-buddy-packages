import {
	Aggregates,
	CampaignBuddySchema,
} from '@campaign-buddy/json-schema-core';
import { EntityApi } from '@campaign-buddy/frontend-types';
import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { WidgetLookup, WidgetProps } from './FormGeneratorProps';

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
		/>
	);
};

interface DebouncedWidgetProps<T> extends Omit<WidgetProps<T>, 'onChange'> {
	path: string;
	updateValue: (path: string, data: T) => void;
	value: T | undefined;
	aggregatedValue: T | undefined;
	aggregation: Aggregates | string | undefined;
	isEditable: boolean;
	Widget: React.FC<WidgetProps<T>>;
	schema: CampaignBuddySchema;
	entityApi: EntityApi | undefined;
}

export const DebouncedWidget: React.FC<DebouncedWidgetProps<any>> = ({
	path,
	updateValue: propsUpdateValue,
	value: propsValue,
	Widget,
	label,
	aggregatedValue,
	isEditable,
	hasAggregation,
	aggregation,
	schema,
	entityApi,
}) => {
	const [value, setValue] = useState(propsValue);

	useEffect(() => {
		setValue(propsValue);
	}, [propsValue]);

	const updateValue = useCallback(
		(data: any) => {
			setValue(data);
			propsUpdateValue(path, data);
		},
		[propsUpdateValue, path]
	);

	return (
		<Widget
			value={value}
			onChange={updateValue}
			label={label}
			aggregatedValue={aggregatedValue}
			isEditable={isEditable}
			hasAggregation={hasAggregation}
			aggregation={aggregation}
			schema={schema}
			entityApi={entityApi}
		/>
	);
};
