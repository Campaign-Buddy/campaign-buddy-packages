import {
	Aggregates,
	CampaignBuddySchema,
} from '@campaign-buddy/json-schema-core';
import { EntityApi, FieldSettings } from '@campaign-buddy/frontend-types';
import React, { useMemo } from 'react';
import { useState, useEffect, useCallback } from 'react';
import { WidgetProps } from './FormGeneratorProps';
import {
	getAggregationSupport,
	removeDisabledAggregations,
	usePartialDataSubscription,
} from './utility';

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
