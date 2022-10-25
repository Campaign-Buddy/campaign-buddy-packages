import React, { createContext, useContext, useMemo } from 'react';
import cuid from 'cuid';
import { AsyncOperation, StartAsyncActionCallback } from './types';

export interface AsyncStateNotificationProviderProps {
	onStartAsyncAction: StartAsyncActionCallback;
}

export const nullAsyncActionHandler = (): AsyncOperation => {
	return {
		state: {
			id: cuid(),
			kind: 'background-server',
			progress: 0,
		},
		progress: () => ({ isResolved: true }),
		succeed: () => ({ isResolved: true }),
		fail: () => ({ isResolved: true }),
	};
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
