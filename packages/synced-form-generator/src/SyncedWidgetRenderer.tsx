import React, { useCallback } from 'react';
import { FormWidgetRendererProps } from '@campaign-buddy/form-generator-core';
import { useSyncedStore } from '@syncedstore/react';
import { useSyncedStoreContext } from './SyncedStoreProvider';
import {
	navigateObject,
	setDataAtLocation,
} from '@campaign-buddy/object-navigator';

export function SyncedWidgetRenderer({
	path,
	Widget,
	label,
	// aggregation: propsAggregation,
	schema,
	entityApi,
	currentUserRole,
	shouldShowFieldSettingControls,
	aggregationSupport,
}: FormWidgetRendererProps<any>) {
	const { store } = useSyncedStoreContext();
	const document = useSyncedStore(store);

	// const aggregatedValue = removeDisabledAggregations(
	// 	aggregatedData,
	// 	document.fieldSettings.settings?.aggregationSettings
	// );

	// const aggregation = useMemo(
	// 	() =>
	// 		removeDisabledAggregations(
	// 			propsAggregation,
	// 			document.fieldSettings.settings
	// 		),
	// 	[fieldSettingsData.data.aggregationSettings, propsAggregation]
	// );

	const value = navigateObject({
		location: path,
		root: document.data,
	});

	const fieldSettings = navigateObject({
		location: path,
		root: document.fieldSettings.settings,
	});

	const updateValue = useCallback(
		(newData: any) => {
			setDataAtLocation({
				root: document.data,
				location: path,
				value: newData,
				schema,
			});
		},
		[document.data, path, schema]
	);

	const updateFieldSettings = useCallback(
		(newFieldSettings: any) => {
			setDataAtLocation({
				root: document.fieldSettings.settings,
				location: path,
				value: newFieldSettings,
			});
		},
		[document.fieldSettings.settings, path]
	);

	return (
		<Widget
			value={value}
			onChange={updateValue}
			label={label}
			aggregatedValue={undefined}
			aggregation={undefined}
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
}
