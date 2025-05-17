import styled, { css } from 'styled-components';

const hoveringStyle = css<{ hoveringSide?: 'top' | 'bottom' }>`
	:after {
		content: '';
		pointer-events: none;
		position: absolute;
		${({ hoveringSide }) =>
			hoveringSide === 'top' ? 'top: 0px;' : 'bottom: 0px;'}
		width: 100%;
		z-index: 100;
		top: left;
		border-top: solid 2px ${({ theme }) => theme.colors.primary.default};
	}
`;

export const MenuItemContainer = styled.div<{
	hoveringSide?: 'top' | 'bottom';
}>`
	position: relative;
	align-items: center;
	${({ hoveringSide }) => hoveringSide && hoveringStyle}
`;

export const DropDownButtonContainer = styled.div`
	align-self: center;
	padding: 0 ${({ theme }) => theme.sizes.gaps.small}px;
`;

export const CloseButtonContainer = styled.div`
	padding: 4px;
`;
