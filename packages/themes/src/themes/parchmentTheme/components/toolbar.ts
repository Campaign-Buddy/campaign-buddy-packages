import { IToolbar } from '../../../components/toolbar';
import { Thickness } from '../../../types';
import {
	makeButton,
	maroon,
	parchmentExtraLight,
	transparent,
} from '../../../palette';
import { buttonSizes } from '../../../palette/buttonSizes';

export const toolbar: IToolbar = {
	backgroundColor: maroon,
	padding: new Thickness(8),
	button: makeButton(
		{
			text: parchmentExtraLight,
			background: transparent,
		},
		buttonSizes.normal
	),
};
