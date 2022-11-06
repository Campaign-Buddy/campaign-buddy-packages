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

export interface UseAsyncActionNotifierOptions<T = void> {
	onStart?: (operation: AsyncOperationState, message?: string) => T;
	onContinue?: (operation: AsyncOperationState, state?: T) => T | undefined;
	onSuccess?: (
		operation: AsyncOperationState,
		message?: string,
		state?: T
	) => void;
	onError?: (
		operation: AsyncOperationState,
		message?: string,
		state?: T
	) => void;
}

export function useAsyncActionNotifier<T = void>({
	onStart,
	onContinue,
	onSuccess,
	onError,
}: UseAsyncActionNotifierOptions<T>) {
	const asyncOperationStore = useRef<
		Record<string, Mutable<AsyncOperationState>>
	>({});
	const asyncOperationState = useRef<Record<string, T | undefined>>({});

	const startAsyncOperation = useCallback(
		(options: StartAsyncActionOptions): AsyncOperation => {
			const id = cuid();
			const operationState: AsyncOperationState = {
				id,
				kind: options.kind,
				progress: 0,
			};

			asyncOperationStore.current[id] = operationState;

			const state = onStart?.(asyncOperationStore.current[id], options.message);
			asyncOperationState.current[id] = state;

			return {
				state: operationState,
				progress: ({ progress }) => {
					if (!asyncOperationStore.current[id]) {
						return { isResolved: true };
					}

					asyncOperationStore.current[id].progress = progress;
					const currentState = asyncOperationState.current[id];
					const nextState = onContinue?.(
						asyncOperationStore.current[id],
						currentState
					);
					if (nextState !== undefined) {
						asyncOperationState.current[id] = nextState;
					}

					return {
						isResolved: false,
					};
				},
				succeed: ({ message } = {}) => {
					if (!asyncOperationStore.current[id]) {
						return { isResolved: true };
					}

					const currentState = asyncOperationState.current[id];
					onSuccess?.(asyncOperationStore.current[id], message, currentState);
					delete asyncOperationStore.current[id];
					delete asyncOperationState.current[id];

					return {
						isResolved: true,
					};
				},
				fail: ({ message } = {}) => {
					if (!asyncOperationStore.current[id]) {
						return { isResolved: true };
					}

					const currentState = asyncOperationState.current[id];
					onError?.(asyncOperationStore.current[id], message, currentState);
					delete asyncOperationStore.current[id];
					delete asyncOperationState.current[id];

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
