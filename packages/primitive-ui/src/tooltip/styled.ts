import { themed } from '@campaign-buddy/theme-util';
import styled from 'styled-components';

export const TooltipReferenceContainer = styled.div`
	display: inline-block;
`;

export const TooltipContentContainer = styled.div`
	color: ${themed.colors.primaryText.onBackground};
`;
