import React from 'react';
import { Tag as TagCore } from '@blueprintjs/core';
import styled from 'styled-components';
import { defaultTheme } from '../theme';

const StyledTagCore = styled(TagCore)`
	background-color: ${({ theme }) => theme.legacyCoreUi.colors.primary};
`;
StyledTagCore.defaultProps = {
	theme: defaultTheme,
};

export const Tag: React.FC = ({ children }) => (
	<StyledTagCore>{children}</StyledTagCore>
);
