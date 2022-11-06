import React, { useCallback } from 'react';
import { ToastUpdater, useShowToast } from '@campaign-buddy/core-ui';
import { useAsyncActionNotifier } from './useAsyncActionNotifier';
import { AsyncStateNotificationProvider } from './AsyncStateNotificationProvider';
import { AsyncOperationState } from './types';

export function ToastAsyncStateNotificationProvider({
	children,
}: React.PropsWithChildren<Record<string, unknown>>) {
	const { showToast } = useShowToast();

	const onStart = useCallback(
		(operation: AsyncOperationState, message?: string) => {
			if (!message) {
				return;
			}

			return showToast({
				message,
			});
		},
		[showToast]
	);

	const onSuccess = useCallback(
		(
			operation: AsyncOperationState,
			message?: string,
			state?: ToastUpdater
		) => {
			if (!message || !state) {
				return;
			}

			state({
				message,
			});
		},
		[]
	);

	const onError = useCallback(
		(
			operation: AsyncOperationState,
			message?: string,
			state?: ToastUpdater
		) => {
			if (!message || !state) {
				return;
			}

			state({
				message,
				intent: 'error',
			});
		},
		[]
	);

	const startAsyncAction = useAsyncActionNotifier<ToastUpdater | undefined>({
		onStart,
		onSuccess,
		onError,
	});

	return (
		<AsyncStateNotificationProvider onStartAsyncAction={startAsyncAction}>
			{children}
		</AsyncStateNotificationProvider>
	);
}
