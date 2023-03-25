import { createContext, useContext, useEffect, useState } from 'react';

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

	subscribeToAggregatedDataAtPath: DataSubscription;
	getAggregatedDataAtPath: (path: string) => any;

	subscribeToFieldSettingsAtPath: DataSubscription;
	getFieldSettingsAtPath: (path: string) => any;
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
	});

export const PartialDataSubscriptionContextProvider =
	PartialDataSubscriptionContext.Provider;

export function usePartialDataSubscription(path: string) {
	const {
		subscribeToDataAtPath,
		getDataAtPath,
		subscribeToAggregatedDataAtPath,
		getAggregatedDataAtPath,
		subscribeToFieldSettingsAtPath,
		getFieldSettingsAtPath,
	} = useContext(PartialDataSubscriptionContext);

	const [data, setData] = useState(getDataAtPath(path));
	const [aggregatedData, setAggregatedData] = useState(
		getAggregatedDataAtPath(path)
	);
	const [fieldSettingsData, setFieldSettingsData] = useState(
		getFieldSettingsAtPath(path)
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
		aggregatedData,
		fieldSettingsData,
	};
}
