import {
	FileSystemApi,
	FSItemFile,
	FSItemEditSet,
	ListFSItemsResult,
} from '@campaign-buddy/frontend-types';
import {
	useQueryClient,
	useMutation,
	QueryClient,
	InfiniteData,
} from 'react-query';
import { fileSystemApiQueryKeys } from './fileSystemApiQueryKeys';

export function useEditFile<TItemData>(
	api: FileSystemApi<TItemData>,
	folderId: string | undefined,
	invalidateDependentQueries: (
		queryClient: QueryClient,
		item?: FSItemFile<TItemData>
	) => void
) {
	const queryClient = useQueryClient();
	const queryKey = fileSystemApiQueryKeys.listFolder(folderId);

	const renameItemMutation = useMutation(api.edit, {
		onMutate: (request) => {
			const previousValue =
				queryClient.getQueryData<InfiniteData<ListFSItemsResult<TItemData>>>(
					queryKey
				);

			if (previousValue) {
				// We can append the created result
				// to the existing query data
				queryClient.cancelQueries(queryKey);
				const oldItem = previousValue.pages
					.flatMap((x) => x.items)
					.find((x) => x.id === request.itemId);

				if (!oldItem) {
					throw new Error('Could not find item to edit');
				}

				queryClient.setQueryData(
					queryKey,
					(old: InfiniteData<ListFSItemsResult<TItemData>> | undefined) => {
						if (!old) {
							throw new Error(`Expected existing query data`);
						}

						return {
							...old,
							pages: old.pages.map(({ items, ...rest }) => {
								return {
									items: items.map((x) => {
										if (x.id === request.itemId) {
											const update: FSItemEditSet = {};
											for (const key of request.fieldsToEdit) {
												update[key] = request.editSet[key];
											}
											return { ...x, ...update };
										} else {
											return x;
										}
									}),
									...rest,
								};
							}),
						};
					}
				);

				return oldItem.name;
			} else {
				queryClient.refetchQueries(queryKey, undefined, {
					cancelRefetch: true,
				});
			}
		},
		onSuccess: (response) => {
			if (response.item.kind === 'file') {
				invalidateDependentQueries(queryClient, response.item);
			}
		},
		onError: (error, request, context) => {
			if (typeof context !== 'string') {
				return;
			}

			const previousValue = queryClient.getQueryData(queryKey);

			if (previousValue) {
				// We can append the created result
				// to the existing query data
				queryClient.cancelQueries(queryKey);
				queryClient.setQueryData(
					queryKey,
					(old: InfiniteData<ListFSItemsResult<TItemData>> | undefined) => {
						if (!old) {
							throw new Error(`Expected existing query data`);
						}

						return {
							...old,
							pages: old.pages.map(({ items, ...page }) => {
								return {
									...page,
									items: items.map((x) => {
										if (x.id === request.itemId) {
											return { ...x, name: context };
										} else {
											return x;
										}
									}),
								};
							}),
						};
					}
				);
			} else {
				queryClient.refetchQueries(queryKey, undefined, {
					cancelRefetch: true,
				});
			}
		},
	});

	return renameItemMutation;
}
