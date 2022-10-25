import React, { useState, useRef, useCallback } from 'react';
import { useStartAsyncAction, AsyncOperation } from '../src';

export function AsyncButton() {
	const startAsyncAction = useStartAsyncAction();
	const [progress, setProgress] = useState(0);
	const asyncOperation = useRef<AsyncOperation | undefined>();
	const [state, setState] = useState<'idle' | 'working'>('idle');

	const startOperation = useCallback(() => {
		if (asyncOperation.current) {
			const result = asyncOperation.current.fail({
				message: 'The operation was canceled',
			});

			if (!result.isResolved) {
				throw new Error('Could not resolve existing operation');
			}
		}

		asyncOperation.current = startAsyncAction({
			kind: 'blocking',
			message: 'Starting operation',
		});
		setState('working');
	}, [startAsyncAction]);

	const progressOperation = useCallback(() => {
		if (!asyncOperation.current || progress >= 100) {
			return;
		}

		const result = asyncOperation.current.progress({
			progress: progress + 10,
		});

		if (result.isResolved) {
			asyncOperation.current = undefined;
			setState('idle');
		}
		setProgress(progress + 10);
	}, [progress]);

	const failOperation = useCallback(() => {
		if (!asyncOperation.current) {
			return;
		}

		const result = asyncOperation.current.fail({
			message: 'The operation failed',
		});

		if (result.isResolved) {
			asyncOperation.current = undefined;
			setState('idle');
		}
	}, []);

	const passOperation = useCallback(() => {
		if (!asyncOperation.current) {
			return;
		}

		const result = asyncOperation.current.succeed({
			message: 'The operation succeeded',
		});

		if (result.isResolved) {
			asyncOperation.current = undefined;
			setState('idle');
		}
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
