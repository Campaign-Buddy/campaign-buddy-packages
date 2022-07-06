import React from 'react';
import styled from 'styled-components';
import { TabIcon } from '../tab-icon';
import { PaneDragItem } from './PaneDragItem';

interface PaneDragPreviewProps {
	dragItem: PaneDragItem;
}

export const PaneDragPreview: React.FC<
	React.PropsWithChildren<PaneDragPreviewProps>
> = ({ dragItem }) => {
	return (
		<TabPreview>
			<TabIcon tabIcon={dragItem.icon} />
			<span>{dragItem.tabName}</span>
		</TabPreview>
	);
};

const TabPreview = styled.div`
	display: flex;
	color: ${({ theme }) => theme.textColor};
	width: fit-content;
	background-color: ${({ theme }) =>
		theme.panelLayout.tab.preview.backgroundColor};
	border-radius: ${({ theme }) =>
		theme.panelLayout.tab.preview.borderRadius.toCss()};
	opacity: ${({ theme }) => theme.panelLayout.tab.preview.opacity};
	padding: ${({ theme }) => theme.panelLayout.tab.preview.padding.toCss()};
`;
