import styled, { css } from 'styled-components';

const fader = css`
	mask-image: linear-gradient(to left, transparent, black 30px);
	mask-repeat: no-repeat;
`;

export const TruncatedContainer = styled.span<{ showFader: boolean }>`
	display: inline-block;
	white-space: nowrap;
	overflow: hidden;
	max-width: 100%;
	position: relative;
	${({ showFader: isTruncated }) => (isTruncated ? fader : '')}
`;

export const TruncatedContent = styled.span`
	display: inline-block;
	white-space: nowrap;
`;
