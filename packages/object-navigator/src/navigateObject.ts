import { parseLocation } from './parseLocation';
import { Indexer, LocationArray, ObjectLocation } from './types';

interface NavigateObjectOptions<TRoot, TProperty> {
	root: TRoot;

	/**
	 * The location to navigate too
	 */
	location: ObjectLocation<TRoot, TProperty>;

	/**
	 * @param path The path for the current piece of data (does not include '$')
	 * @param data The current piece of data
	 * @param remainingPath The path remaining to traverse, the next key to be
	 * indexed is remainingPath[0]
	 */
	onTraverse?: (
		path: LocationArray,
		data: any,
		remainingPath: LocationArray
	) => void;

	/**
	 * A custom indexer for traversing objects, by default will
	 * just try to use default index
	 */
	accessNext?: (data: any, key: Indexer) => any;

	/**
	 * By default, navigateObject will stop navigation and
	 * return undefined if accessNext returns undefined,
	 * this flag will continue to navigate and may throw
	 * an error
	 */
	allowUnsafeNavigation?: boolean;
}

export function navigateObject<TRoot = any, TProperty = any>({
	root,
	location,
	onTraverse,
	accessNext,
	allowUnsafeNavigation,
}: NavigateObjectOptions<TRoot, TProperty>): TProperty | undefined {
	const normalizedLocation = parseLocation(location);

	let cur = root;
	const remainingPath: LocationArray = [...normalizedLocation];
	const currentPath: LocationArray = [];
	for (const locationPart of normalizedLocation) {
		onTraverse?.(currentPath, cur, remainingPath);

		if (cur === undefined && allowUnsafeNavigation) {
			return;
		}

		cur = (accessNext ?? defaultAccessNext)(cur, locationPart);
		currentPath.push(locationPart);
		remainingPath.shift();
	}

	onTraverse?.(currentPath, cur, []);
	return cur as unknown as TProperty;
}

function defaultAccessNext(data: any, key: string | number | symbol) {
	return data?.[key];
}
