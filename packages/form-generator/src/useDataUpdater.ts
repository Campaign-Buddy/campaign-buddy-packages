import { CampaignBuddySchema } from '@campaign-buddy/json-schema-core';
import { setDataAtLocation } from '@campaign-buddy/object-navigator';
import cloneDeep from 'lodash.clonedeep';
import { useCallback, useEffect, useRef } from 'react';

interface Update {
	path: string;
	update: any;
}

type DataUpdater = (path: string, update: any) => any;

export function useDataUpdater(
	schema: CampaignBuddySchema,
	data: any,
	onChange: (data: any) => void,
	debounceTime = 300
): DataUpdater {
	const pendingUpdates = useRef<Update[]>([]);
	const timer = useRef<NodeJS.Timeout | undefined>();
	const handleOnChange = useRef(onChange);
	const dataRef = useRef(data);
	const schemaRef = useRef(schema);

	useEffect(() => {
		handleOnChange.current = onChange;
	}, [onChange]);

	useEffect(() => {
		dataRef.current = data;
	}, [data]);

	useEffect(() => {
		schemaRef.current = schema;
	}, [schema]);

	useEffect(() => () => timer.current && clearTimeout(timer.current), []);

	const deduplicateUpdates = useCallback(() => {
		return Object.values(
			pendingUpdates.current.reduce<{ [k: string]: Update }>((map, cur) => {
				map[cur.path] = cur;
				return map;
			}, {})
		);
	}, []);

	const executeUpdates = useCallback(() => {
		const updates = deduplicateUpdates();
		const dataClone = cloneDeep(dataRef.current);

		for (const update of updates) {
			setDataAtLocation({
				root: dataClone,
				location: update.path,
				value: update.update,
				schema: schemaRef.current,
			});
		}

		pendingUpdates.current = [];
		handleOnChange.current(dataClone);
	}, [deduplicateUpdates]);

	/**
	 * When we update data at some point in the schema,
	 * we don't necessarily want to update the whole form
	 * right away as that will lead to unnecessary re-renders.
	 * We can debounce the updates because each widget will
	 * store it's own internal state
	 */
	const addUpdate = useCallback(
		(path: string, update: any) => {
			if (timer.current) {
				clearTimeout(timer.current);
				timer.current = undefined;
			}

			pendingUpdates.current.push({ path, update });
			timer.current = setTimeout(executeUpdates, debounceTime);
		},
		[debounceTime, executeUpdates]
	);

	return addUpdate;
}
