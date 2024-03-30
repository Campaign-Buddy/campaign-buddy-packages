import { IButtonSizing, ISizedButtons } from '../components';
import { BorderRadius, Thickness } from '../types';

export const buttonSizes: Record<keyof ISizedButtons, IButtonSizing> = {
	small: {
		padding: new Thickness('0 4'),
		height: 24,
		minWidth: 24,
		fontSize: 14,
		gap: 4,
		borderRadius: new BorderRadius(2),
	},
	normal: {
		padding: new Thickness('0 8'),
		height: 30,
		minWidth: 30,
		fontSize: 14,
		gap: 4,
		borderRadius: new BorderRadius(2),
	},
	large: {
		padding: new Thickness('0 12'),
		height: 40,
		minWidth: 40,
		fontSize: 16,
		gap: 4,
		borderRadius: new BorderRadius(2),
	},
};
