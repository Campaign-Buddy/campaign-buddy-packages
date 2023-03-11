import {
	FileSystemApi,
	FSItemFile,
	ListFSItemsResult,
} from '@campaign-buddy/frontend-types';
import {
	useQueryClient,
	useMutation,
	QueryClient,
	InfiniteData,
} from 'react-query';
import { fileSystemApiQueryKeys } from './fileSystemApiQueryKeys';

export function useCreateFile<TItemData>(
	api: FileSystemApi<TItemData>,
	folderId: string | undefined,
	invalidateDependentQueries: (
		queryClient: QueryClient,
		item?: FSItemFile<TItemData>
	) => void
) {
	const queryClient = useQueryClient();
	const queryKey = fileSystemApiQueryKeys.listFolder(folderId);

	const createNewItemMutation = useMutation(api.create, {
		onSuccess: (createdItem) => {
			const previousValue =
				queryClient.getQueryData<InfiniteData<ListFSItemsResult<TItemData>>>(
					queryKey
				);

			if (createdItem.item.kind === 'file') {
				invalidateDependentQueries(queryClient, createdItem.item);
			}

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

						const lastPage = old.pages[old.pages.length - 1];

						return {
							...old,
							pages: [
								...old.pages.slice(0, old.pages.length - 1),
								{
									...lastPage,
									items: [...lastPage.items, createdItem.item],
								},
							],
						};
					}
				);
			} else {
				// We haven't loaded the list yet,
				// so cancel in progress fetching
				// and refetch
				queryClient.refetchQueries(queryKey, undefined, {
					cancelRefetch: true,
				});
			}
		},
	});

	return createNewItemMutation;
}
