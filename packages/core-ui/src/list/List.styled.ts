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
	padding: ${({ theme }) => theme.list.item.padding.toCss()};

	${({ theme }) =>
		theme.list.item.backgroundColors.map(
			(color, index, colors) => `
			:nth-child(${colors.length}n + ${index + 1}) {
				background-color: ${color};
			}
		`
		)}
`;
