import { EntityApi } from '@campaign-buddy/frontend-types';
import { useQuery } from 'react-query';
import { entityApiQueryKeys } from './entityApiQueryKeys';

export function useEntity(
	entityApi: EntityApi,
	entityId: string,
	entityDefinitionName: string
) {
	return useQuery({
		queryKey: entityApiQueryKeys.getEntity(entityDefinitionName, entityId),
		queryFn: () =>
			entityApi.getHydratedEntities({ ids: [entityId], entityDefinitionName }),
	});
}
