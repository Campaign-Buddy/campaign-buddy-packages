import { EntityDefinition } from './EntityDefinition';
import { Widgets } from './Widgets';
import { CampaignBuddySchema } from './CampaignBuddySchema';

interface DisplayInfo {
	title: string;
	description?: string;
}

type CBSchemaFunc = (info?: DisplayInfo) => CampaignBuddySchema;

/* Primitive Types */

export const string: CBSchemaFunc = (info) => ({
	type: 'string',
	title: info?.title,
	description: info?.description,
});

export const boolean: CBSchemaFunc = (info) => ({
	type: 'boolean',
	title: info?.title,
	description: info?.description,
});

export const number: CBSchemaFunc = (info) => ({
	type: 'number',
	title: info?.title,
	description: info?.description,
});

/**
 * Numeric resources are properties that have a maximum value
 * and can be spent or regained over time (e.g. health, spell slots
 * bardic inspirations).
 */
export const numericResource: CBSchemaFunc = (info) => ({
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
		}
	}
})

export const genericObject: CBSchemaFunc = (info) => ({
	type: 'object',
	title: info?.title,
	description: info?.description,
});

export const dynamicallyResolvedType: (expression: string, info?: DisplayInfo) => CampaignBuddySchema = (expression, info) => ({
	type: 'object',
	$dynamicTypeExpression: expression,
	title: info?.title,
	description: info?.description,
});

// TODO: Actually return a schema representing a CampaignBuddySchema
export const schema: CBSchemaFunc = (info) => ({
	type: 'object',
	$uiWidget: Widgets.SchemaBuilder,
	title: info?.title,
	description: info?.description,
})

export const object: (object: { [k: string]: CampaignBuddySchema }) => CampaignBuddySchema = (object) => ({
	type: 'object',
	properties: object,
});

/* Complex Types */

export const entity: (entity: EntityDefinition, info?: DisplayInfo) => CampaignBuddySchema = (object, info) => ({
	type: 'object',
	$entity: object.name,
	$uiWidget: Widgets.EntityPicker,
	title: info?.title,
	description: info?.description,
});

export const stat: CBSchemaFunc = (info) => ({
	type: 'number',
	$uiWidget: Widgets.Stat,
	title: info?.title,
	description: info?.description,
});

export const richText: CBSchemaFunc = (info) => ({
	type: 'object',
	properties: {
		html: string,
		plain: string,
	},
	$uiWidget: Widgets.RichText,
	title: info?.title,
	description: info?.description,
});

export const icon: CBSchemaFunc = (info) => ({
	type: 'object',
	properties: {
		url: string,
	},
	$uiWidget: Widgets.Icon,
	title: info?.title,
	description: info?.description,
});

const _arrayOf: (object: CampaignBuddySchema, info?: DisplayInfo) => CampaignBuddySchema = (object, info) => ({
	type: 'array',
	items: object,
	title: info?.title,
	description: info?.description,
	$uiWidget: object.$uiWidget,
});

export const arrayOf = {
	numbers: (info?: DisplayInfo) => _arrayOf(number(), info),
	strings: (info?: DisplayInfo) => _arrayOf(string(), info),
	booleans: (info?: DisplayInfo) => _arrayOf(boolean(), info),
	objects: (obj: { [k: string]: CampaignBuddySchema }, info?: DisplayInfo) => _arrayOf(object(obj), info),
	entities: (ent: EntityDefinition, info?: DisplayInfo) => _arrayOf(entity(ent), info),
	stats: (info?: DisplayInfo) => _arrayOf(stat(), info),
	richTexts: (info?: DisplayInfo) => _arrayOf(richText(), info),
	genericObjects: (info?: DisplayInfo) => _arrayOf(genericObject(), info),
	numericResources: (info?: DisplayInfo) => _arrayOf(numericResource(), info),
	custom: (obj: CampaignBuddySchema, info?: DisplayInfo) => _arrayOf(obj, info),
};

export const choice: (obj: CampaignBuddySchema, info?: DisplayInfo) => CampaignBuddySchema = (obj, info) => ({
	type: 'object',
	properties: {
		name: string,
		value: obj,
	},
	$uiWidget: Widgets.Select,
	title: info?.title,
	description: info?.description,
})

export const multiChoice: (obj: CampaignBuddySchema, info?: DisplayInfo) => CampaignBuddySchema = (obj, info) => ({
	type: 'object',
	properties: {
		selected: _arrayOf(obj, info),
		options: arrayOf.custom(choice(obj, info), info),
		maxChoices: number,
	},
	$uiWidget: Widgets.MultiSelect,
	title: info?.title,
	description: info?.description,
});
