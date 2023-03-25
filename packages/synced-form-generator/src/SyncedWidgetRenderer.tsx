import React, { useCallback, useMemo } from 'react';
import {
	FormWidgetRendererProps,
	removeDisabledAggregations,
} from '@campaign-buddy/form-generator-core';
import { useSyncedStore } from '@syncedstore/react';
import { useSyncedStoreContext } from './SyncedStoreProvider';
import {
	getSchemaForLocation,
	navigateObject,
} from '@campaign-buddy/object-navigator';
import { CampaignBuddySchema } from '@campaign-buddy/json-schema-core';

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
	const { dataStore, fieldSettingsStore, aggregatedData } =
		useSyncedStoreContext();
	const data = useSyncedStore(dataStore);
	const fieldSettingsData = useSyncedStore(fieldSettingsStore);

	const aggregatedValue = useMemo(
		() =>
			removeDisabledAggregations(
				aggregatedData,
				fieldSettingsData.data.aggregationSettings
			),
		[fieldSettingsData.data.aggregationSettings, aggregatedData]
	);

	const aggregation = useMemo(
		() =>
			removeDisabledAggregations(
				propsAggregation,
				fieldSettingsData.data.aggregationSettings
			),
		[fieldSettingsData.data.aggregationSettings, propsAggregation]
	);

	const value = navigateObject({
		location: path,
		root: data.data,
	});

	const fieldSettings = navigateObject({
		location: path,
		root: fieldSettingsData.data,
	});

	const updateValue = useCallback(
		(newData: any) => {
			applyUpdate(data.data, path, newData, schema);
		},
		[data.data, path, schema]
	);

	const updateFieldSettings = useCallback(
		(newFieldSettings: any) => {
			applyUpdate(fieldSettingsData.data, path, newFieldSettings, schema);
		},
		[fieldSettingsData.data, path, schema]
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

function applyUpdate(
	data: any,
	path: string,
	update: any,
	schema: CampaignBuddySchema
): void {
	const parts = path.split('.');
	let cur = data;
	let curPath = '$';

	for (let i = 0; i < parts.length - 1; i++) {
		const part = parts[i];

		if (part === '$' && i === 0) {
			continue;
		}

		curPath = `${curPath}.${part}`;

		const nextType = typeof cur[part];

		if (nextType === 'undefined') {
			const subSchema = getSchemaForLocation({ location: curPath, schema });

			if (subSchema?.type === 'array') {
				cur[part] = [];
			} else {
				cur[part] = {};
			}
		} else if (nextType !== 'object') {
			console.error(
				`navigation error, tried to traverse ${nextType} using path ${path}`,
				update
			);
			return;
		}

		cur = cur[part];
	}

	const lastPart = parts[parts.length - 1];
	cur[lastPart] = update;

	return;
}
