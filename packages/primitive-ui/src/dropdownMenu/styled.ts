import { themed } from "@campaign-buddy/theme-util";
import styled from "styled-components";
import { StyledButton } from "../button/styled";

export const ReservedIconSpace = styled.div`
	width: ${themed.sizes.iconSizes.medium};
`;

export const StyledDivider = styled.div`
	border-bottom: ${themed.colors.border} 2px solid;
	margin: ${themed.sizes.uiContentPadding.small};
`;

export const StyledContentContainer = styled.div`
	min-width: 150px;
	display: flex;
	flex-direction: column;
	padding-top: ${({ theme }) => theme.sizes.uiContentPadding.small.top}px;
	padding-bottom: ${({ theme }) => theme.sizes.uiContentPadding.small.bottom}px;
`;

export const StyledMenuButton = styled(StyledButton)`
	width: 100%;
	flex-grow: 1;
	border-radius: 0;

	// Add extra padding for the content of the dropdown, but put it inside the button
	padding-left: ${({ theme, size = 'medium' }) =>
		theme.sizes.uiContentPadding[size].left + theme.sizes.uiContentPadding.small.left}px;
	padding-right: ${({ theme, size = 'medium' }) =>
		theme.sizes.uiContentPadding[size].right + theme.sizes.uiContentPadding.small.right}px;
`;
