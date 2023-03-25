import { FieldSettings } from '@campaign-buddy/frontend-types';
import { Aggregates } from '@campaign-buddy/json-schema-core';
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';

type DataSubscription = (
	path: string,
	subscriber: (dataAtPath: any) => void
) => () => void;

interface PartialDataSubscriptionContextData {
	/**
	 * @returns {any} an unsubscribe function
	 */
	subscribeToDataAtPath: DataSubscription;
	getDataAtPath: (path: string) => any;
	updateDataAtPath: (path: string, data: any) => void;

	subscribeToAggregatedDataAtPath: DataSubscription;
	getAggregatedDataAtPath: (path: string) => any;

	subscribeToFieldSettingsAtPath: DataSubscription;
	getFieldSettingsAtPath: (path: string) => any;
	updateFieldSettingsAtPath: (
		path: string,
		fieldSetting: FieldSettings<string | Aggregates>
	) => void;
}

function getError() {
	return new Error('Must provide PartialDataSubscriptionContextProvider');
}

const PartialDataSubscriptionContext =
	createContext<PartialDataSubscriptionContextData>({
		subscribeToDataAtPath: () => {
			throw getError();
		},
		getDataAtPath: () => {
			throw getError();
		},
		updateDataAtPath: () => {
			throw getError();
		},
		subscribeToAggregatedDataAtPath: () => {
			throw getError();
		},
		getAggregatedDataAtPath: () => {
			throw getError();
		},
		subscribeToFieldSettingsAtPath: () => {
			throw getError();
		},
		getFieldSettingsAtPath: () => {
			throw getError();
		},
		updateFieldSettingsAtPath: () => {
			throw getError();
		},
	});

export const PartialDataSubscriptionContextProvider =
	PartialDataSubscriptionContext.Provider;

export function usePartialDataSubscription(path: string) {
	const {
		subscribeToDataAtPath,
		getDataAtPath,
		updateDataAtPath,
		subscribeToAggregatedDataAtPath,
		getAggregatedDataAtPath,
		subscribeToFieldSettingsAtPath,
		getFieldSettingsAtPath,
		updateFieldSettingsAtPath,
	} = useContext(PartialDataSubscriptionContext);

	const [data, setData] = useState(getDataAtPath(path));
	const [aggregatedData, setAggregatedData] = useState(
		getAggregatedDataAtPath(path)
	);
	const [fieldSettingsData, setFieldSettingsData] = useState(
		getFieldSettingsAtPath(path)
	);

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

	useEffect(() => {
		const unsubscribe = subscribeToDataAtPath(path, (newData) => {
			setData(newData);
		});

		return () => {
			unsubscribe();
		};
	}, [path, subscribeToDataAtPath]);

	useEffect(() => {
		const unsubscribe = subscribeToAggregatedDataAtPath(path, (newData) => {
			setAggregatedData(newData);
		});

		return () => {
			unsubscribe();
		};
	}, [path, subscribeToAggregatedDataAtPath]);

	useEffect(() => {
		const unsubscribe = subscribeToFieldSettingsAtPath(path, (newData) => {
			setFieldSettingsData(newData);
		});

		return () => {
			unsubscribe();
		};
	}, [path, subscribeToFieldSettingsAtPath]);

	return {
		data,
		updateData,
		aggregatedData,
		fieldSettingsData,
		updateFieldSettings,
	};
}
