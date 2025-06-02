import { createContext, useContext } from 'react';

interface DropdownMenuContextData {
	close: () => void;
}

const DropdownMenuContext = createContext<DropdownMenuContextData>({
	close: () => {},
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
