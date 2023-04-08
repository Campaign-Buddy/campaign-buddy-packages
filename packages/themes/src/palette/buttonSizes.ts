import { IButtonSizing, ISizedButtons } from '../components';
import { BorderRadius, Thickness } from '../types';

export const buttonSizes: Record<keyof ISizedButtons, IButtonSizing> = {
	small: {
		padding: new Thickness('0 7'),
		height: 24,
		minWidth: 24,
		fontSize: 14,
		borderRadius: new BorderRadius(2),
	},
	normal: {
		padding: new Thickness('5 10'),
		height: 30,
		minWidth: 30,
		fontSize: 14,
		borderRadius: new BorderRadius(2),
	},
	large: {
		padding: new Thickness('5 15'),
		height: 40,
		minWidth: 40,
		fontSize: 16,
		borderRadius: new BorderRadius(2),
	},
};
