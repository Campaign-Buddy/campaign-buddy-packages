import React, { createContext, useContext, useMemo } from 'react';
import { StartAsyncActionCallback } from './types';

export interface AsyncStateNotificationProviderProps {
	onStartAsyncAction: StartAsyncActionCallback;
}

export const nullAsyncActionHandler: StartAsyncActionCallback = () => {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	return () => {};
};

interface AsyncStateNotificationContextData {
	startAsyncAction: StartAsyncActionCallback;
}

const AsyncStateNotificationContext =
	createContext<AsyncStateNotificationContextData>({
		startAsyncAction: nullAsyncActionHandler,
	});

export function AsyncStateNotificationProvider({
	onStartAsyncAction,
	children,
}: React.PropsWithChildren<AsyncStateNotificationProviderProps>) {
	const contextValue = useMemo(
		() => ({
			startAsyncAction: onStartAsyncAction,
		}),
		[onStartAsyncAction]
	);

	return (
		<AsyncStateNotificationContext.Provider value={contextValue}>
			{children}
		</AsyncStateNotificationContext.Provider>
	);
}

export function useStartAsyncAction() {
	return useContext(AsyncStateNotificationContext).startAsyncAction;
}
