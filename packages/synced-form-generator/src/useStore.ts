import syncedStore, { Y } from '@syncedstore/core';
import { MappedTypeDescription } from '@syncedstore/core/types/doc';
import { useState } from 'react';

export type SyncedFormDocument = MappedTypeDescription<{
	data: any;
	fieldSettings: { settings?: any };
}>;

export function useStore(doc: Y.Doc | undefined) {
	const [store] = useState(() =>
		syncedStore<SyncedFormDocument>({ data: {}, fieldSettings: {} }, doc)
	);
	return store;
}
