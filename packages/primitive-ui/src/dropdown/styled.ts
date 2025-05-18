import styled from 'styled-components';

export const ReferenceContainer = styled.div`
	display: inline-block;
`;

export const DropdownContentContainer = styled.div`
	box-shadow: ${({ theme }) => theme.shadows.dropdown.toCss()};
	padding: ${({ theme }) => theme.sizes.uiContentPadding.medium.toCss()};
	background-color: ${({ theme }) => theme.colors.background.dropdown};
	border-radius: ${({ theme }) => theme.borderRadii.default.toCss()};
`;
