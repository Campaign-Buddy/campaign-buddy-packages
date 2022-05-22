import React from 'react';
import { Popover2 as PopoverCore, Placement } from '@blueprintjs/popover2';
import styled, { createGlobalStyle } from 'styled-components';
import { defaultTheme } from '../theme';

const StyledPopoverCore = styled(PopoverCore)`
	max-width: 100%;
`;

const GlobalStyle = createGlobalStyle`
	.bp-overrides-popover .bp3-popover2-content {
		padding: 8px;
		background-color: ${({ theme }) =>
			theme.legacyCoreUi.colors.background} !important;
	}

	.bp-overrides-popover {
		margin: 4px;

		&.no-margin {
			margin: 0 !important;
		}
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
	noMargin?: boolean;
	className?: string;
}

const popoverModifiers = {
	offset: {
		enabled: true,
		options: {
			offset: [0, 8],
		},
	},
};

export const Popover: React.FC<React.PropsWithChildren<PopoverProps>> = ({
	children,
	content,
	isOpen,
	onClose,
	placement,
	autoFocus,
	noMargin,
	className,
}) => {
	return (
		<>
			<GlobalStyle />
			<StyledPopoverCore
				content={<div>{content}</div>}
				isOpen={isOpen}
				onClose={onClose}
				minimal
				modifiers={popoverModifiers as any}
				popoverClassName={`bp-overrides-popover${noMargin ? ' no-margin' : ''}`}
				placement={placement}
				openOnTargetFocus={false}
				enforceFocus={false}
				autoFocus={autoFocus}
				className={className}
			>
				{children}
			</StyledPopoverCore>
		</>
	);
};
