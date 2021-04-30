import React from 'react';
import styled from 'styled-components';
import { Button as ButtonCore, IconName } from '@blueprintjs/core';
import { defaultTheme } from '../theme';

type ButtonStyle = 'primary' | 'minimal';

interface ButtonProps {
	icon?: IconName;
	onClick: () => void;
	style?: ButtonStyle;
}

const StyledButton = styled(ButtonCore)`
	color: ${({ theme }) => theme.colors.text};

	& .bp3-icon {
		color: ${({ theme }) => theme.colors.text} !important;
	}
`;

StyledButton.defaultProps = {
	theme: defaultTheme,
}

export const Button: React.FC<ButtonProps> = ({ icon, onClick, children, style }) => (
	<StyledButton
		icon={icon}
		onClick={onClick}
		minimal={style === 'minimal'}
	>
		{children}
	</StyledButton>
)
