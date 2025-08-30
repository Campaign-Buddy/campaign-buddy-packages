import { themed } from '@campaign-buddy/theme-util';
import styled from 'styled-components';

export const TruncatedContainer = styled.span`
	display: inline-block;
	white-space: nowrap;
	overflow: hidden;
	max-width: 100%;
	position: relative;
`;

export const TruncatedContent = styled.span`
	display: inline-block;
	white-space: nowrap;
`;

export const Fader = styled.span`
	position: absolute;
	right: 0;
	top: 0;
	bottom: 0;
	width: 10px;
	background: linear-gradient(
		90deg,
		transparent,
		${themed.colors.currentBackground}
	);
`;
