import { createContext, useContext } from 'react';

interface DropdownMenuContextData {
	close: () => void;
	isOpen: boolean;
	open: () => void;
	sharedId: string;
}

const DropdownMenuContext = createContext<DropdownMenuContextData>({
	close: () => {},
	open: () => {},
	isOpen: false,
	sharedId: '',
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
