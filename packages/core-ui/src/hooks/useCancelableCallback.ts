import { useCallback, useRef, useEffect } from 'react';

export interface CancelablePromise<T> extends Promise<T> {
	cancel: () => void;
}

function makeCancelable<T>(promise: Promise<T>): CancelablePromise<T> {
	let isAlreadyCanceled = false;
	let cancel: () => void = () => {
		throw new Error('Cancel function has not been set up on promise');
	}

	const cancelPromise = new Promise<any>((resolve, reject) => {
		cancel = (...args) => {
			if (isAlreadyCanceled) {
				return;
			}

			isAlreadyCanceled = true;

			reject({
				isCanceled: true,
				args,
			});
		};
	});

	const wrappedPromise = Promise.race([cancelPromise, promise]) as any;
	wrappedPromise.cancel = cancel;
	return wrappedPromise;
}

export function useCancelableCallback<TArgs extends any[], TResponse>(callback: (...args: TArgs) => Promise<TResponse>): (...args: TArgs) => CancelablePromise<TResponse> {
	const promisesToCancel = useRef<CancelablePromise<TResponse>[]>([]);

	useEffect(() => {
		return () => {
			for (const promise of promisesToCancel.current) {
				promise.cancel();
			}
		}
	}, []);

	const wrappedCallback = useCallback((...args: TArgs) => {
		const cancelablePromise = makeCancelable(callback(...args));
		promisesToCancel.current.push(cancelablePromise);
		return cancelablePromise;
	}, [callback]);

	return wrappedCallback;
}
