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

export const StyledListItem = styled.li<{ isInteractive?: boolean }>`
	display: flex;
	gap: ${({ theme }) => theme.list.item.spacing}px;
	padding: ${({ theme }) => theme.list.item.padding.toCss()};
	border-radius: ${({ theme }) => theme.list.item.borderRadius.toCss()};

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
					`
				}

				&:focus {
					background-color: ${colors.focus};
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

export const StyledListItemText = styled.span`
	color: ${({ theme }) => theme.textColor};
	width: 100%;
	flex-grow: 1;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;
