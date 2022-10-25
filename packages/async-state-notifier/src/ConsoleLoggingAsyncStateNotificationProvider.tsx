import React from 'react';
import { AsyncStateNotificationProvider } from './AsyncStateNotificationProvider';
import { useAsyncActionNotifier } from './useAsyncActionNotifier';

function getLogger(prefix: string) {
	return (...args: any[]) => console.log(prefix, ...args);
}

const start = getLogger('start');
const progress = getLogger('continue');
const error = getLogger('error');
const success = getLogger('success');

export function ConsoleLoggingAsyncStateNotificationProvider({
	children,
}: React.PropsWithChildren<any>) {
	const startAsyncAction = useAsyncActionNotifier({
		onStart: start,
		onContinue: progress,
		onError: error,
		onSuccess: success,
	});

	return (
		<AsyncStateNotificationProvider onStartAsyncAction={startAsyncAction}>
			{children}
		</AsyncStateNotificationProvider>
	);
}
