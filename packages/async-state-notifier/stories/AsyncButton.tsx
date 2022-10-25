import React, { useState, useRef, useCallback } from 'react';
import {
	useStartAsyncAction,
	UpdateAsyncActionCallback,
	UpdateKind,
	AsyncActionKind,
} from '../src';

export function AsyncButton() {
	const startAsyncAction = useStartAsyncAction();
	const [progress, setProgress] = useState(0);
	const asyncOperation = useRef<UpdateAsyncActionCallback | undefined>();
	const [state, setState] = useState<'idle' | 'working'>('idle');

	const startOperation = useCallback(() => {
		if (asyncOperation.current) {
			asyncOperation.current({
				kind: UpdateKind.ResolveError,
				message: 'The operation was canceled',
			});
		}

		asyncOperation.current = startAsyncAction({
			kind: AsyncActionKind.Blocking,
			message: 'Starting operation',
		});
		setState('working');
	}, [startAsyncAction]);

	const progressOperation = useCallback(() => {
		if (!asyncOperation.current || progress >= 100) {
			return;
		}

		asyncOperation.current({
			kind: UpdateKind.Progress,
			progress: progress + 10,
		});
		setProgress(progress + 10);
	}, [progress]);

	const failOperation = useCallback(() => {
		if (!asyncOperation.current) {
			return;
		}

		asyncOperation.current({
			kind: UpdateKind.ResolveError,
			message: 'The operation failed',
		});
		asyncOperation.current = undefined;
		setState('idle');
	}, []);

	const passOperation = useCallback(() => {
		if (!asyncOperation.current) {
			return;
		}

		asyncOperation.current({
			kind: UpdateKind.ResolveSuccess,
			message: 'The operation succeeded',
		});
		asyncOperation.current = undefined;
		setState('idle');
	}, []);

	if (state === 'idle') {
		return <button onClick={startOperation}>Start operation</button>;
	}

	return (
		<div>
			<button onClick={failOperation}>Fail operation</button>
			<button onClick={passOperation}>Pass operation</button>
			<button onClick={progressOperation}>Progress operation</button>
		</div>
	);
}
