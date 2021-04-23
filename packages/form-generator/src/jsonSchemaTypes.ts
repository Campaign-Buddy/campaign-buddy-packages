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
}
