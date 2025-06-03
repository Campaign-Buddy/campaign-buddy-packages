import React from 'react';
import styled from 'styled-components';
import { Icon } from '@campaign-buddy/core-ui';
import { DefaultDragPreviewData } from '../types';
import { backgroundColor, themed } from '@campaign-buddy/theme-util';

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
	color: ${themed.colors.primaryText.onBackground};
	width: fit-content;
	${backgroundColor(themed.colors.background.panel)}
	border-radius: ${themed.borderRadii.default};
	opacity: 0.75;
	padding: ${themed.sizes.uiInputPadding.medium};
`;
