import { QueryClient } from 'react-query';
import { entityApiQueryKeys } from './entityApiQueryKeys';

export function invalidateEntityQueries(
	queryClient: QueryClient,
	definitionName?: string,
	changedItemId?: string
) {
	if (!changedItemId || !definitionName) {
		queryClient.resetQueries({ queryKey: entityApiQueryKeys.allEntities() });
	} else {
		queryClient.resetQueries({
			queryKey: entityApiQueryKeys.getEntity(definitionName, changedItemId),
		});
	}
}
