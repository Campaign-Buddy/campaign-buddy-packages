import styled, { css } from 'styled-components';
import { EditableText } from '@blueprintjs/core';
import { ContextMenu } from '../menu';

export const listItemClass = 'CB_CORE_UI_LIST_ITEM';

const listStyle = css`
	list-style: none;
	padding: 0;
	margin: 0;
`;

export const EditableTextContainer = styled.div`
	width: 100%;
	max-width: 100%;
	min-width: 0;
	flex-grow: 1;

	& > div {
		max-width: 100%;
	}
`;

export const StyledEditableText = styled(EditableText)`
	&:before {
		background-color: transparent !important;
	}
`;

export const StyledUnorderedList = styled.ul`
	${listStyle}
`;

export const StyledOrderedList = styled.ol`
	${listStyle}
`;

interface StyledListItemProps {
	isInteractive?: boolean;
	disabled?: boolean;
}

const disabledIconStyle = css`
	.bp4-icon {
		color: ${({ theme }) => theme.legacyCoreUi.colors.textDisabled};
	}
`;

const listItemStyle = css<StyledListItemProps>`
	display: flex;
	align-items: center;
	overflow: hidden;
	height: ${({ theme }) =>
		theme.list.item.lineHeight + theme.list.item.padding.vertical}px;
	gap: ${({ theme }) => theme.list.item.spacing}px;
	padding: ${({ theme }) => theme.list.item.padding.toCss()};
	border-radius: ${({ theme }) => theme.list.item.borderRadius.toCss()};

	color: ${({ theme, disabled }) =>
		disabled ? theme.legacyCoreUi.colors.textDisabled : theme.textColor};

	${({ disabled }) => disabled && disabledIconStyle}

	${({ theme, isInteractive }) =>
		theme.list.item.backgroundColors.map(
			(colors, index, allColors) => `
			:nth-child(${allColors.length}n + ${index + 1}) {
				background-color: ${colors.normal};

				${
					isInteractive &&
					`
					&:hover {
						background-color: ${colors.hover};
					}

					&:focus {
						background-color: ${colors.focus};
					}
	
					&:active {
						background-color: ${colors.active};
					}
					`
				}
			}
		`
		)}

	${({ isInteractive }) =>
		isInteractive &&
		`
		cursor: pointer;
		user-select: none;
	`}
`;

export const StyledContextMenuListItem = styled(
	ContextMenu
)<StyledListItemProps>`
	${listItemStyle}
`;

export const StyledListItem = styled.li<StyledListItemProps>`
	${listItemStyle}
`;

export const StyledListItemText = styled.span`
	width: 100%;
	flex-grow: 1;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;
