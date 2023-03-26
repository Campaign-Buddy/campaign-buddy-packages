import { FieldSettings } from '@campaign-buddy/frontend-types';
import {
	createSmartContext,
	useSmartContext,
} from '@campaign-buddy/smart-context';
import { Aggregates } from '@campaign-buddy/json-schema-core';
import { createContext, useCallback, useContext, useMemo } from 'react';
import { parseLocation } from '@campaign-buddy/object-navigator';

interface FormStateSmartContextData {
	data: any;
	fieldSettings: any;
	aggregatedData: any;
}

const FormStateSmartContext = createSmartContext<FormStateSmartContextData>({
	data: undefined,
	fieldSettings: undefined,
	aggregatedData: undefined,
});

export const FormStateProvider = FormStateSmartContext.Provider;

interface DataUpdaterContextData {
	updateDataAtPath: (path: string, data: any) => void;
	updateFieldSettingsAtPath: (
		path: string,
		fieldSetting: FieldSettings<string | Aggregates>
	) => void;
}

function getError() {
	return new Error('Must provide PartialDataSubscriptionContextProvider');
}

const DataUpdaterContext = createContext<DataUpdaterContextData>({
	updateDataAtPath: () => {
		throw getError();
	},
	updateFieldSettingsAtPath: () => {
		throw getError();
	},
});

export const DataUpdaterProvider = DataUpdaterContext.Provider;

export function useFieldData(path: string) {
	const locations = useMemo(() => {
		const location = parseLocation(path);

		return {
			dataLocation: ['data', ...location],
			fieldSettingsLocation: ['fieldSettings', ...location],
			aggregatedDataLocation: ['aggregatedData', ...location],
		};
	}, [path]);

	const data = useSmartContext(
		FormStateSmartContext,
		locations.dataLocation
	) as any;
	const fieldSettingsData = useSmartContext(
		FormStateSmartContext,
		locations.fieldSettingsLocation
	) as any;
	const aggregatedData = useSmartContext(
		FormStateSmartContext,
		locations.aggregatedDataLocation
	) as any;

	const { updateDataAtPath, updateFieldSettingsAtPath } =
		useContext(DataUpdaterContext);

	const updateData = useCallback(
		(newData: any) => {
			updateDataAtPath(path, newData);
		},
		[path, updateDataAtPath]
	);

	const updateFieldSettings = useCallback(
		(fieldSettings: FieldSettings<string | Aggregates>) => {
			updateFieldSettingsAtPath(path, fieldSettings);
		},
		[path, updateFieldSettingsAtPath]
	);

	return {
		data,
		updateData,
		aggregatedData,
		fieldSettingsData,
		updateFieldSettings,
	};
}
