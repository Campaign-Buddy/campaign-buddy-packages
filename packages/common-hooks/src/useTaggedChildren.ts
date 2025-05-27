import React, { useMemo } from 'react';

export function tagComponent<T>(
	Component: React.ComponentType<T>,
	tag: symbol
) {
	(Component as any).__cbTag = tag;
	return Component;
}

export function useTaggedChildren(children: React.ReactNode, tag: symbol) {
	return useMemo(() => {
		const matchingChildren = React.Children.toArray(children).filter((child) =>
			hasTag(child, tag)
		);

		return matchingChildren;
	}, [children, tag]);
}

export function useSingleTaggedChild(
	children: React.ReactNode,
	tag: symbol
): React.ReactNode {
	const taggedChildren = useTaggedChildren(children, tag);

	if (taggedChildren.length > 1) {
		throw new Error('Multiple tagged children encountered');
	}

	return taggedChildren[0];
}

function hasTag(child: React.ReactNode, tag: symbol) {
	return (
		typeof child === 'object' &&
		child !== null &&
		'type' in child &&
		typeof child.type !== 'string' &&
		'__cbTag' in child.type &&
		(child.type as any).__cbTag === tag
	);
}
