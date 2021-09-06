import { EntityDefinition } from './EntityDefinition';
import { Widgets } from './Widgets';
import { CampaignBuddySchema } from './CampaignBuddySchema';

interface DisplayInfo<TAggregateShape = string> {
	title: string;
	description?: string;
	cols?: number;
	aggregate?: TAggregateShape;
}

type CBSchemaFunc<TAggregateShape = string> = (
	info?: DisplayInfo<TAggregateShape>
) => CampaignBuddySchema<TAggregateShape>;

/* Primitive Types */

export const string: CBSchemaFunc = (info) => ({
	type: 'string',
	title: info?.title,
	description: info?.description,
	$uiCols: info?.cols,
	$aggregate: info?.aggregate,
});

export const boolean: CBSchemaFunc = (info) => ({
	type: 'boolean',
	title: info?.title,
	description: info?.description,
	$uiCols: info?.cols,
	$aggregate: info?.aggregate,
});

export const number: CBSchemaFunc = (info) => ({
	type: 'number',
	title: info?.title,
	description: info?.description,
	$uiCols: info?.cols,
	$aggregate: info?.aggregate,
});

interface NumericResourceAggregate {
	max?: string;
	current?: string;
}

/**
 * Numeric resources are properties that have a maximum value
 * and can be spent or regained over time (e.g. health, spell slots,
 * bardic inspirations).
 */
export const numericResource: CBSchemaFunc<NumericResourceAggregate> = (
	info
) => ({
	type: 'object',
	title: info?.title,
	description: info?.description,
	$uiWidget: Widgets.NumericResource,
	properties: {
		max: {
			type: 'number',
		},
		current: {
			type: 'number',
		},
	},
	$uiCols: info?.cols,
	$aggregate: info?.aggregate,
});

export const genericObject: CBSchemaFunc<never> = (info) => ({
	type: 'object',
	title: info?.title,
	description: info?.description,
	$uiCols: info?.cols,
});

export const dynamicallyResolvedType: (
	expression: string,
	info?: DisplayInfo
) => CampaignBuddySchema<any> = (expression, info) => ({
	type: 'object',
	$dynamicTypeExpression: expression,
	title: info?.title,
	description: info?.description,
	$uiCols: info?.cols,
});

// TODO: Actually return a schema representing a CampaignBuddySchema
export const schema: CBSchemaFunc<never> = (info) => ({
	type: 'object',
	$uiWidget: Widgets.SchemaBuilder,
	title: info?.title,
	description: info?.description,
	$uiCols: info?.cols,
});

export const object: (object: {
	[k: string]: CampaignBuddySchema<any>;
}) => CampaignBuddySchema<never> = (object) => ({
	type: 'object',
	properties: object,
});

/* Complex Types */

export const entity: (
	entity: EntityDefinition,
	info?: DisplayInfo<never>
) => CampaignBuddySchema<never> = (object, info) => ({
	type: 'object',
	$entity: object.name,
	$uiWidget: Widgets.EntityPicker,
	title: info?.title,
	description: info?.description,
	$uiCols: info?.cols,
});

interface StatAggregation {
	base?: string;
	bonus?: string;
}

export const stat: CBSchemaFunc<StatAggregation> = (info) => ({
	type: 'object',
	properties: {
		base: number(),
		bonus: number(),
	},
	$uiWidget: Widgets.Stat,
	title: info?.title,
	description: info?.description,
	$uiCols: info?.cols,
	$aggregate: info?.aggregate,
});

export const richText: CBSchemaFunc<never> = (info) => ({
	type: 'object',
	properties: {
		html: string(),
		plain: string(),
	},
	$uiWidget: Widgets.RichText,
	title: info?.title,
	description: info?.description,
	$uiCols: info?.cols,
});

interface IconAggregation {
	url?: string;
}

export const icon: CBSchemaFunc<IconAggregation> = (info) => ({
	type: 'object',
	properties: {
		url: string(),
	},
	$uiWidget: Widgets.Icon,
	title: info?.title,
	description: info?.description,
	$uiCols: info?.cols,
	$aggregate: info?.aggregate,
});

const _arrayOf: (
	object: CampaignBuddySchema<any>,
	info?: DisplayInfo<string>
) => CampaignBuddySchema<string> = (object, info) => ({
	type: 'array',
	items: object,
	title: info?.title,
	description: info?.description,
	$uiWidget: object.$uiWidget,
	$uiCols: info?.cols ?? object?.cols,
	$aggregate: info?.aggregate,
});

export const arrayOf = {
	numbers: (info?: DisplayInfo) => _arrayOf(number(), info),
	strings: (info?: DisplayInfo) => _arrayOf(string(), info),
	booleans: (info?: DisplayInfo) => _arrayOf(boolean(), info),
	objects: (obj: { [k: string]: CampaignBuddySchema }, info?: DisplayInfo) =>
		_arrayOf(object(obj), info),
	entities: (ent: EntityDefinition, info?: DisplayInfo) =>
		_arrayOf(entity(ent), info),
	stats: (info?: DisplayInfo) => _arrayOf(stat(), info),
	richTexts: (info?: DisplayInfo) => _arrayOf(richText(), info),
	genericObjects: (info?: DisplayInfo) => _arrayOf(genericObject(), info),
	numericResources: (info?: DisplayInfo) => _arrayOf(numericResource(), info),
	custom: (obj: CampaignBuddySchema<any>, info?: DisplayInfo<any>) =>
		_arrayOf(obj, info),
};

interface ChoiceAggregation {
	name?: string;
	value?: string;
}

export const choice: (
	obj: CampaignBuddySchema<any>,
	info?: DisplayInfo<ChoiceAggregation>
) => CampaignBuddySchema<ChoiceAggregation> = (obj, info) => ({
	type: 'object',
	properties: {
		name: string(),
		value: obj,
	},
	$uiWidget: Widgets.Select,
	title: info?.title,
	description: info?.description,
	$uiCols: info?.cols,
	$aggregate: info?.aggregate,
});

interface MultiChoiceAggregation {
	selected?: string;
	options?: string;
	maxChoices?: string;
}

export const multiChoice: (
	obj: CampaignBuddySchema<any>,
	info?: DisplayInfo<MultiChoiceAggregation>
) => CampaignBuddySchema<MultiChoiceAggregation> = (obj, info) => ({
	type: 'object',
	properties: {
		selected: _arrayOf(obj),
		options: arrayOf.custom(choice(obj)),
		maxChoices: number(),
	},
	$uiWidget: Widgets.MultiSelect,
	title: info?.title,
	description: info?.description,
	$uiCols: info?.cols,
	$aggregate: info?.aggregate,
});
