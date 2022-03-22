import {
	CallbackLocation,
	LocationArray,
	ObjectLocation,
	PathLocation,
} from './types';

export function parseLocation(location: ObjectLocation): LocationArray {
	if (Array.isArray(location)) {
		return location;
	}

	if (typeof location === 'string') {
		return parsePathLocation(location);
	}

	if (typeof location === 'function') {
		return parseCallbackLocation(location);
	}

	throw new Error(`Unknown location type: ${typeof location}`);
}

export function parsePathLocation(location: PathLocation): LocationArray {
	const parts = location.match(/(?:\\.|[^.\\])+/g);

	if (!parts) {
		throw new Error(`could not parse location: ${location}`);
	}

	if (parts[0] === '$') {
		parts.shift();
	}

	return parts.map((x) => unescapePathLocation(x));
}

export function parseCallbackLocation(
	location: CallbackLocation<any, any>
): LocationArray {
	const locationArray: LocationArray = [];
	const proxy = new Proxy(
		{},
		{
			get(_, name, receiver) {
				locationArray.push(name);
				return receiver;
			},
		}
	);

	location(proxy);
	return locationArray;
}

export function escapePathLocation(location: PathLocation): string {
	return location?.replace(/[.\\]/g, (match) => `\\${match}`);
}

export function unescapePathLocation(location: string): PathLocation {
	return location?.replace(/\\(.)/g, (_, character) => character);
}
