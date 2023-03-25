import { Aggregates } from '@campaign-buddy/json-schema-core';
import { FieldSettings } from '@campaign-buddy/frontend-types';
import { FormWidgetRendererProps } from '@campaign-buddy/form-generator-core/src/FormGeneratorProps';
import React, { useMemo } from 'react';
import { useState, useEffect, useCallback } from 'react';
import {
	getAggregationSupport,
	removeDisabledAggregations,
	usePartialDataSubscription,
} from './utility';

export const DebouncedWidget: React.FC<
	React.PropsWithChildren<FormWidgetRendererProps<any>>
> = ({
	path,
	Widget,
	label,
	aggregation: propsAggregation,
	schema,
	entityApi,
	currentUserRole,
	shouldShowFieldSettingControls,
}) => {
	const {
		data,
		aggregatedData,
		fieldSettingsData,
		updateData: propsUpdateValue,
		updateFieldSettings: propsUpdateFieldSettings,
	} = usePartialDataSubscription(path);
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
			propsUpdateValue(data);
		},
		[propsUpdateValue]
	);

	const updateFieldSettings = useCallback(
		(fieldSettings: FieldSettings<string | Aggregates>) => {
			setFieldSettings(fieldSettings);
			propsUpdateFieldSettings?.(fieldSettings);
		},
		[propsUpdateFieldSettings]
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
