import React from 'react';
import styled from 'styled-components';
import { CampaignBuddyIcon, Icon } from '@campaign-buddy/core-ui';

export interface DefaultDragPreviewProps {
	icon?: CampaignBuddyIcon;
	title: string;
}

export const DefaultDragPreview: React.FC<
	React.PropsWithChildren<DefaultDragPreviewProps>
> = ({ icon, title }) => {
	return (
		<DragPreviewContainer>
			{icon && <Icon icon={icon} />}
			<span>{title}</span>
		</DragPreviewContainer>
	);
};

const DragPreviewContainer = styled.div`
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
