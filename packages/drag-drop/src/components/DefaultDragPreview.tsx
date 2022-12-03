import React from 'react';
import styled from 'styled-components';
import { Icon } from '@campaign-buddy/core-ui';
import { DefaultDragPreviewData } from '../types';

export const DefaultDragPreview: React.FC<
	React.PropsWithChildren<DefaultDragPreviewData>
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
