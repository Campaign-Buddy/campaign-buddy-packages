import { IToolbar } from '../../../components/toolbar';
import { Thickness } from '../../../types';
import { makeButton } from '../../../palette';
import { buttonSizes } from '../../../palette/buttonSizes';
import { colors } from '../semantic/colors';
import { shadows } from '../semantic/shadows';

export const toolbar: IToolbar = {
	backgroundColor: colors.primary.default,
	padding: new Thickness(8),
	button: makeButton({
		background: colors.minimal,
		text: colors.primaryText.onPrimary,
		border: shadows.none,
		disabledText: colors.secondaryText.onPrimary,
		sizing: buttonSizes.normal,
	}),
};
