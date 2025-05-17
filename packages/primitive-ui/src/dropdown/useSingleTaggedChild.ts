import React, { useMemo } from 'react';

export function tagComponent<T>(
	Component: React.ComponentType<T>,
	tag: symbol
) {
	(Component as any).__cbTag = tag;
	return Component;
}

export function useSingleTaggedChild(
	children: React.ReactNode,
	tag: symbol
): React.ReactNode {
	return useMemo(() => {
		const matchingChildren = React.Children.toArray(children).filter((child) =>
			hasTag(child, tag)
		);

		if (matchingChildren.length > 1) {
			throw new Error('Multiple tagged children encountered');
		}

		return matchingChildren[0];
	}, [children, tag]);
}

function hasTag(child: React.ReactNode, tag: symbol) {
	return (
		typeof child === 'object' &&
		child !== null &&
		'type' in child &&
		typeof child.type !== 'string' &&
		'__cbTag' in child.type &&
		child.type.__cbTag === tag
	);
}
