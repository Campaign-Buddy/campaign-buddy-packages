import React, {
	createContext,
	useCallback,
	useContext,
	useRef,
	useState,
} from 'react';
import { useHtmlId } from '../hooks';
import { listItemClass } from './List.styled';

interface ListItemFocusManagerContextData {
	focusedId: string | undefined;
}

const ListItemFocusManagerContext =
	createContext<ListItemFocusManagerContextData>({
		focusedId: undefined,
	});

export function ListItemFocusManager({
	children,
}: React.PropsWithChildren<unknown>) {
	const [focusedId, setFocusedId] = useState<string | undefined>(undefined);
	const containerRef = useRef<HTMLDivElement | null>(null);

	const handleFocus = useCallback(() => {
		if (
			document.activeElement?.id === focusedId ||
			!containerRef.current?.contains(document.activeElement)
		) {
			return;
		}

		let listItemElement = document.activeElement;
		while (
			listItemElement &&
			!listItemElement.classList.contains(listItemClass)
		) {
			listItemElement = listItemElement.parentElement;
		}

		if (!listItemElement) {
			return;
		}

		setFocusedId(listItemElement.id);
	}, [focusedId]);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') {
				return;
			}

			const allListItems = document.querySelectorAll(`.${listItemClass}`);

			if (allListItems.length === 0) {
				return;
			}

			let focusedItemIndex = 0;
			for (let i = 0; i < allListItems.length; i++) {
				if (allListItems[i].id === focusedId) {
					focusedItemIndex = i;
					break;
				}
			}

			if (e.key === 'ArrowUp') {
				focusedItemIndex--;
			} else if (e.key === 'ArrowDown') {
				focusedItemIndex++;
			}

			if (focusedItemIndex >= allListItems.length) {
				focusedItemIndex = allListItems.length - 1;
			}

			if (focusedItemIndex < 0) {
				focusedItemIndex = 0;
			}

			const nextFocusedItem = allListItems[focusedItemIndex];
			const nextFocusedId = nextFocusedItem?.id;

			if (nextFocusedId === focusedId) {
				return;
			}

			setFocusedId(nextFocusedId);

			if (nextFocusedItem instanceof HTMLElement) {
				nextFocusedItem.focus();
			}
		},
		[focusedId]
	);

	return (
		<ListItemFocusManagerContext.Provider value={{ focusedId }}>
			<div onKeyDown={handleKeyDown} ref={containerRef} onFocus={handleFocus}>
				{children}
			</div>
		</ListItemFocusManagerContext.Provider>
	);
}

export function useListItemFocus() {
	const id = useHtmlId();
	const { focusedId } = useContext(ListItemFocusManagerContext);

	return {
		id,
		canReceiveFocus: focusedId === id,
	};
}

interface ListItemFocusStateContextData {
	canReceiveFocus: boolean;
}

const ListItemFocusStateContext = createContext<ListItemFocusStateContextData>({
	canReceiveFocus: true,
});

interface ListItemFocusStateProviderProps {
	canReceiveFocus: boolean;
}

export function ListItemFocusStateProvider({
	canReceiveFocus,
	children,
}: React.PropsWithChildren<ListItemFocusStateProviderProps>) {
	return (
		<ListItemFocusStateContext.Provider value={{ canReceiveFocus }}>
			{children}
		</ListItemFocusStateContext.Provider>
	);
}

export function useCanParentListItemReceiveFocus() {
	return useContext(ListItemFocusStateContext).canReceiveFocus;
}
