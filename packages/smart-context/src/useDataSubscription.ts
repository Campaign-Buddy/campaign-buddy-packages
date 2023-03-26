import {
	navigateObject,
	ObjectLocation,
	parseLocation,
} from '@campaign-buddy/object-navigator';
import cuid from 'cuid';
import diff from 'microdiff';
import { useCallback, useEffect, useRef } from 'react';

interface DataSubscription<TData, TProperty> {
	path: ObjectLocation<TData, TProperty>;
	onUpdate: (dataToUpdate: TProperty) => void;
	id: string;
}

export function usePartialDataPublisher<TData>(data: TData) {
	const dataRef = useRef(data);
	const subscriptions = useRef<SubscriptionTreeNode<TData>>({});

	const subscribe = useCallback(
		<TProperty = any>(
			path: ObjectLocation<TData, TProperty>,
			onUpdate: (dataToUpdate: TProperty) => void
		) => {
			const id = cuid();

			insertIntoTree(subscriptions.current, {
				path,
				onUpdate,
				id,
			});

			return () => {
				removeFromTree(subscriptions.current, path, id);
			};
		},
		[]
	);

	const getDataAtPath = useCallback(
		<TProperty>(path: ObjectLocation<TData, TProperty>) => {
			return navigateObject({ location: path, root: dataRef.current });
		},
		[]
	);

	useEffect(() => {
		if (data === dataRef.current) {
			return;
		}

		const changes = diff(dataRef.current, data, { cyclesFix: false });
		dataRef.current = data;

		if (changes.length === 0) {
			return;
		}

		const subscriptionsToTrigger: Record<
			string,
			DataSubscription<TData, any>
		> = {};
		for (const change of changes) {
			const path = `$.${change.path.join('.')}`;

			const subscriptionsForPath = getAllSubscriptionsForPath(
				subscriptions.current,
				path
			);

			for (const subscription of subscriptionsForPath) {
				subscriptionsToTrigger[subscription.id] = subscription;
			}
		}

		for (const subscription of Object.values(subscriptionsToTrigger)) {
			subscription.onUpdate(getDataAtPath(subscription.path));
		}
	}, [data, getDataAtPath]);

	return {
		subscribe,
		getDataAtPath,
	};
}

interface SubscriptionTreeNode<TData> {
	children?: Record<string, SubscriptionTreeNode<TData>>;
	subscriptions?: DataSubscription<TData, any>[];
}

function removeFromTree<TData>(
	root: SubscriptionTreeNode<TData>,
	path: ObjectLocation<TData, any>,
	id: string
): void {
	const node = navigateObject<
		SubscriptionTreeNode<TData>,
		SubscriptionTreeNode<TData>
	>({
		root,
		accessNext: (data, key) => {
			if (typeof key === 'symbol') {
				return;
			}

			if (!data.children) {
				data.children = {};
			}

			if (!data.children[key]) {
				data.children[key] = {};
			}

			return data.children[key];
		},
		location: path as ObjectLocation<any, any>,
	});

	if (!node?.subscriptions) {
		return;
	}

	const index = node.subscriptions.findIndex((x) => x.id === id);
	if (index === -1) {
		return;
	}

	node.subscriptions.splice(index, 1);
}

function insertIntoTree<TData>(
	root: SubscriptionTreeNode<TData>,
	subscription: DataSubscription<TData, any>
): void {
	const node = navigateObject<SubscriptionTreeNode<TData>>({
		root,
		accessNext: (data, key) => {
			if (typeof key === 'symbol') {
				return;
			}

			if (!data.children) {
				data.children = {};
			}

			if (!data.children[key]) {
				data.children[key] = {};
			}

			return data.children[key];
		},
		location: subscription.path as ObjectLocation<any, any>,
	});

	if (!node.subscriptions) {
		node.subscriptions = [];
	}

	node.subscriptions.push(subscription);
}

function getAllSubscriptionsForPath<TData, TProperty>(
	root: SubscriptionTreeNode<TData>,
	path: ObjectLocation<TData, TProperty>
): DataSubscription<TData, any>[] {
	const parts = parseLocation(path);
	const allSubscriptions: DataSubscription<TData, TProperty>[] = [];
	let cur = root;

	for (let i = 0; i < parts.length; i++) {
		const curPart = parts[i];
		if (typeof curPart === 'symbol') {
			throw new Error('Symbol indexer not allowed here');
		}

		if (curPart === '$' && i === 0) {
			continue;
		}

		if (cur.subscriptions) {
			allSubscriptions.push(...cur.subscriptions);
		}

		if (!cur.children?.[curPart]) {
			return allSubscriptions;
		}

		cur = cur.children[curPart];
	}

	return [...allSubscriptions, ...getAllSubscriptionsInTree(cur)];
}

function getAllSubscriptionsInTree<TData>(
	root: SubscriptionTreeNode<TData>
): DataSubscription<TData, any>[] {
	if (!root.children) {
		return root.subscriptions ?? [];
	}

	const allSubscriptions = [];

	for (const subscription of Object.values(root.children)) {
		allSubscriptions.push(...getAllSubscriptionsInTree(subscription));
	}

	return allSubscriptions;
}
