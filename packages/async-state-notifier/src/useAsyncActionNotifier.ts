import { useCallback, useRef } from 'react';
import cuid from 'cuid';
import {
	AsyncOperationState,
	StartAsyncActionOptions,
	AsyncOperation,
} from './types';

type Mutable<T> = {
	-readonly [P in keyof T]: T[P];
};

export interface UseAsyncActionNotifierOptions {
	onStart?: (operation: AsyncOperationState, message?: string) => void;
	onContinue?: (operation: AsyncOperationState) => void;
	onSuccess?: (operation: AsyncOperationState, message?: string) => void;
	onError?: (operation: AsyncOperationState, message?: string) => void;
}

export function useAsyncActionNotifier({
	onStart,
	onContinue,
	onSuccess,
	onError,
}: UseAsyncActionNotifierOptions) {
	const asyncOperationStore = useRef<
		Record<string, Mutable<AsyncOperationState>>
	>({});

	const startAsyncOperation = useCallback(
		(options: StartAsyncActionOptions): AsyncOperation => {
			const id = cuid();
			const operationState: AsyncOperationState = {
				id,
				kind: options.kind,
				progress: 0,
			};

			asyncOperationStore.current[id] = operationState;

			onStart?.(asyncOperationStore.current[id], options.message);

			return {
				state: operationState,
				progress: ({ progress }) => {
					if (!asyncOperationStore.current[id]) {
						return { isResolved: true };
					}

					asyncOperationStore.current[id].progress = progress;
					onContinue?.(asyncOperationStore.current[id]);

					return {
						isResolved: false,
					};
				},
				succeed: ({ message } = {}) => {
					if (!asyncOperationStore.current[id]) {
						return { isResolved: true };
					}

					onSuccess?.(asyncOperationStore.current[id], message);
					delete asyncOperationStore.current[id];

					return {
						isResolved: true,
					};
				},
				fail: ({ message } = {}) => {
					if (!asyncOperationStore.current[id]) {
						return { isResolved: true };
					}

					onError?.(asyncOperationStore.current[id], message);
					delete asyncOperationStore.current[id];

					return {
						isResolved: true,
					};
				},
			};
		},
		[onContinue, onError, onStart, onSuccess]
	);

	return startAsyncOperation;
}
