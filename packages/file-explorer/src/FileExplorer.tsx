import React, { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
	FileSystemApi,
	FSItem,
	FSItemFile,
	ListResult,
} from '@campaign-buddy/frontend-types';
import { useBooleanState } from '@campaign-buddy/common-hooks';
import {
	List,
	IconName,
	Button,
	MenuPopover,
	MenuItem,
	Modal,
} from '@campaign-buddy/core-ui';
import { FileListItem } from './FileListItem';
import { FolderListItem } from './FolderListItem';
import { Breadcrumbs } from './Breadcrumbs';
import {
	FileExplorerContainer,
	FileExplorerHeader,
} from './FileExplorer.styled';

export interface FileExplorerProps<TItemData = any> {
	api: FileSystemApi<TItemData>;
	folderId?: string;
	setFolderId: (newFolderId?: string) => void;
	getIconForItem: (item: FSItem<TItemData>) => IconName;
	openFile: (file: FSItemFile<TItemData>) => void;
}

export function FileExplorer<TItemData>({
	api,
	folderId,
	setFolderId,
	getIconForItem,
	openFile,
}: FileExplorerProps<TItemData>) {
	const listFolderQueryKey = ['fileExplorer', 'currentFolder', folderId];
	const [isMenuOpen, openMenu, closeMenu] = useBooleanState();
	const [itemToDelete, setItemToDelete] = useState<FSItem<TItemData>>();

	const { data: listResult, refetch } = useQuery({
		queryKey: listFolderQueryKey,
		queryFn: () => api.list(folderId),
	});

	const queryClient = useQueryClient();
	const createNewItemMutation = useMutation(api.create, {
		onSuccess: (createdItem) => {
			const previousValue = queryClient.getQueryData(listFolderQueryKey);

			if (previousValue) {
				// We can append the created result
				// to the existing query data
				queryClient.cancelQueries(listFolderQueryKey);
				queryClient.setQueryData(
					listFolderQueryKey,
					(old: ListResult<TItemData> | undefined) => {
						if (!old) {
							throw new Error(`Expected existing query data`);
						}

						return {
							...old,
							items: [...old.items, createdItem],
						};
					}
				);
			} else {
				// We haven't loaded the list yet,
				// so cancel in progress fetching
				// and refetch
				refetch({ cancelRefetch: true });
			}
		},
	});

	const renameItemMutation = useMutation(
		({ itemId, newName }: { itemId: string; newName: string }) =>
			api.edit(
				itemId,
				{
					name: newName,
				},
				['name']
			),
		{
			onMutate: (request) => {
				const previousValue = queryClient.getQueryData(listFolderQueryKey);

				if (previousValue) {
					// We can append the created result
					// to the existing query data
					queryClient.cancelQueries(listFolderQueryKey);
					const oldItem = (previousValue as ListResult<TItemData>).items.find(
						(x) => x.id === request.itemId
					);

					if (!oldItem) {
						throw new Error('Could not find item to edit');
					}

					queryClient.setQueryData(
						listFolderQueryKey,
						(old: ListResult<TItemData> | undefined) => {
							if (!old) {
								throw new Error(`Expected existing query data`);
							}

							return {
								...old,
								items: old.items.map((x) => {
									if (x.id === request.itemId) {
										return { ...x, name: request.newName };
									} else {
										return x;
									}
								}),
							};
						}
					);

					return oldItem.name;
				}
			},
			onError: (error, request, context) => {
				if (typeof context !== 'string') {
					return;
				}

				const previousValue = queryClient.getQueryData(listFolderQueryKey);

				if (previousValue) {
					// We can append the created result
					// to the existing query data
					queryClient.cancelQueries(listFolderQueryKey);
					queryClient.setQueryData(
						listFolderQueryKey,
						(old: ListResult<TItemData> | undefined) => {
							if (!old) {
								throw new Error(`Expected existing query data`);
							}

							return {
								...old,
								items: old.items.map((x) => {
									if (x.id === request.itemId) {
										return { ...x, name: context };
									} else {
										return x;
									}
								}),
							};
						}
					);
				}
			},
		}
	);

	const deleteItemMutation = useMutation(api.delete, {
		onSuccess: (_, itemId) => {
			const previousValue = queryClient.getQueryData(listFolderQueryKey);

			if (previousValue) {
				// We can append the created result
				// to the existing query data
				queryClient.cancelQueries(listFolderQueryKey);

				queryClient.setQueryData(
					listFolderQueryKey,
					(old: ListResult<TItemData> | undefined) => {
						if (!old) {
							throw new Error(`Expected existing query data`);
						}

						const oldItemIndex = old.items.findIndex((x) => x.id === itemId);
						const newItems = [...old.items];
						newItems.splice(oldItemIndex, 1);

						return {
							...old,
							items: newItems,
						};
					}
				);
			} else {
				refetch({ cancelRefetch: true });
			}
		},
	});

	const menuItems = useMemo<MenuItem[]>(
		() => [
			{
				displayText: 'New file',
				icon: 'document',
				onClick: () => {
					createNewItemMutation.mutate({
						name: 'Default name',
						parentId: folderId,
						kind: 'file',
					});
				},
			},
			{
				displayText: 'New folder',
				icon: 'folder-close',
				onClick: () => {
					createNewItemMutation.mutate({
						name: 'New folder',
						parentId: folderId,
						kind: 'folder',
					});
				},
			},
		],
		[createNewItemMutation, folderId]
	);

	return listResult?.items ? (
		<FileExplorerContainer>
			<FileExplorerHeader>
				<Breadcrumbs
					currentFolder={listResult.folder}
					breadcrumbs={listResult.breadcrumbs}
					onNavigate={setFolderId}
				/>
				<MenuPopover isOpen={isMenuOpen} onClose={closeMenu} items={menuItems}>
					<Button style="minimal" size="small" icon="plus" onClick={openMenu}>
						New
					</Button>
				</MenuPopover>
			</FileExplorerHeader>
			<List>
				{listResult.items.map((x) =>
					x.kind === 'folder' ? (
						<FolderListItem
							key={x.id}
							folder={x}
							onNavigate={setFolderId}
							renameItem={(item, name) => {
								renameItemMutation.mutate({ itemId: item.id, newName: name });
							}}
							deleteItem={(item) => {
								setItemToDelete(item);
							}}
						/>
					) : (
						<FileListItem
							openFile={openFile}
							getIconForFile={getIconForItem}
							renameItem={(item, name) => {
								renameItemMutation.mutate({ itemId: item.id, newName: name });
							}}
							deleteItem={(item) => {
								setItemToDelete(item);
							}}
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
				footerButtons={[
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

							await deleteItemMutation.mutateAsync(itemToDelete.id);
							setItemToDelete(undefined);
						},
					},
				]}
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
