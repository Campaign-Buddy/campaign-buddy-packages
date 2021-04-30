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
	
	&.bp3-minimal {
		outline: none;
	}

	&.bp3-minimal:focus {
		box-shadow: 0 0 0 1px #137cbd, 0 0 0 3px rgb(19 124 189 / 30%), inset 0 1px 1px rgb(16 22 26 / 20%);
	}

	&.bp3-minimal:hover {
		background-color: rgba(228, 222, 210, .7);
	}

	&.bp3-minimal:active {
		background-color: rgba(228, 222, 210, .9);
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
