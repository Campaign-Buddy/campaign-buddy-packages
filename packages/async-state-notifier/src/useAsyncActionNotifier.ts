import { useCallback, useRef } from 'react';
import cuid from 'cuid';
import {
	AsyncActionKind,
	StartAsyncActionOptions,
	UpdateAsyncActionOptions,
	UpdateKind,
} from './types';

export interface AsyncOperation {
	id: string;
	kind: AsyncActionKind;
	percentage: number;
}

export interface UseAsyncActionNotifierOptions {
	onStart?: (operation: AsyncOperation, message?: string) => void;
	onContinue?: (operation: AsyncOperation, percentage: number) => void;
	onSuccess?: (operation: AsyncOperation, message?: string) => void;
	onError?: (operation: AsyncOperation, message?: string) => void;
}

export function useAsyncActionNotifier({
	onStart,
	onContinue,
	onSuccess,
	onError,
}: UseAsyncActionNotifierOptions) {
	const asyncOperationStore = useRef<Record<string, AsyncOperation>>({});

	const startAsyncOperation = useCallback(
		(options: StartAsyncActionOptions) => {
			const id = cuid();
			asyncOperationStore.current[id] = {
				id,
				kind: options.kind,
				percentage: 0,
			};

			onStart?.(asyncOperationStore.current[id], options.message);

			return (update: UpdateAsyncActionOptions) => {
				if (!asyncOperationStore.current[id]) {
					console.error(
						'Tried to update a disposed async action, this is a noop but indicates a possible memory leak'
					);
					return;
				}

				const operation = asyncOperationStore.current[id];

				if (update.kind === UpdateKind.Progress) {
					operation.percentage = update.progress;
					onContinue?.(operation, update.progress);
				} else if (update.kind === UpdateKind.ResolveError) {
					onError?.(operation, update.message);
				} else if (update.kind === UpdateKind.ResolveSuccess) {
					onSuccess?.(operation, update.message);
				} else {
					throw new Error(`Unknown operation kind ${update.kind}`);
				}
			};
		},
		[onContinue, onError, onStart, onSuccess]
	);

	return startAsyncOperation;
}
