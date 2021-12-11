import React from 'react';
import styled from 'styled-components';

interface FlexProps {
	justifyContent?: React.CSSProperties['justifyContent'];
	alignItems?: React.CSSProperties['alignItems'];
}

export const Flex = styled.div<FlexProps>`
	display: flex;
	${({ justifyContent }) =>
		justifyContent && `justify-content: ${justifyContent};`}
	${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
`;
