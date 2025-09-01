import { createContext, useContext } from 'react';

interface DropdownMenuContextData {
	close: () => void;
	isOpen: boolean;
	open: () => void;
	sharedId: string;
	buttonRef: React.MutableRefObject<HTMLButtonElement | null>;
}

const DropdownMenuContext = createContext<DropdownMenuContextData>({
	close: () => {},
	open: () => {},
	isOpen: false,
	sharedId: '',
	buttonRef: { current: null },
});

export function useDropdownMenuContext() {
	return useContext(DropdownMenuContext);
}

export function DropdownMenuContextProvider({
	children,
	...data
}: React.PropsWithChildren<DropdownMenuContextData>) {
	return (
		<DropdownMenuContext.Provider value={data}>
			{children}
		</DropdownMenuContext.Provider>
	);
}
