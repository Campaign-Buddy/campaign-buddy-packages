import { MappedTypeDescription } from '@syncedstore/core/types/doc';
import { JSONSchema4 } from 'json-schema';
import { useSyncedStore } from '@syncedstore/react';
import cloneDeep from 'lodash.clonedeep';
import { useCallback, useEffect, useRef } from 'react';
import { getSchemaForPath } from './getSchemaForPath';

interface Update {
	path: string;
	update: any;
}

type DataUpdater = (path: string, update: any) => any;

export function useSyncedDataUpdater(
	schema: JSONSchema4,
	store: MappedTypeDescription<{ data: any }>
): DataUpdater {
	const schemaRef = useRef(schema);
	const data = useSyncedStore(store);

	useEffect(() => {
		schemaRef.current = schema;
	}, [schema]);

	const addUpdate = useCallback(
		(path: string, update: any) => {
			applyUpdate(data.data, path, update, schemaRef.current);
		},
		[data]
	);

	return addUpdate;
}

export function useDataUpdater(
	schema: JSONSchema4,
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
			applyUpdate(dataClone, update.path, update.update, schemaRef.current);
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

function applyUpdate(
	data: any,
	path: string,
	update: any,
	schema: JSONSchema4
): void {
	const parts = path.split('.');
	let cur = data;
	let curPath = '$';

	for (let i = 0; i < parts.length - 1; i++) {
		const part = parts[i];

		if (part === '$' && i === 0) {
			continue;
		}

		curPath = `${curPath}.${part}`;

		const nextType = typeof cur[part];

		if (nextType === 'undefined') {
			const subSchema = getSchemaForPath(curPath, schema);

			if (subSchema?.type === 'array') {
				cur[part] = [];
			} else {
				cur[part] = {};
			}
		} else if (nextType !== 'object') {
			console.error(
				`navigation error, tried to traverse ${nextType} using path ${path}`,
				update
			);
			return;
		}

		cur = cur[part];
	}

	const lastPart = parts[parts.length - 1];
	cur[lastPart] = update;

	return;
}
