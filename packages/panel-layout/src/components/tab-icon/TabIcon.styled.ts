import styled from 'styled-components';

export const IconContainer = styled.div`
	margin-right: ${({ theme }) => theme.sizes.gaps.medium}px;
	display: flex;
`;

export const ImageIcon = styled.img`
	width: ${({ theme }) => theme.sizes.iconSizes.medium}px;
	height: ${({ theme }) => theme.sizes.iconSizes.medium}px;
	object-fit: contain;
`;
