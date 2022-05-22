import React from 'react';
import styled from 'styled-components';
import { PaneDragItem } from './PaneDragItem';

interface PaneDragPreviewProps {
	dragItem: PaneDragItem;
}

export const PaneDragPreview: React.FC<
	React.PropsWithChildren<PaneDragPreviewProps>
> = ({ dragItem }) => {
	return <TabPreview>{dragItem.tabName}</TabPreview>;
};

const TabPreview = styled.div`
	color: ${({ theme }) => theme.textColor};
	width: fit-content;
	background-color: ${({ theme }) =>
		theme.panelLayout.tab.preview.backgroundColor};
	border-radius: ${({ theme }) =>
		theme.panelLayout.tab.preview.borderRadius.toCss()};
	opacity: ${({ theme }) => theme.panelLayout.tab.preview.opacity};
	padding: ${({ theme }) => theme.panelLayout.tab.preview.padding.toCss()};
`;
