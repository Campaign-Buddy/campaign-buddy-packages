import React from 'react';
import { ElementNodeProps, ParagraphNode as ParagraphNodeType } from '../types';

export const ParagraphNode: React.FC<ElementNodeProps<ParagraphNodeType>> = ({
	attributes,
	children,
}) => {
	return <p {...attributes}>{children}</p>;
};
