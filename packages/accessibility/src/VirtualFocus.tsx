import React, {
	useCallback,
	useContext,
	useEffect,
	useId,
	useMemo,
	useRef,
} from 'react';
import {
	useCombinedRefs,
	useDataAttribute,
	useRefEffect,
} from '@campaign-buddy/common-hooks';
import {
	FocusChildNode,
	getActive,
	getFirst,
	getLast,
	getNext,
	getOrderedNodes,
} from './nodeUtil';
import {
	ArrowKeyOrientation,
	useArrowKeyVirtualFocus,
} from './useArrowKeyVirtualFocus';

type Unsubscribe = () => void;
type GiveFocus = () => void;

export interface FocusChildMeta {
	onActivate?: () => void;
	isSelected?: boolean;
}

interface VirtualFocusContextData {
	registerChild: (
		id: string,
		giveFocus: GiveFocus,
		meta?: React.RefObject<FocusChildMeta | undefined>
	) => Unsubscribe;
}

const VirtualFocusContext = React.createContext<
	VirtualFocusContextData | undefined
>(undefined);

export interface VirtualFocusChild {
	focus: GiveFocus;
	meta?: FocusChildMeta;
}

export interface VirtualFocusController {
	moveNext: () => void;
	movePrevious: () => void;
	moveToStart: () => void;
	moveToEnd: () => void;
	getFocused: () => VirtualFocusChild | undefined;
	focus: () => void;
	find: (
		predicate: (item: FocusChildMeta) => boolean
	) => VirtualFocusChild | undefined;
}

export interface VirtualFocusRootProps {
	initiallyFocused?: boolean;
	orientation?: ArrowKeyOrientation;
}

/**
 * Represents a complex control with custom focus management that exists outside of the default browser focus behavior
 */
export function VirtualFocusRoot({
	initiallyFocused,
	children,
	orientation,
}: React.PropsWithChildren<VirtualFocusRootProps>) {
	const childMap = useRef<
		Record<
			string,
			{
				meta?: React.RefObject<any>;
				focus: GiveFocus;
			}
		>
	>({});
	const isInitiallyFocusedRef = useRef(initiallyFocused);
	const rootElementRef = useRef<HTMLDivElement | null>(null);

	const contextValue = useMemo<VirtualFocusContextData>(
		() => ({
			registerChild: (id: string, focus, meta) => {
				childMap.current[id] = {
					focus,
					meta,
				};
				return () => {
					delete childMap.current[id];
				};
			},
		}),
		[]
	);

	const focusNode = useCallback((node: FocusChildNode | undefined) => {
		console.log('focusing', node);
		if (!node) {
			return;
		}
		childMap.current[node.id]?.focus();
	}, []);

	const find = useCallback((predicate: (item: FocusChildMeta) => boolean) => {
		const nodes = getOrderedNodes();
		const found = nodes.find(
			({ id }) =>
				childMap.current[id]?.meta?.current &&
				predicate(childMap.current[id].meta?.current)
		);
		if (!found) {
			return;
		}

		const result = childMap.current[found.id];
		return {
			focus: result.focus,
			meta: result.meta?.current,
		};
	}, []);

	const focus = useCallback(() => {
		const selected = find((x) => Boolean(x.isSelected));
		if (selected) {
			selected.focus();
			return;
		}

		const active = getActive();
		if (active) {
			focusNode(active);
		} else {
			focusNode(getFirst());
		}
	}, [find]);

	const controller = useMemo<VirtualFocusController>(
		() => ({
			moveNext: () => focusNode(getNext()),
			movePrevious: () => focusNode(getNext(-1)),
			moveToStart: () => focusNode(getFirst()),
			moveToEnd: () => focusNode(getLast()),
			getFocused: () => {
				const active = getActive();
				if (active && childMap.current[active.id]) {
					const result = childMap.current[active.id];
					return {
						focus: result.focus,
						meta: result.meta?.current ?? undefined,
					};
				}
				return undefined;
			},
			find,
			focus,
		}),
		[find, focus]
	);

	const hotkeyRef = useArrowKeyVirtualFocus(controller, orientation);
	const rootRef = useCombinedRefs(hotkeyRef, rootElementRef);

	useEffect(() => {
		if (isInitiallyFocusedRef.current) {
			focus();
		}
	}, []);

	return (
		<VirtualFocusContext.Provider value={contextValue}>
			<div ref={rootRef}>{children}</div>
		</VirtualFocusContext.Provider>
	);
}

/**
 * A hook that returns a ref to be attached to a virtually focusable DOM node
 */
export function useVirtualFocusChild(meta?: FocusChildMeta) {
	const context = useContext(VirtualFocusContext);
	const ref = useRef<HTMLElement | null>(null);
	const metaRef = useRef<FocusChildMeta | undefined>(meta);
	metaRef.current = meta;

	if (!context) {
		throw new Error('No virtual focus context given');
	}

	const id = useId();
	const { registerChild } = context;

	useEffect(() => {
		return registerChild(
			id,
			() => {
				ref.current?.focus();
			},
			metaRef
		);
	}, [id]);

	const dataAttributeRef = useDataAttribute('virtualFocusNode', id);

	return useCombinedRefs(ref, dataAttributeRef);
}
