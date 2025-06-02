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
	useArrowKeyNavigation,
} from './useArrowKeyNavigation';

type Unsubscribe = () => void;
type GiveFocus = () => void;

export interface ControlGroupChildMeta {
	onActivate?: () => void;
	isSelected?: boolean;
}

interface ControlGroupContextData {
	registerChild: (
		id: string,
		giveFocus: GiveFocus,
		meta?: React.RefObject<ControlGroupChildMeta | undefined>
	) => Unsubscribe;
}

const ControlGroupContext = React.createContext<
	ControlGroupContextData | undefined
>(undefined);

export interface ControlGroupChild {
	focus: GiveFocus;
	meta?: ControlGroupChildMeta;
}

export interface ControlGroupController {
	moveNext: () => void;
	movePrevious: () => void;
	moveToStart: () => void;
	moveToEnd: () => void;
	getFocused: () => ControlGroupChild | undefined;
	focus: () => void;
	find: (
		predicate: (item: ControlGroupChildMeta) => boolean
	) => ControlGroupChild | undefined;
}

export interface ControlGroupProps {
	initiallyFocused?: boolean;
	orientation?: ArrowKeyOrientation;
}

/**
 * Represents a complex control with custom focus management that exists outside of the default browser focus behavior
 */
export function ControlGroup({
	initiallyFocused,
	children,
	orientation,
}: React.PropsWithChildren<ControlGroupProps>) {
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

	const contextValue = useMemo<ControlGroupContextData>(
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

	const find = useCallback((predicate: (item: ControlGroupChildMeta) => boolean) => {
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

	const controller = useMemo<ControlGroupController>(
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

	const hotkeyRef = useArrowKeyNavigation(controller, orientation);
	const rootRef = useCombinedRefs(hotkeyRef, rootElementRef);

	useEffect(() => {
		if (isInitiallyFocusedRef.current) {
			focus();
		}
	}, []);

	return (
		<ControlGroupContext.Provider value={contextValue}>
			<div ref={rootRef}>{children}</div>
		</ControlGroupContext.Provider>
	);
}

/**
 * A hook that returns a ref to be attached to a virtually focusable DOM node
 */
export function useControlGroupChild(meta?: ControlGroupChildMeta) {
	const context = useContext(ControlGroupContext);
	const ref = useRef<HTMLElement | null>(null);
	const metaRef = useRef<ControlGroupChildMeta | undefined>(meta);
	metaRef.current = meta;

	if (!context) {
		throw new Error('No control group context given');
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

	const dataAttributeRef = useDataAttribute('controlGroupNode', id);

	return useCombinedRefs(ref, dataAttributeRef);
}
