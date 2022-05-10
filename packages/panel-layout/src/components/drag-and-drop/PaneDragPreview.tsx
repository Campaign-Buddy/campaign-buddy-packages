import React from 'react';
import styled from 'styled-components';
import { defaultTabStyles } from '../panel/TabBar.styled';
import { PaneDragItem } from './PaneDragItem';

interface PaneDragPreviewProps {
	dragItem: PaneDragItem;
}

export const PaneDragPreview: React.FC<PaneDragPreviewProps> = ({
	dragItem,
}) => {
	return <TabPreview>{dragItem.tabName}</TabPreview>;
};

const TabPreview = styled.div`
	${defaultTabStyles}
	width: fit-content;
`;
