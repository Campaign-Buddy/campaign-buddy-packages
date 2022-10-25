import React, { useState } from 'react';
import { ToasterProvider, useShowToast } from '../src';

export default {
	title: 'core-ui/Toast',
};

function ToastExample() {
	const { showToast } = useShowToast();
	const [update, setUpdate] = useState<(options: any) => void>();

	return (
		<>
			<button
				onClick={() =>
					setUpdate(() => showToast({ message: 'This is a toast' }))
				}
			>
				Click me to show a toast
			</button>
			<button onClick={() => update?.({ message: 'Updated toast!' })}>
				Update toast
			</button>
		</>
	);
}

export function Primary() {
	return (
		<ToasterProvider>
			<ToastExample />
		</ToasterProvider>
	);
}
