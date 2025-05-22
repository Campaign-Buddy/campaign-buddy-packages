import { LocationKind, LocationOfKind } from './Location';

export interface PageProps<TKind extends LocationKind> {
	location: LocationOfKind<TKind>;
}

export type PageComponentMap = {
	[TKind in LocationKind]: React.ComponentType<PageProps<TKind>>;
};
