import React from 'react';
import { Popover2 as PopoverCore, Placement } from '@blueprintjs/popover2';
import { createGlobalStyle } from 'styled-components';
import { defaultTheme } from '../theme';

const GlobalStyle = createGlobalStyle`
	.bp-overrides-popover .bp3-popover2-content {
		padding: 8px;
		background-color: ${({ theme }) => theme.colors.background} !important;
	}

	.bp-overrides-popover {
		margin: 4px;
	}
`;
GlobalStyle.defaultProps = {
	theme: defaultTheme,
};

export interface PopoverProps {
	content: JSX.Element | string;
	isOpen: boolean;
	onClose: () => void;
	placement?: Placement;
	autoFocus?: boolean;
}

const popoverModifiers = {
	offset: {
		enabled: true,
		options: {
			offset: [0, 8],
		},
	},
};

export const Popover: React.FC<PopoverProps> = ({
	children,
	content,
	isOpen,
	onClose,
	placement,
	autoFocus,
}) => {
	return (
		<>
			<GlobalStyle />
			<PopoverCore
				content={<div>{content}</div>}
				isOpen={isOpen}
				onClose={onClose}
				minimal
				modifiers={popoverModifiers as any}
				popoverClassName="bp-overrides-popover"
				placement={placement}
				openOnTargetFocus={false}
				enforceFocus={false}
				autoFocus={autoFocus}
			>
				{children}
			</PopoverCore>
		</>
	);
};
