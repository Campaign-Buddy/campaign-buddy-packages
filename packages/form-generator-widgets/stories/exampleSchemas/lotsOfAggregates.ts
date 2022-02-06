import {
	CampaignBuddySchema,
	DisplayInfoWithEnum,
	types,
	UiLayout,
} from '@campaign-buddy/json-schema-core';

const schemaParts: Record<string, CampaignBuddySchema> = {};
const uiLayout: UiLayout = [['agg']];

addExample(
	'select',
	types.choice,
	(withBase) => ({
		options: 'TO_OPTIONS_FROM_STRINGS([{$.agg}])',
		selectedOption: withBase
			? 'TO_OPTIONS_FROM_STRINGS([(<base> ? <base>.selectedOption.displayValue : "") + {$.agg}])[0]'
			: 'TO_OPTIONS_FROM_STRINGS([{$.agg}])[0]',
	}),
	['A', 'B', 'C']
);

addExample(
	'string',
	types.string,
	(withBase) => `${withBase ? '(<base> || "") + " " + ' : ''}{$.agg}`
);

export const lotsOfAggregatesSchema = types.object({
	agg: types.string({ title: 'Aggregate Value' }),
	...schemaParts,
});

export const lotsOfAggregatesLayout = uiLayout;

function addExample<TAggregateShape>(
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
		[[name]]
	);
}
