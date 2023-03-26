import { useStableValue } from '@campaign-buddy/common-hooks';
import {
	navigateObject,
	ObjectLocation,
	parseLocation,
} from '@campaign-buddy/object-navigator';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { usePartialDataPublisher } from './useDataSubscription';

export type SmartContextProviderProps<T> = React.PropsWithChildren<{
	value: T;
}>;

export interface SmartContext<T> {
	Provider: React.ComponentType<SmartContextProviderProps<T>>;
}

interface InternalSmartContextData<TData> {
	subscribe: <TProperty = any>(
		path: ObjectLocation<TData, TProperty>,
		onUpdate: (dataToUpdate: TProperty) => void
	) => () => void;

	getDataAtPath: <TProperty = any>(
		path: ObjectLocation<TData, TProperty>
	) => TProperty | undefined;
}

interface InternalSmartContext<TData> extends SmartContext<TData> {
	ReactContext: React.Context<InternalSmartContextData<TData>>;
}

export function createSmartContext<T>(defaultValue: T): SmartContext<T> {
	const ReactContext = React.createContext<InternalSmartContextData<T>>({
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		subscribe: () => () => {},
		getDataAtPath: (path) =>
			navigateObject({ root: defaultValue, location: path }),
	});

	const Provider = ({
		value,
		children,
	}: React.PropsWithChildren<SmartContextProviderProps<T>>) => {
		const { subscribe, getDataAtPath } = usePartialDataPublisher(value);

		const contextValue = useMemo<InternalSmartContextData<T>>(
			() => ({
				subscribe,
				getDataAtPath,
			}),
			[getDataAtPath, subscribe]
		);

		return (
			<ReactContext.Provider value={contextValue}>
				{children}
			</ReactContext.Provider>
		);
	};

	return { Provider, ReactContext } as SmartContext<T>;
}

export function useSmartContext<TData>(context: SmartContext<TData>): TData;
export function useSmartContext<TData, TProperty>(
	context: SmartContext<TData>,
	location: ObjectLocation<TData, TProperty>
): TProperty;
export function useSmartContext<TData, TProperty>(
	context: SmartContext<TData>,
	location: ObjectLocation<TData, TProperty> = '$'
): TData | TProperty | undefined {
	const { ReactContext } = context as InternalSmartContext<TData>;

	const stableLocation = useStableValue(parseLocation(location));

	const { subscribe, getDataAtPath } = useContext(ReactContext);

	const [data, setData] = useState(() => getDataAtPath(location));

	useEffect(() => {
		setData(getDataAtPath(stableLocation));
		const unsubscribe = subscribe(stableLocation, (newData) => {
			setData(newData);
		});

		return () => unsubscribe();
	}, [getDataAtPath, stableLocation, subscribe]);

	return data;
}
