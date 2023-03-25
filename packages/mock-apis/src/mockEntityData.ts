import { HydratedEntity } from '@campaign-buddy/frontend-types';
import { getRandomString } from './getRandomString';

export const characterClasses: HydratedEntity[] = [
	{
		id: getRandomString(),
		entityData: {
			name: 'Bard',
			description: 'Its a bard',
			bonus: {
				maxHp: 1,
			},
		},
		definitionName: 'characterClass',
	},
	{
		id: getRandomString(),
		entityData: {
			name: 'Fighter',
			description: 'Its a fighter',
			bonus: {
				maxHp: 2,
			},
		},
		definitionName: 'characterClass',
	},
	{
		id: getRandomString(),
		entityData: {
			name: 'Wizard',
			description: 'Its a wizard',
			bonus: {
				maxHp: 3,
			},
		},
		definitionName: 'characterClass',
	},
	{
		id: getRandomString(),
		entityData: {
			name: 'Rouge',
			description: 'Its a rouge',
			bonus: {
				maxHp: 4,
			},
		},
		definitionName: 'characterClass',
	},
	{
		id: getRandomString(),
		entityData: {
			name: 'Potion smith',
			description: 'Its a potion smith',
			bonus: {
				maxHp: 5,
			},
		},
		definitionName: 'characterClass',
	},
	{
		id: getRandomString(),
		entityData: {
			name: 'Sorcerer',
			description: 'Its a sorcerer',
			bonus: {
				maxHp: 6,
			},
		},
		definitionName: 'characterClass',
	},
	{
		id: getRandomString(),
		entityData: {
			name: 'Ranger',
			description: 'Its a ranger',
			bonus: {
				maxHp: 7,
			},
		},
		definitionName: 'characterClass',
	},
	{
		id: getRandomString(),
		entityData: {
			name: 'Paladin',
			description: 'Its a paladin',
			bonus: {
				maxHp: 8,
			},
		},
		definitionName: 'characterClass',
	},
	{
		id: getRandomString(),
		entityData: {
			name: 'Monk',
			description: 'Its a monk',
			bonus: {
				maxHp: 9,
			},
		},
		definitionName: 'characterClass',
	},
	{
		id: getRandomString(),
		entityData: {
			name: 'Cleric',
			description: 'Its a cleric',
			bonus: {
				maxHp: 10,
			},
		},
		definitionName: 'characterClass',
	},
	{
		id: getRandomString(),
		entityData: {
			name: 'Barbarian',
			description: 'Its a barbarian',
			bonus: {
				maxHp: 11,
			},
		},
		definitionName: 'characterClass',
	},
];

export const feats: HydratedEntity[] = [
	{
		id: getRandomString(),
		entityData: {
			name: 'Somewhat beefy',
			description: 'Kinda beefy',
			bonus: {
				maxHp: 1,
			},
		},
		definitionName: 'feat',
	},
	{
		id: getRandomString(),
		entityData: {
			name: 'Pretty beefy',
			description: 'Its pretty beefy',
			bonus: {
				maxHp: 2,
			},
		},
		definitionName: 'feat',
	},
	{
		id: getRandomString(),
		entityData: {
			name: 'Beefy',
			description: "I'd say its beefy",
			bonus: {
				maxHp: 3,
			},
		},
		definitionName: 'feat',
	},
	{
		id: getRandomString(),
		entityData: {
			name: 'Very beefy',
			description: 'Its very beefy',
			bonus: {
				maxHp: 4,
			},
		},
		definitionName: 'feat',
	},
	{
		id: getRandomString(),
		entityData: {
			name: 'SUPER BEEFY',
			description: 'Its a super duper',
			bonus: {
				maxHp: 5,
			},
		},
		definitionName: 'feat',
	},
];
