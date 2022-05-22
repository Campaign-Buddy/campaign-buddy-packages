import React from 'react';
import { Spinner as SpinnerCore } from '@blueprintjs/core';
import styled from 'styled-components';
import { defaultTheme } from '../theme';

const StyledSpinnerCore = styled(SpinnerCore)`
	.bp3-spinner-head {
		stroke: ${({ theme }) => theme.legacyCoreUi.colors.primary} !important;
	}
`;
StyledSpinnerCore.defaultProps = {
	theme: defaultTheme,
};

export interface SpinnerProps {
	size: number;
}

export const Spinner: React.FC<React.PropsWithChildren<SpinnerProps>> = ({
	size,
}) => <StyledSpinnerCore size={size} />;
