import { useMemo, useState } from 'react';
import { IOption, Select, Switch } from '@campaign-buddy/core-ui';
import { MockMediaApi, MockEntityApi } from '@campaign-buddy/mock-apis';
import { FormGenerator } from '@campaign-buddy/form-generator';
import { widgets, FormWidgetProvider } from '../src';
import {
	aggregationAuditSchema,
	aggregationAuditLayout,
} from './exampleSchemas';
import { QueryClient } from 'react-query';
import { EntityFieldSettings } from '@campaign-buddy/frontend-types';

export default {
	title: 'form-generator-widgets/AggregationAudit',
};

const mediaApi = new MockMediaApi();
const queryClient = new QueryClient();
const entityApi = new MockEntityApi(MockEntityApi.defaultOptions);

const roleOptions: IOption<string>[] = [
	{
		displayValue: 'GM',
		id: 'gm',
		data: 'gm',
	},
	{
		displayValue: 'Player',
		id: 'player',
		data: 'player',
	},
];

const visibilitySettings = [
	{
		label: 'GMs only',
		roles: ['gm'],
	},
	{
		label: 'GMs and players',
		roles: ['gm', 'player'],
	},
];

export const Primary = () => {
	const [state, setState] = useState({});
	const [shouldShowAggregationIcon, setShouldShowAggregationIcon] =
		useState(true);
	const [currentRole, setCurrentRole] = useState(roleOptions[0]);
	const [fieldSettings, setFieldSettings] = useState<EntityFieldSettings>({});

	const availableActions = useMemo(
		() => ({
			canUpdateAggregationSettings: currentRole.id === 'gm',
			canUpdateVisibilitySettings: currentRole.id === 'gm',
		}),
		[currentRole]
	);

	return (
		<div>
			<div style={{ marginBottom: '16px' }}>
				<Switch
					label="Show aggregation icon"
					value={shouldShowAggregationIcon}
					onChange={setShouldShowAggregationIcon}
				/>
			</div>
			<Select
				label="Current user role"
				options={roleOptions}
				onChange={setCurrentRole}
				value={currentRole}
			/>
			<FormWidgetProvider
				mediaApi={mediaApi}
				queryClient={queryClient}
				visibilitySettings={visibilitySettings}
				availableActions={availableActions}
				showAggregationIndicator={shouldShowAggregationIcon}
			>
				<FormGenerator
					data={state}
					onChange={setState}
					schema={aggregationAuditSchema}
					uiLayout={aggregationAuditLayout}
					widgets={widgets}
					entityApi={entityApi}
					fieldSettings={fieldSettings}
					updateFieldSettings={setFieldSettings}
					currentUserRole={currentRole.id}
				/>
			</FormWidgetProvider>
		</div>
	);
};
