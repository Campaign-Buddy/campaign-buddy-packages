import React from 'react';
import { Spinner as SpinnerCore } from '@blueprintjs/core';
import styled from 'styled-components';
import { defaultTheme } from '../theme';

const StyledSpinnerCore = styled(SpinnerCore)`
	.bp4-spinner-head {
		stroke: ${({ theme }) => theme.legacyCoreUi.colors.primary} !important;
	}
`;
StyledSpinnerCore.defaultProps = {
	theme: defaultTheme,
};

const FullHeightContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const spinnerSizes = {
	fullPage: 45,
	textInline: 15,
};

export type SpinnerSize = keyof typeof spinnerSizes;

export interface SpinnerProps {
	size: number | SpinnerSize;
	fullHeight?: boolean;
}

export const Spinner: React.FC<React.PropsWithChildren<SpinnerProps>> = ({
	fullHeight,
	size,
}) => {
	const sizeNumber = typeof size === 'number' ? size : spinnerSizes[size];

	if (fullHeight) {
		return (
			<FullHeightContainer>
				<StyledSpinnerCore size={sizeNumber} />
			</FullHeightContainer>
		);
	}

	return <StyledSpinnerCore size={sizeNumber} />;
};
