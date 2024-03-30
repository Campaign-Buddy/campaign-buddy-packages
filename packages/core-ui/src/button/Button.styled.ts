import styled, { css } from 'styled-components';
import { IButton } from '@campaign-buddy/themes';
import { defaultTheme } from '../theme';
import { getButtonStyles } from '../utility';

export type ButtonStyle = 'primary' | 'minimal';

export const RightIconContainer = styled.span`
	margin-left: auto;
`;

export const baseButtonStyles = css`
	${({ theme }) => getButtonStyles(theme.buttons.primary.normal)}
`;

export const StyledButton = styled.button<{
	variant?: ButtonStyle | IButton;
	size?: 'large' | 'small' | 'normal';
	fill?: boolean;
}>`
	${({ variant, theme, size }) => {
		return typeof variant === 'string' || !variant
			? getButtonStyles(theme.buttons[variant ?? 'primary'][size ?? 'normal'])
			: getButtonStyles(variant);
	}}

	${({ fill }) => fill && 'width: 100%;'}
`;

StyledButton.defaultProps = {
	theme: defaultTheme,
};

export const StyledToggleButton = styled(StyledButton)<{ isActive: boolean }>`
	color: ${({ isActive, theme }) =>
		isActive
			? theme.legacyCoreUi.colors.text
			: theme.legacyCoreUi.colors.textDisabled} !important;

	&:active,
	&:focus,
	&:hover {
		color: ${({ isActive, theme }) =>
			isActive
				? theme.legacyCoreUi.colors.text
				: theme.legacyCoreUi.colors.textDisabled} !important;
		--cb-icon-color: ${({ isActive, theme }) =>
			isActive
				? theme.legacyCoreUi.colors.text
				: theme.legacyCoreUi.colors.textDisabled};
	}
`;
