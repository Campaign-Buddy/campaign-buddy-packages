import styled, { css } from 'styled-components';

const listStyle = css`
	list-style: none;
	padding: 0;
	margin: 0;
`;

export const StyledUnorderedList = styled.ul`
	${listStyle}
`;

export const StyledOrderedList = styled.ol`
	${listStyle}
`;

export const StyledListItem = styled.li`
	display: flex;
	gap: ${({ theme }) => theme.list.item.spacing}px;
	padding: ${({ theme }) => theme.list.item.padding.toCss()};
	border-radius: ${({ theme }) => theme.list.item.borderRadius.toCss()};

	${({ theme }) =>
		theme.list.item.backgroundColors.map(
			(color, index, colors) => `
			:nth-child(${colors.length}n + ${index + 1}) {
				background-color: ${color};
			}
		`
		)}
`;

export const StyledListItemText = styled.span`
	color: ${({ theme }) => theme.textColor};
	width: 100%;
	flex-grow: 1;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;
