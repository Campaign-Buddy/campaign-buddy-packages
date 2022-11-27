import {
	EntityApi,
	GetHydratedEntitiesResult,
	HydratedEntity,
} from '@campaign-buddy/frontend-types';
import { useMutation, useQueryClient } from 'react-query';
import { fileSystemApiQueryKeys } from '../fileSystemApi';
import { entityApiQueryKeys } from './entityApiQueryKeys';

export function useUpdateEntity(entityApi: EntityApi) {
	const queryClient = useQueryClient();
	return useMutation(entityApi.updateEntity, {
		onMutate: (options) => {
			const queryKey = entityApiQueryKeys.getEntity(
				options.entityDefinitionName,
				options.id
			);

			const previousData = queryClient.getQueryData(queryKey);

			if (!previousData) {
				return;
			}

			queryClient.setQueryData<GetHydratedEntitiesResult>(queryKey, {
				entities: [
					{
						id: options.id,
						entityData: options.entityData,
						definitionName: options.entityDefinitionName,
					},
				],
			});
			queryClient.removeQueries(fileSystemApiQueryKeys.everything());
			return previousData;
		},
		onError: (_, options, previousData) => {
			if (!previousData) {
				return;
			}

			const queryKey = entityApiQueryKeys.getEntity(
				options.entityDefinitionName,
				options.id
			);

			queryClient.setQueryData<HydratedEntity>(
				queryKey,
				previousData as HydratedEntity
			);
		},
	});
}
