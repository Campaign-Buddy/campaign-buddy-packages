import React, { useCallback, useMemo, useState } from 'react';
import {
	FileSystemApi,
	FSItem,
	FSItemFile,
} from '@campaign-buddy/frontend-types';
import {
	useDeleteFile,
	useEditFile,
	useCreateFile,
	useListFolder,
} from '@campaign-buddy/client-hooks';
import { useBooleanState } from '@campaign-buddy/common-hooks';
import {
	List,
	IconName,
	Button,
	MenuPopover,
	MenuItem,
	Modal,
	ModalButton,
	CampaignBuddyIcon,
} from '@campaign-buddy/core-ui';
import { FileListItem } from './FileListItem';
import { FolderListItem } from './FolderListItem';
import { Breadcrumbs } from './Breadcrumbs';
import {
	FileExplorerContainer,
	FileExplorerHeader,
} from './FileExplorer.styled';
import { QueryClient } from 'react-query';

export interface FileExplorerProps<TItemData = any> {
	api: FileSystemApi<TItemData>;
	folderId?: string;
	rootIcon?: CampaignBuddyIcon;
	getAddMenu?: (create: FileSystemApi<TItemData>['create']) => MenuItem[];
	setFolderId: (newFolderId?: string) => void;
	getIconForItem: (item: FSItem<TItemData>) => IconName;
	openFile: (file: FSItemFile<TItemData>) => void;
	invalidateDependentQueries: (
		queryClient: QueryClient,
		item?: FSItemFile<TItemData>
	) => void;
}

export function FileExplorer<TItemData>({
	api,
	folderId,
	setFolderId,
	getIconForItem,
	openFile,
	getAddMenu,
	invalidateDependentQueries,
}: FileExplorerProps<TItemData>) {
	const [isMenuOpen, openMenu, closeMenu] = useBooleanState();
	const [itemToDelete, setItemToDelete] = useState<FSItem<TItemData>>();

	const { data: listResult } = useListFolder(api, folderId);
	const createNewItemMutation = useCreateFile(
		api,
		folderId,
		invalidateDependentQueries
	);
	const editItem = useEditFile(api, folderId, invalidateDependentQueries);
	const deleteItemMutation = useDeleteFile(
		api,
		folderId,
		invalidateDependentQueries
	);

	const renameItem = useCallback(
		async (item: FSItem<TItemData>, name: string) => {
			editItem.mutateAsync({
				itemId: item.id,
				editSet: { name },
				fieldsToEdit: ['name'],
			});
		},
		[editItem]
	);

	const newMenuItems = useMemo<MenuItem[]>(
		() =>
			getAddMenu?.(createNewItemMutation.mutateAsync) ?? [
				{
					displayText: 'New file',
					icon: 'document',
					onClick: () => {
						createNewItemMutation.mutate({
							createSet: {
								name: 'Default name',
								parentId: folderId,
								kind: 'file',
							},
						});
					},
				},
				{
					displayText: 'New folder',
					icon: 'folder-close',
					onClick: () => {
						createNewItemMutation.mutate({
							createSet: {
								name: 'New folder',
								parentId: folderId,
								kind: 'folder',
							},
						});
					},
				},
			],
		[createNewItemMutation, folderId, getAddMenu]
	);

	const footerButtons = useMemo<ModalButton[]>(
		() => [
			{
				text: 'Close',
				onClick: () => setItemToDelete(undefined),
				style: 'minimal',
			},
			{
				text: 'Delete',
				onClick: async () => {
					if (!itemToDelete) {
						return;
					}

					await deleteItemMutation.mutateAsync({ itemId: itemToDelete.id });
					setItemToDelete(undefined);
				},
			},
		],
		[deleteItemMutation, itemToDelete]
	);

	return listResult?.items ? (
		<FileExplorerContainer>
			<FileExplorerHeader>
				<Breadcrumbs
					currentFolder={listResult.folder}
					breadcrumbs={listResult.breadcrumbs}
					onNavigate={setFolderId}
				/>
				{newMenuItems.length && (
					<MenuPopover
						isOpen={isMenuOpen}
						onClose={closeMenu}
						items={newMenuItems}
					>
						<Button style="minimal" size="small" icon="plus" onClick={openMenu}>
							New
						</Button>
					</MenuPopover>
				)}
			</FileExplorerHeader>
			<List>
				{listResult.items.map((x) =>
					x.kind === 'folder' ? (
						<FolderListItem
							key={x.id}
							folder={x}
							isLoading={editItem.isLoading}
							onNavigate={setFolderId}
							renameItem={renameItem}
							deleteItem={setItemToDelete}
						/>
					) : (
						<FileListItem
							openFile={openFile}
							getIconForFile={getIconForItem}
							renameItem={renameItem}
							deleteItem={setItemToDelete}
							isLoading={editItem.isLoading}
							key={x.id}
							file={x}
						/>
					)
				)}
			</List>
			<Modal
				title="Confirm"
				onClose={() => setItemToDelete(undefined)}
				isOpen={Boolean(itemToDelete)}
				footerButtons={footerButtons}
			>
				<p>
					Are you sure you sure you want to delete{' '}
					<strong>{itemToDelete?.name}</strong>?
				</p>
			</Modal>
		</FileExplorerContainer>
	) : (
		<p>Loading...</p>
	);
}
