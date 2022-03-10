import cuid from 'cuid';
import diff from 'microdiff';
import { useCallback, useEffect, useRef } from 'react';
import { getDataForPath } from './getDataForPath';

interface DataSubscription {
	path: string;
	onUpdate: (dataToUpdate: any) => void;
	id: string;
}

export function usePartialDataPublisher(data: any) {
	const dataRef = useRef(data);
	const subscriptions = useRef<SubscriptionTreeNode>({});

	const subscribe = useCallback(
		(path: string, onUpdate: (dataToUpdate: any) => void) => {
			const id = cuid();
			if (!path.startsWith('$.')) {
				path = `$.${path}`;
			}

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

	const getDataAtPath = useCallback((path: string) => {
		return getDataForPath(path, dataRef.current, undefined);
	}, []);

	useEffect(() => {
		if (data === dataRef.current) {
			return;
		}

		const changes = diff(dataRef.current, data, { cyclesFix: false });
		dataRef.current = data;

		if (changes.length === 0) {
			return;
		}

		const subscriptionsToTrigger: Record<string, DataSubscription> = {};
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

interface SubscriptionTreeNode {
	children?: Record<string, SubscriptionTreeNode>;
	subscriptions?: DataSubscription[];
}

function removeFromTree(
	root: SubscriptionTreeNode,
	path: string,
	id: string
): void {
	const parts = path.split('.');
	let cur = root;

	for (let i = 0; i < parts.length; i++) {
		const curPart = parts[i];

		if (curPart === '$' && i === 0) {
			continue;
		}

		if (!cur.children?.[curPart]) {
			return;
		}

		cur = cur.children[curPart];
	}

	if (!cur.subscriptions) {
		return;
	}

	const index = cur.subscriptions.findIndex((x) => x.id === id);
	if (index === -1) {
		return;
	}

	cur.subscriptions.splice(index, 1);
}

function insertIntoTree(
	root: SubscriptionTreeNode,
	subscription: DataSubscription
): void {
	const parts = subscription.path.split('.');
	let cur = root;

	for (let i = 0; i < parts.length; i++) {
		const curPart = parts[i];

		if (curPart === '$' && i === 0) {
			continue;
		}

		if (!cur.children) {
			cur.children = {};
		}

		if (!cur.children[curPart]) {
			cur.children[curPart] = {};
		}

		cur = cur.children[curPart];
	}

	if (!cur.subscriptions) {
		cur.subscriptions = [];
	}

	cur.subscriptions.push(subscription);
}

function getAllSubscriptionsForPath(
	root: SubscriptionTreeNode,
	path: string
): DataSubscription[] {
	const parts = path.split('.');
	const allSubscriptions: DataSubscription[] = [];
	let cur = root;

	for (let i = 0; i < parts.length; i++) {
		const curPart = parts[i];

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

function getAllSubscriptionsInTree(
	root: SubscriptionTreeNode
): DataSubscription[] {
	if (!root.children) {
		return root.subscriptions ?? [];
	}

	const allSubscriptions = [];

	for (const subscription of Object.values(root.children)) {
		allSubscriptions.push(...getAllSubscriptionsInTree(subscription));
	}

	return allSubscriptions;
}
