import React, { useCallback } from 'react';
import { FormWidgetRendererProps } from '@campaign-buddy/form-generator-core';
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
			applyUpdate(document.data, path, newData, schema);
		},
		[document.data, path, schema]
	);

	const updateFieldSettings = useCallback(
		(newFieldSettings: any) => {
			applyUpdate(
				document.fieldSettings.settings,
				path,
				newFieldSettings,
				schema
			);
		},
		[document.fieldSettings.settings, path, schema]
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
