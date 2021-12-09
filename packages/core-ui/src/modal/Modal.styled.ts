import styled from 'styled-components';
import { defaultTheme } from '../theme';

export type ScrollStyle = 'overlay' | 'content';

export const OverlayBackground = styled.div<{ scrollStyle: ScrollStyle }>`
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	padding: 12px 0;

	${({ scrollStyle }) =>
		scrollStyle === 'overlay' &&
		`
		overflow: auto;
	`}
`;

export const ModalRoot = styled.div<{ scrollStyle: ScrollStyle }>`
	background-color: ${({ theme }) => theme.colors.background};
	border-radius: 3px;
	min-width: min(400px, 100%);
	max-width: min(400px, 100%);
	margin-top: auto;
	margin: 0;

	${({ scrollStyle }) =>
		scrollStyle === 'content' &&
		`
		display: flex;
		flex-direction: column;
		max-height: 100%;
	`}
`;

ModalRoot.defaultProps = {
	theme: defaultTheme,
};

export const ModalContent = styled.div<{ scrollStyle: ScrollStyle }>`
	padding: 12px;

	${({ scrollStyle }) =>
		scrollStyle === 'content' &&
		`
		overflow: auto;
	`}
`;

export const ModalTitle = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 12px;

	& > h1 {
		color: ${({ theme }) => theme.colors.text};
		margin: 0;
	}
`;

ModalTitle.defaultProps = {
	theme: defaultTheme,
};

export const ModalFooter = styled.div`
	display: flex;
	justify-content: flex-end;
	padding: 12px;
`;
