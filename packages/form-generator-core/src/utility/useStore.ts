import syncedStore, { Y } from '@syncedstore/core';
import { useState } from 'react';

export function useStore(doc: Y.Doc | undefined) {
	const [store] = useState(() => syncedStore({ data: {} }, doc));
	return store;
}
