import React from 'react';
import styled from 'styled-components';

interface FlexProps {
	justifyContent?: React.CSSProperties['justifyContent'];
	alignItems?: React.CSSProperties['alignItems'];
	gap?: number;
}

export const Flex = styled.div<FlexProps>`
	display: flex;
	${({ justifyContent }) =>
		justifyContent && `justify-content: ${justifyContent};`}
	${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
	${({ gap }) => gap && `gap: ${gap}px;`}
`;
