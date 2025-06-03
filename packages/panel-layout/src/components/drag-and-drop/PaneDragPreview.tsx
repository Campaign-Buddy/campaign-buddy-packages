import React from 'react';
import styled from 'styled-components';
import { TabIcon } from '../tab-icon';
import type { PaneDragItem } from './PaneDragItem';
import { backgroundColor, themed } from '@campaign-buddy/theme-util';

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
	color: ${themed.colors.primaryText.onBackground};
	width: fit-content;
	${backgroundColor(themed.colors.background.panel)}
	border-radius: ${themed.borderRadii.default};
	opacity: 0.75;
	padding: ${themed.sizes.uiInputPadding.medium};
`;
