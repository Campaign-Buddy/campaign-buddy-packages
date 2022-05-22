import React from 'react';
import styled from 'styled-components';
import { ElementNodeProps, ParagraphNode as ParagraphNodeType } from '../types';

export const ParagraphNode: React.FC<
	React.PropsWithChildren<ElementNodeProps<ParagraphNodeType>>
> = ({ attributes, children }) => {
	return <Paragraph {...attributes}>{children}</Paragraph>;
};

const Paragraph = styled.p`
	margin: 8px 0;
`;
