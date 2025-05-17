import styled from 'styled-components';

export const IconContainer = styled.div`
	margin-right: ${({ theme }) => theme.sizes.gaps.medium};
	display: flex;
`;

export const ImageIcon = styled.img`
	width: ${({ theme }) => theme.sizes.uiHeights.extraSmall}px;
	height: ${({ theme }) => theme.sizes.uiHeights.extraSmall}px;
	object-fit: contain;
`;
