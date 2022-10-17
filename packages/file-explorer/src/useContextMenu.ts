import { useState, useMemo, useCallback } from 'react';
import { MenuItem } from '@campaign-buddy/core-ui';
import { FSItem } from '@campaign-buddy/frontend-types';

interface UseContextMenuOptions<TData> {
	item: FSItem<TData>;
	renameItem?: (item: FSItem<TData>, name: string) => void;
	deleteItem?: (item: FSItem<TData>) => void;
}

export function useContextMenu<TData>({
	item,
	renameItem,
	deleteItem,
}: UseContextMenuOptions<TData>) {
	const [isRenaming, setIsRenaming] = useState(false);

	const contextMenuItems = useMemo<MenuItem[]>(
		() =>
			[
				renameItem && {
					displayText: 'Rename',
					icon: 'edit',
					onClick: () => {
						setIsRenaming(true);
					},
				},
				deleteItem && {
					displayText: 'Delete',
					icon: 'trash',
					onClick: () => {
						deleteItem(item);
					},
				},
			].filter(Boolean) as MenuItem[],
		[deleteItem, item, renameItem]
	);

	const commitRename = useCallback(
		(newName: string) => {
			renameItem?.(item, newName);
			setIsRenaming(false);
		},
		[item, renameItem]
	);

	const cancelRename = useCallback(() => {
		setIsRenaming(false);
	}, []);

	return {
		isRenaming,
		commitRename,
		cancelRename,
		contextMenuItems,
	};
}
