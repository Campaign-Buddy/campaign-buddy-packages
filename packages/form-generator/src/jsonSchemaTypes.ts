import { EntityDefinition } from './EntityDefinition';
import { Widgets } from './Widgets';
import { CampaignBuddySchema } from './CampaignBuddySchema';

/* Primitive Types */

export const string: CampaignBuddySchema = {
	type: 'string',
};

export const boolean: CampaignBuddySchema = {
	type: 'boolean',
};

export const number: CampaignBuddySchema = {
	type: 'number',
};

export const genericObject: CampaignBuddySchema = {
	type: 'object',
};

export const object: (object: { [k: string]: CampaignBuddySchema }) => CampaignBuddySchema = (object) => ({
	type: 'object',
	properties: object,
});

/* Complex Types */

export const entity: (entity: EntityDefinition) => CampaignBuddySchema = (object) => ({
	type: 'object',
	$entity: object.name,
	$uiWidget: Widgets.EntityPicker
});

export const stat: CampaignBuddySchema = {
	type: 'number',
	$uiWidget: Widgets.Stat,
}

export const richText: CampaignBuddySchema = {
	type: 'object',
	properties: {
		html: string,
		plain: string,
	},
	$uiWidget: Widgets.RichText,
}

export const icon: CampaignBuddySchema = {
	type: 'object',
	properties: {
		url: string,
	},
	$uiWidget: Widgets.Icon,
}

const _arrayOf: (object: CampaignBuddySchema) => CampaignBuddySchema = (object) => ({
	type: 'array',
	items: object,
});

export const arrayOf = {
	numbers: _arrayOf(number),
	strings: _arrayOf(string),
	booleans: _arrayOf(boolean),
	objects: (obj: { [k: string]: CampaignBuddySchema }) => _arrayOf(object(obj)),
	entities: (ent: EntityDefinition) => _arrayOf(entity(ent)),
	stats: _arrayOf(stat),
	richTexts: _arrayOf(richText),
	genericObjects: _arrayOf(genericObject),
	custom: (obj: CampaignBuddySchema) => _arrayOf(obj),
};

export const choice: (obj: CampaignBuddySchema) => CampaignBuddySchema = (obj) => ({
	type: 'object',
	properties: {
		name: string,
		value: obj,
	},
	$uiWidget: Widgets.Select,
})

export const multiChoice: (obj: CampaignBuddySchema) => CampaignBuddySchema = (obj) => ({
	type: 'object',
	properties: {
		selected: _arrayOf(obj),
		options: arrayOf.custom(choice(obj)),
		maxChoices: number,
	},
	$uiWidget: Widgets.MultiSelect,
});
