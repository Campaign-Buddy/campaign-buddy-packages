import { EntityFieldSettings } from '@campaign-buddy/frontend-types';
import syncedStore, { Y } from '@syncedstore/core';
import { MappedTypeDescription } from '@syncedstore/core/types/doc';
import { useState } from 'react';

export type SyncedFormDocument = MappedTypeDescription<{
	data: any;
	fieldSettings: { settings: EntityFieldSettings | undefined };
}>;

export function useStore(doc: Y.Doc | undefined) {
	const [store] = useState(() =>
		syncedStore({ data: {}, fieldSettings: {} }, doc)
	);
	return store;
}
