import { EntityApi } from '@campaign-buddy/frontend-types';
import { useQuery } from 'react-query';
import { entityApiQueryKeys } from './entityApiQueryKeys';

export function useEntityDefinition(
	entityApi: EntityApi,
	entityDefinitionName: string
) {
	return useQuery({
		queryKey: entityApiQueryKeys.getEntityDefinition(entityDefinitionName),
		queryFn: () => entityApi.getEntityDefinition(entityDefinitionName),
	});
}
