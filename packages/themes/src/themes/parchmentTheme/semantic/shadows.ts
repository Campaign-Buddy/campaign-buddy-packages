import { focusShadow } from '../../../palette/shadows';
import { DropShadow } from '../../../types';
import { SemanticDropShadows } from '../../../types/SemanticDropShadows';

export const shadows: SemanticDropShadows = {
	raised: {
		default: new DropShadow([
			{
				inset: true,
				color: 'rgba(0,0,0,0.25)',
				xOffset: 0,
				yOffset: -1,
				blurRadius: 1,
				spreadRadius: 0,
			},
			{
				inset: true,
				color: 'rgba(46, 35, 33, .20)',
				xOffset: 0,
				yOffset: 0,
				blurRadius: 0,
				spreadRadius: 1,
			},
		]),
		hover: new DropShadow([
			{
				inset: true,
				color: 'rgba(0,0,0,0.25)',
				xOffset: 0,
				yOffset: -1,
				blurRadius: 1,
				spreadRadius: 0,
			},
			{
				inset: true,
				color: 'rgba(46, 35, 33, .20)',
				xOffset: 0,
				yOffset: 0,
				blurRadius: 0,
				spreadRadius: 1,
			},
		]),
		active: new DropShadow([
			{
				inset: true,
				color: 'rgba(0,0,0,0.25)',
				xOffset: 0,
				yOffset: 1,
				blurRadius: 1,
				spreadRadius: 0,
			},
			{
				inset: true,
				color: 'rgba(46, 35, 33, .20)',
				xOffset: 0,
				yOffset: 0,
				blurRadius: 0,
				spreadRadius: 1,
			},
		]),
		disabled: new DropShadow({
			inset: true,
			color: 'rgba(46, 35, 33, .20)',
			xOffset: 0,
			yOffset: 0,
			blurRadius: 0,
			spreadRadius: 1,
		}),
		focused: focusShadow,
	},
	inset: {
		default: new DropShadow([
			{
				inset: true,
				color: 'rgba(17, 20, 24, 0.20)',
				xOffset: 0,
				yOffset: 1,
				blurRadius: 1,
				spreadRadius: 0,
			},
			{
				inset: true,
				color: 'rgba(17, 20, 24, 0.20)',
				xOffset: 0,
				yOffset: 0,
				blurRadius: 0,
				spreadRadius: 1,
			},
		]),
		hover: new DropShadow([
			{
				inset: true,
				color: 'rgba(17, 20, 24, 0.20)',
				xOffset: 0,
				yOffset: 1,
				blurRadius: 1,
				spreadRadius: 0,
			},
			{
				inset: true,
				color: 'rgba(17, 20, 24, 0.20)',
				xOffset: 0,
				yOffset: 0,
				blurRadius: 0,
				spreadRadius: 1,
			},
		]),
		active: new DropShadow([
			{
				inset: true,
				color: 'rgba(17, 20, 24, 0.20)',
				xOffset: 0,
				yOffset: 1,
				blurRadius: 1,
				spreadRadius: 0,
			},
			{
				inset: true,
				color: 'rgba(17, 20, 24, 0.20)',
				xOffset: 0,
				yOffset: 0,
				blurRadius: 0,
				spreadRadius: 1,
			},
		]),
		focused: focusShadow,
		disabled: new DropShadow([
			{
				inset: true,
				color: 'rgba(17, 20, 24, 0.20)',
				xOffset: 0,
				yOffset: 1,
				blurRadius: 1,
				spreadRadius: 0,
			},
			{
				inset: true,
				color: 'rgba(17, 20, 24, 0.20)',
				xOffset: 0,
				yOffset: 0,
				blurRadius: 0,
				spreadRadius: 1,
			},
		]),
	},
	dropdown: new DropShadow([
		'0 0 0 1px rgba(67, 63, 54, 0.08)',
		'0 8px 24px 0 rgba(67, 63, 54, 0.35)',
		'0 2px 4px 0 rgba(67, 63, 54, 0.20)',
	]),
	none: {
		focused: focusShadow,
	},
};
