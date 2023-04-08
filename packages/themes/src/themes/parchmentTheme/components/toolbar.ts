import { IToolbar } from '../../../components/toolbar';
import { Thickness } from '../../../types';
import { maroon, parchment, makeButton } from '../../../palette';
import { buttonSizes } from '../../../palette/buttonSizes';

export const toolbar: IToolbar = {
	backgroundColor: maroon,
	padding: new Thickness(8),
	button: makeButton(
		{
			text: parchment,
			background: maroon,
		},
		buttonSizes.normal
	),
};
