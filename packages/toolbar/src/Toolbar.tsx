import React from 'react';
import styled from 'styled-components';
import {
	ToolbarOrientation,
	ToolbarOrientationProvider,
} from './useToolbarOrientation';

const StyledToolbar = styled.nav<{ orientation: ToolbarOrientation }>`
	background-color: ${({ theme }) => theme.toolbar.backgroundColor};
	padding: ${({ theme }) => theme.toolbar.padding.toCss()};
	display: flex;
	flex-direction: ${({ orientation }) =>
		orientation === 'horizontal' ? 'row' : 'column'};
`;

export interface ToolbarProps {
	orientation: ToolbarOrientation;
}

export function Toolbar({
	orientation,
	children,
}: React.PropsWithChildren<ToolbarProps>) {
	return (
		<ToolbarOrientationProvider value={orientation}>
			<StyledToolbar orientation={orientation}>{children}</StyledToolbar>
		</ToolbarOrientationProvider>
	);
}
