import { ISelect } from '../../../components/select';
import { makeButton } from '../../../palette';
import { buttonSizes } from '../../../palette/buttonSizes';
import { colors } from '../semantic/colors';
import { shadows } from '../semantic/shadows';
import { sizes } from '../semantic/sizes';

export const select: ISelect = {
	backgroundColor: colors.input.default,
	textColor: colors.primaryText.onInput.default,
	menu: {
		dropShadow: shadows.dropdown,
		padding: sizes.uiContentPadding.small,
		backgroundColor: colors.background.panel,
	},
	button: makeButton({
		text: colors.primaryText.onInput.default,
		background: colors.input,
		border: shadows.raised,
		disabledText: colors.secondaryText.onInput.default,
		sizing: buttonSizes.normal,
	}),
};
