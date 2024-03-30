import { DropShadow } from '../types';

export const focusShadow: DropShadow = new DropShadow([
	'0 0 0 1px #137cbd',
	'0 0 0 3px rgb(19 124 189 / 30%)',
	'inset 0 1px 1px rgb(16 22 26 / 20%)',
]);

export const maroonShadow: DropShadow = new DropShadow([
	'inset 0 0 0 1px rgba(17, 20, 24, 0.2)',
	'0 1px 2px rgba(17, 20, 24, 0.1)',
]);

export const maroonDarkShadow: DropShadow = new DropShadow([
	'inset 0px 0px 0px 1px rgba(46, 35, 33, 0.20)',
	'inset 0px 1px 1px 0px rgba(0, 0, 0, 0.25)',
]);

export const grayShadow: DropShadow = new DropShadow([
	'inset 0px 0px 0px 1px rgba(46, 35, 33, 0.20)',
]);

export const buttonShadow: DropShadow = new DropShadow([
	'inset 0 -1px 1px 0 rgba(0, 0, 0, 0.20)',
	'inset 0 0 0 1px rgba(46, 35, 33, 0.20)',
]);

export const buttonShadowActive: DropShadow = new DropShadow([
	'inset 0 1px 1px 0 rgba(0, 0, 0, 0.25)',
	'inset 0 0 0 1px rgba(46, 35, 33, 0.20)',
]);

export const buttonShadowDisabled: DropShadow = grayShadow;

export const menuShadow: DropShadow = new DropShadow([
	'0 0 0 1px rgba(67, 63, 54, 0.08)',
	'0 8px 24px 0 rgba(67, 63, 54, 0.35)',
	'0 2px 4px 0 rgba(67, 63, 54, 0.20)',
]);
