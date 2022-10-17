import { useState, useMemo, useCallback } from 'react';
import { MenuItem } from '@campaign-buddy/core-ui';
import { FSItem } from '@campaign-buddy/frontend-types';

interface UseContextMenuOptions<TData> {
	item: FSItem<TData>;
	renameItem?: (item: FSItem<TData>, name: string) => void;
}

export function useContextMenu<TData>({
	item,
	renameItem,
}: UseContextMenuOptions<TData>) {
	const [isRenaming, setIsRenaming] = useState(false);

	const contextMenuItems = useMemo<MenuItem[]>(
		() => [
			{
				displayText: 'Rename',
				icon: 'edit',
				onClick: () => {
					setIsRenaming(true);
				},
			},
		],
		[]
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
