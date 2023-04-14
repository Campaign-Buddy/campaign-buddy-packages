import React, { useMemo, useState } from 'react';
import {
	FileSystemApi,
	FSItem,
	FSItemFile,
} from '@campaign-buddy/frontend-types';
import {
	useDeleteFile,
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
	Spinner,
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

	const {
		data: listResult,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useListFolder(api, folderId);
	const createNewItemMutation = useCreateFile(
		api,
		folderId,
		invalidateDependentQueries
	);
	const { mutateAsync: deleteItem, isLoading: isDeleting } = useDeleteFile(
		api,
		folderId,
		invalidateDependentQueries
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

					await deleteItem({ itemId: itemToDelete.id });
					setItemToDelete(undefined);
				},
				isLoading: isDeleting,
			},
		],
		[deleteItem, isDeleting, itemToDelete]
	);

	const breadcrumbs = listResult?.pages?.[0].breadcrumbs;
	const folder = listResult?.pages?.[0].folder;
	const allItems = listResult?.pages?.flatMap((x) => x.items);

	return allItems ? (
		<FileExplorerContainer>
			<FileExplorerHeader>
				<Breadcrumbs
					currentFolder={folder}
					breadcrumbs={breadcrumbs ?? []}
					onNavigate={setFolderId}
				/>
				{newMenuItems.length && (
					<MenuPopover
						isOpen={isMenuOpen && !createNewItemMutation.isLoading}
						onClose={closeMenu}
						items={newMenuItems}
					>
						<Button
							isLoading={createNewItemMutation.isLoading}
							variant="minimal"
							size="small"
							icon="plus"
							onClick={openMenu}
						>
							New
						</Button>
					</MenuPopover>
				)}
			</FileExplorerHeader>
			<List>
				{allItems.map((x) =>
					x.kind === 'folder' ? (
						<FolderListItem
							key={x.id}
							folder={x}
							parentFolderId={folderId}
							onNavigate={setFolderId}
							api={api}
							invalidateDependentQueries={invalidateDependentQueries}
							openDeleteModal={setItemToDelete}
						/>
					) : (
						<FileListItem
							openFile={openFile}
							getIconForFile={getIconForItem}
							api={api}
							invalidateDependentQueries={invalidateDependentQueries}
							parentFolderId={folderId}
							openDeleteModal={setItemToDelete}
							key={x.id}
							file={x}
						/>
					)
				)}
			</List>
			<div>
				{hasNextPage && (
					<Button
						onClick={() => fetchNextPage()}
						isLoading={isFetchingNextPage}
					>
						More
					</Button>
				)}
			</div>
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
		<Spinner size="fullPage" fullHeight />
	);
}
