import React from 'react';
import { ToasterProvider } from '@campaign-buddy/core-ui';
import {
	ConsoleLoggingAsyncStateNotificationProvider,
	ToastAsyncStateNotificationProvider,
} from '../src';
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

export function ToastNotifier() {
	return (
		<ToasterProvider>
			<ToastAsyncStateNotificationProvider>
				<p>Pops up a toast</p>
				<AsyncButton />
			</ToastAsyncStateNotificationProvider>
		</ToasterProvider>
	);
}
