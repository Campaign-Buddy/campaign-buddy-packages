import { useState, useMemo, useCallback } from 'react';
import { MenuItem } from '@campaign-buddy/core-ui';
import {
	FileSystemApi,
	FSItem,
	FSItemFile,
} from '@campaign-buddy/frontend-types';
import { useEditFile } from '@campaign-buddy/client-hooks';
import { QueryClient } from 'react-query';

interface UseContextMenuOptions<TData> {
	item: FSItem<TData>;
	parentFolderId?: string;
	api: FileSystemApi<TData>;
	invalidateDependentQueries: (
		queryClient: QueryClient,
		item?: FSItemFile<TData>
	) => void;
	openDeleteModal?: (item?: FSItem<TData>) => void;
}

export function useContextMenu<TData>({
	item,
	api,
	parentFolderId,
	invalidateDependentQueries,
	openDeleteModal,
}: UseContextMenuOptions<TData>) {
	const [isRenaming, setIsRenaming] = useState(false);

	const renameItemMutation = useEditFile(
		api,
		parentFolderId,
		invalidateDependentQueries
	);

	const contextMenuItems = useMemo<MenuItem[]>(
		() =>
			[
				{
					displayText: 'Rename',
					icon: 'edit',
					onClick: () => {
						setIsRenaming(true);
					},
				},
				openDeleteModal && {
					displayText: 'Delete',
					icon: 'trash',
					onClick: () => {
						openDeleteModal(item);
					},
				},
			].filter(Boolean) as MenuItem[],
		[item, openDeleteModal]
	);

	const commitRename = useCallback(
		(newName: string) => {
			renameItemMutation.mutate({
				editSet: {
					name: newName,
				},
				itemId: item.id,
				fieldsToEdit: ['name'],
			});
			setIsRenaming(false);
		},
		[item, renameItemMutation]
	);

	const cancelRename = useCallback(() => {
		setIsRenaming(false);
	}, []);

	return {
		isRenaming,
		isComittingRename: renameItemMutation.isLoading,
		commitRename,
		cancelRename,
		contextMenuItems,
	};
}
