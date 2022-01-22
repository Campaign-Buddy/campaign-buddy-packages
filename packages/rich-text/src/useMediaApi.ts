import { MediaApi } from '@campaign-buddy/frontend-types';
import { createContext, useContext } from 'react';

const Context = createContext<MediaApi | null>(null);

export const MediaApiProvider = Context.Provider;

export function useMediaApi(): MediaApi {
	const api = useContext(Context);

	if (!api) {
		throw new Error('Must provide media api context');
	}

	return api;
}
