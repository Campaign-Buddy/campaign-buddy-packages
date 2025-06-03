import { useCallback } from 'react';
import {
	FormWidgetRendererProps,
	removeDisabledAggregations,
} from '@campaign-buddy/form-generator-core';
import { useSyncedStore } from '@syncedstore/react';
import {
	useAggregatedDataAtPath,
	useSyncedStoreContext,
} from './SyncedStoreProvider';
import {
	navigateObject,
	setDataAtLocation,
} from '@campaign-buddy/object-navigator';

export function SyncedWidgetRenderer({
	path,
	Widget,
	label,
	aggregation: propsAggregation,
	schema,
	entityApi,
	currentUserRole,
	shouldShowFieldSettingControls,
	aggregationSupport,
}: FormWidgetRendererProps<any>) {
	const { store } = useSyncedStoreContext();
	const document = useSyncedStore(store);
	const aggregatedData = useAggregatedDataAtPath(path);

	const fieldSettings = navigateObject({
		location: path,
		root: document.fieldSettings.settings,
	});

	const aggregatedValue = removeDisabledAggregations(
		aggregatedData,
		fieldSettings?.aggregationSettings
	);

	const aggregation = removeDisabledAggregations(
		propsAggregation,
		fieldSettings?.aggregationSettings
	);

	const value = navigateObject({
		location: path,
		root: document.data,
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
}
