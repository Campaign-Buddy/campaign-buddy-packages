import {
	FocusableUiState,
	ISemanticTheme,
	UiState,
} from '@campaign-buddy/themes';
import styled from 'styled-components';

export type ButtonVariant = 'minimal' | 'primary' | 'danger' | 'selected';
export type ButtonSize = 'small' | 'medium' | 'large';

const defaultVariant = 'primary';

export interface StyledButtonProps {
	variant?: ButtonVariant;
	size?: ButtonSize;
	disabled?: boolean;
}

function getBackgroundColor(
	variant: ButtonVariant = defaultVariant,
	theme: ISemanticTheme,
	uiState: UiState
) {
	const semanticColor = variant === 'selected' ? 'primary' : variant;
	return `background-color: ${theme.colors[semanticColor][uiState]};`;
}

function getShadow(
	variant: ButtonVariant = defaultVariant,
	theme: ISemanticTheme,
	uiState: FocusableUiState
) {
	const shadowKind = variant !== 'primary' ? 'none' : 'raised';
	const shadow = theme.shadows[shadowKind][uiState];
	console.log('shadowKind', variant, shadowKind, shadow);

	if (!shadow) {
		return '';
	}

	return `box-shadow: ${shadow.toCss()};`;
}

function getStylesForState(
	variant: ButtonVariant = defaultVariant,
	theme: ISemanticTheme,
	uiState: FocusableUiState
) {
	if (uiState === 'focused') {
		return getShadow(variant, theme, uiState);
	}
	const result: string[] = [
		getBackgroundColor(variant, theme, uiState),
		getShadow(variant, theme, uiState),
	];

	if (uiState === 'disabled') {
		result.push(
			`color: ${theme.colors.secondaryText[getTextLocation(variant)]};`,
			'cursor: not-allowed;'
		);
	}

	return result.join(' ');
}

function getTextLocation(variant: ButtonVariant = defaultVariant) {
	if (variant === 'primary' || variant === 'selected') {
		return 'onPrimary';
	}

	if (variant === 'danger') {
		return 'onDanger';
	}

	return 'onBackground';
}

export const StyledButton = styled.button<StyledButtonProps>`
	display: inline-flex;
	cursor: pointer;
	border-radius: ${({ theme }) => theme.borderRadii.default.toCss()};
	align-items: center;
	border: none;
	min-width: ${({ theme, size = 'medium' }) => theme.sizes.uiHeights[size]}px;
	outline: none;

	padding: ${({ theme, size = 'medium' }) =>
		theme.sizes.uiContentPadding[size].toCss()};
	height: ${({ theme, size = 'medium' }) => theme.sizes.uiHeights[size]}px;
	gap: ${({ theme }) => theme.sizes.gaps.small}px;
	font-size: ${({ theme, size = 'medium' }) => theme.sizes.uiFont[size]}px;

	color: ${({ theme, variant = 'primary' }) =>
		theme.colors.primaryText[getTextLocation(variant)]};
	transition: background-color 0.1s;

	${({ theme, variant }) => getStylesForState(variant, theme, 'default')}

	&:hover {
		${({ theme, variant }) => getStylesForState(variant, theme, 'hover')}
	}

	&:active {
		${({ theme, variant }) => getStylesForState(variant, theme, 'active')}
	}

	&:focus {
		${({ theme, variant }) => getStylesForState(variant, theme, 'focused')}
	}

	${({ theme, variant, disabled }) =>
		disabled && getStylesForState(variant, theme, 'disabled')}

	&:disabled {
		${({ theme, variant }) => getStylesForState(variant, theme, 'disabled')}
	}
`;

export const RightIconContainer = styled.span`
	margin-left: auto;
	display: inline-flex;
	align-items: center;
`;
