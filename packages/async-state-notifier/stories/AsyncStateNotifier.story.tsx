import React from 'react';
import { ConsoleLoggingAsyncStateNotificationProvider } from '../src';
import { AsyncButton } from './AsyncButton';

export default {
	title: 'async-state-notifier/AsyncStateNotifier',
};

export function ConsoleLoggingNotifier() {
	return (
		<ConsoleLoggingAsyncStateNotificationProvider>
			<p>Logs events to console, useful for debugging</p>
			<AsyncButton />
		</ConsoleLoggingAsyncStateNotificationProvider>
	);
}
