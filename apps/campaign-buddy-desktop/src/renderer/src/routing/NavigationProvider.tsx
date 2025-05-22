import { createContext, useContext, useMemo, useState } from 'react';
import { Location, LocationKind } from './Location';
import { PageComponentMap, PageProps } from './PageProps';

interface NavigationContextData {
	navigate: (to: Location) => Promise<void>;
}

const NavigationContext = createContext<NavigationContextData>({
	navigate: () => Promise.resolve(),
});

export interface NavigationProviderProps {
	initialLocation: Location;
	pages: PageComponentMap;
}

export function NavigationProvider({
	initialLocation,
	pages,
}: NavigationProviderProps) {
	const [location, setLocation] = useState(initialLocation);

	const contextValue = useMemo(
		() => ({
			navigate: (to: Location) => {
				setLocation(to);
				return Promise.resolve();
			},
		}),
		[]
	);

	const PageComponent = pages[location.page] as React.ComponentType<
		PageProps<LocationKind>
	>;

	return (
		<NavigationContext value={contextValue}>
			<PageComponent location={location} />
		</NavigationContext>
	);
}

export function useNavigate() {
	return useContext(NavigationContext).navigate;
}
