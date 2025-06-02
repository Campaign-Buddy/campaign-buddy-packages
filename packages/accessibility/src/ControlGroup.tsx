import React, {
	AriaRole,
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
type ValidTabIndex = -1 | 0;
type SetTabIndex = (index: ValidTabIndex) => void;

export interface ControlGroupChildMeta {
	onActivate?: () => void;
	isSelected?: boolean;
}

interface ControlGroupContextData {
	registerChild: (
		id: string,
		giveFocus: GiveFocus,
		setTabIndex: SetTabIndex,
		meta?: React.RefObject<ControlGroupChildMeta | undefined>
	) => Unsubscribe;
}

const ControlGroupContext = React.createContext<
	ControlGroupContextData | undefined
>(undefined);

export interface ControlGroupChild {
	focus: GiveFocus;
	setTabIndex: SetTabIndex;
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
	role?: AriaRole;
	accessibleId?: string;
}

/**
 * Represents a complex control with custom focus management that exists outside of the default browser focus behavior
 */
export function ControlGroup({
	initiallyFocused,
	children,
	orientation,
	role,
	accessibleId,
}: React.PropsWithChildren<ControlGroupProps>) {
	const childMap = useRef<
		Record<
			string,
			Omit<ControlGroupChild, 'meta'> & {
				meta?: React.RefObject<any>;
			}
		>
	>({});

	/**
	 * The id of the node that has tab index = 0
	 */
	const tabIndexId = useRef<string | undefined>();
	const shouldSetTabIndexOnSelectedNodeEncountered = useRef<boolean>(true);
	const isInitiallyFocusedRef = useRef(initiallyFocused);
	const rootElementRef = useRef<HTMLDivElement | null>(null);

	const setTabIndexId = useCallback((id: string) => {
		if (tabIndexId.current === id) {
			return;
		}

		tabIndexId.current = id;

		if (!id) {
			return;
		}

		const nodes = getOrderedNodes();
		for (const { id } of nodes) {
			if (id === tabIndexId.current) {
				childMap.current[id]?.setTabIndex(0);
			} else {
				childMap.current[id]?.setTabIndex(-1);
			}
		}
	}, []);

	const contextValue = useMemo<ControlGroupContextData>(
		() => ({
			registerChild: (id: string, focus, setTabIndex, meta) => {
				childMap.current[id] = {
					focus,
					setTabIndex,
					meta,
				};

				if (meta?.current?.isSelected) {
					setTabIndexId(id);
					shouldSetTabIndexOnSelectedNodeEncountered.current = false;
				} else if (
					!tabIndexId.current &&
					shouldSetTabIndexOnSelectedNodeEncountered.current
				) {
					setTabIndexId(id);
				} else {
					setTabIndex(-1);
				}

				return () => {
					delete childMap.current[id];
					if (tabIndexId.current === id) {
						setTabIndexId(getFirst()?.id);
					}
				};
			},
		}),
		[setTabIndexId]
	);

	const focusNode = useCallback((node: FocusChildNode | undefined) => {
		if (!node) {
			return;
		}
		childMap.current[node.id]?.focus();
		shouldSetTabIndexOnSelectedNodeEncountered.current = false;
		setTabIndexId(node.id);
	}, []);

	const find = useCallback(
		(predicate: (item: ControlGroupChildMeta) => boolean) => {
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
				setTabIndex: result.setTabIndex,
				meta: result.meta?.current,
			};
		},
		[]
	);

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
						setTabIndex: result.setTabIndex,
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
			<div ref={rootRef} role={role} id={accessibleId}>
				{children}
			</div>
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
	const tabIndexRef = useRef<ValidTabIndex>(-1);
	metaRef.current = meta;

	if (!context) {
		throw new Error('No control group context given');
	}

	const id = useId();
	const { registerChild } = context;

	const tabIndexRefEffect = useRefEffect<HTMLElement>((node) => {
		node.setAttribute('tabindex', tabIndexRef.current.toString());
	}, []);

	useEffect(() => {
		return registerChild(
			id,
			() => {
				ref.current?.focus();
			},
			(index) => {
				tabIndexRef.current = index;
				ref.current?.setAttribute('tabindex', index.toString());
			},
			metaRef
		);
	}, [id]);

	const dataAttributeRef = useDataAttribute('controlGroupNode', id);

	return useCombinedRefs(ref, dataAttributeRef, tabIndexRefEffect);
}
