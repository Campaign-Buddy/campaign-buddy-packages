import { FileSystemApi, ListResult } from '@campaign-buddy/frontend-types';
import { useMutation, useQueryClient } from 'react-query';
import { fileSystemApiQueryKeys } from './fileSystemApiQueryKeys';

export function useDeleteFile<TItemData>(
	api: FileSystemApi<TItemData>,
	folderId: string
) {
	const queryClient = useQueryClient();
	const queryKey = fileSystemApiQueryKeys.listFolder(folderId);

	const deleteItemMutation = useMutation(api.delete, {
		onSuccess: (_, itemId) => {
			const previousValue = queryClient.getQueryData(queryKey);

			if (previousValue) {
				// We can append the created result
				// to the existing query data
				queryClient.cancelQueries(queryKey);

				queryClient.setQueryData(
					queryKey,
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
				queryClient.refetchQueries(queryKey, undefined, {
					cancelRefetch: true,
				});
			}
		},
	});

	return deleteItemMutation;
}
