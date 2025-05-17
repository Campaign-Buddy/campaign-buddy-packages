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
	color: ${({ theme }) => theme.colors.primaryText.onBackground};
	width: fit-content;
	background-color: ${({ theme }) => theme.colors.background.panel};
	border-radius: ${({ theme }) => theme.borderRadii.default.toCss()};
	opacity: 0.75;
	padding: ${({ theme }) => theme.sizes.uiInputPadding.medium.toCss()};
`;
