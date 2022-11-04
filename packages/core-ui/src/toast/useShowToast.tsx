import React, { useCallback, createContext, useContext, useRef } from 'react';
import { IToaster, Toaster } from '@blueprintjs/core';
import { GlobalToastStyles } from './Toast.styled';

const ToasterContext = createContext<React.MutableRefObject<IToaster | null>>({
	current: null,
});

export function ToasterProvider({
	children,
}: React.PropsWithChildren<Record<string, unknown>>) {
	const toasterRef = useRef<IToaster | null>(null);

	const handleRef = useCallback((ref: IToaster | null) => {
		toasterRef.current = ref;
	}, []);

	return (
		<>
			<GlobalToastStyles />
			<Toaster position="bottom-right" ref={handleRef} />
			<ToasterContext.Provider value={toasterRef}>
				{children}
			</ToasterContext.Provider>
		</>
	);
}

export interface ShowToastOptions {
	message: string;
	intent?: 'normal' | 'error';
}

export type ToastUpdater = (options: ShowToastOptions) => void;

export interface UseShowToastResult {
	showToast: (options: ShowToastOptions) => ToastUpdater;
}

export function useShowToast(): UseShowToastResult {
	const toasterRef = useContext(ToasterContext);
	const showToast = useCallback(
		({ message, intent }: ShowToastOptions) => {
			const toaster = toasterRef.current;
			if (!toaster) {
				throw new Error(
					'Toaster context not provided. Ensure that ToasterProvider is present and that there is only one copy of core-ui in use (e.g. core-ui is added as a peer dependency)'
				);
			}

			const key = toaster.show({
				message,
				intent: mapToBlueprintIntent(intent),
			});

			return ({ message: newMessage, intent: newIntent }: ShowToastOptions) => {
				toaster.show(
					{
						message: newMessage,
						intent: mapToBlueprintIntent(newIntent),
					},
					key
				);
			};
		},
		[toasterRef]
	);

	return { showToast };
}

function mapToBlueprintIntent(cbIntent?: 'normal' | 'error') {
	if (cbIntent === 'normal' || !cbIntent) {
		return 'none';
	}

	return 'danger';
}
