import { ISelect } from '../../../components/select';
import {
	parchment,
	parchmentInputBackground,
	parchmentText,
} from '../../../palette';
import { menuShadow } from '../../../palette/shadows';
import { Thickness } from '../../../types';

export const select: ISelect = {
	backgroundColor: parchmentInputBackground,
	textColor: parchmentText,
	menu: {
		dropShadow: menuShadow,
		padding: new Thickness(4),
		backgroundColor: parchment,
	},
};
