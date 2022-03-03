import {
	CampaignBuddySchema,
	DisplayInfoWithEnum,
	EntityAggregation,
	types,
	UiLayout,
	MultiEntityAggregation,
} from '@campaign-buddy/json-schema-core';
import { characterClassEntity } from './characterClass';

const schemaParts: Record<string, CampaignBuddySchema> = {};
const uiLayout: UiLayout = [['agg']];

addWidgetType(
	'string',
	types.string,
	(withBase) => `${withBase ? '(<base> || "") + " " + ' : ''}{$.agg}`
);

addWidgetType(
	'number',
	types.number,
	(withBase) => `${withBase ? 'TO_NUMBER(<base>) + ' : ''}TO_NUMBER({$.agg})`
);

addWidgetType(
	'boolean',
	types.boolean,
	(withBase) => `${withBase ? '<base> && ' : ''}TO_BOOLEAN({$.agg})`
);

addWidgetType('numericResource', types.numericResource, (withBase) => ({
	max: `TO_NUMBER({$.agg})${withBase ? ' + TO_NUMBER(<base>)' : ''}`,
	current: `TO_NUMBER({$.agg})${withBase ? ' + TO_NUMBER(<base>)' : ''} - 1`,
}));

addWidgetType('stat', types.stat, (withBase) => ({
	base: `TO_NUMBER({$.agg})${withBase ? ' + TO_NUMBER(<base>)' : ''}`,
	bonus: `TO_NUMBER({$.agg})${withBase ? ' + TO_NUMBER(<base>)' : ''} - 1`,
}));

addWidgetType(
	'select',
	types.choice,
	(withBase) => ({
		options: 'TO_OPTIONS_FROM_STRINGS([{$.agg}])',
		selectedOption: `TO_OPTIONS_FROM_STRINGS([{$.agg}${
			withBase ? ' + (<base> ? (" " + <base>.displayValue) : "")' : ''
		}])[0]`,
	}),
	['A', 'B', 'C']
);

addWidgetType(
	'multiSelect',
	types.multiChoice,
	(withBase) => ({
		options: 'TO_OPTIONS_FROM_STRINGS(SPLIT(",", {$.agg}))',
		selectedOptions: `[...TO_OPTIONS_FROM_STRINGS(SPLIT(",", {$.agg}))${
			withBase ? ', ...(<base> || [])' : ''
		}]`,
	}),
	['A', 'B', 'C']
);

addWidgetType<EntityAggregation>(
	'entity',
	(info) => types.entity(characterClassEntity, info),
	() => ({
		availableEntityIds: '[({$.agg} || "1"), "1", "2", "3"]',
		entity: 'TO_ENTITY_FROM_ID({$.agg})',
	})
);

addWidgetType<MultiEntityAggregation>(
	'multiEntity',
	(info) => types.multiEntity(characterClassEntity, info),
	(withBase) => ({
		availableEntityIds:
			'[...TRIM_ALL(SPLIT(",", {$.agg} || "1")), "1", "2", "3"]',
		entities: `[
				...TO_ENTITIES_FROM_IDS(
					TRIM_ALL(
						SPLIT(",", {$.agg} || "1")
					)
				)${withBase ? ',...(<base> || [])' : ''}
			]`,
	})
);

export const aggregationAuditSchema = types.object({
	agg: types.string({ title: 'Aggregate Value' }),
	...schemaParts,
});

export const aggregationAuditLayout = uiLayout;

function addWidgetType<TAggregateShape>(
	name: string,
	type: (
		info?: DisplayInfoWithEnum<TAggregateShape>
	) => CampaignBuddySchema<TAggregateShape>,
	formAggregate: (withBase: boolean) => TAggregateShape,
	options?: string[]
) {
	schemaParts[name] = types.object({
		base: type({ title: `${name}Base`, options }),
		aggregateEditable: type({
			title: `${name}AggregateEditable`,
			aggregate: formAggregate(true),
			options,
		}),
		aggregateNonEditable: type({
			title: `${name}AggregateNonEditable`,
			aggregate: formAggregate(false),
			options,
		}),
	});

	uiLayout.push(
		{
			kind: 'whiteSpace',
			marginBottom: 16,
		},
		[
			[
				`${name}.base`,
				`${name}.aggregateEditable`,
				`${name}.aggregateNonEditable`,
			],
		]
	);
}
