import styled from 'styled-components';
import { motion } from 'framer-motion';
import { defaultTheme } from '../theme';

export const AggregatedDisplayText = styled.p<{ fontSize?: number }>`
	color: ${({ theme }) => theme.colors.text};
	margin: 0;
	font-size: ${({ fontSize }) => fontSize ?? 14}px;
	outline: none !important;
	min-height: 30px;
	display: flex;
	align-items: center;
`;
AggregatedDisplayText.defaultProps = {
	theme: defaultTheme,
};

export const InteractiveDisplayText = styled(AggregatedDisplayText)`
	cursor: pointer;

	&:hover,
	&:focus {
		text-decoration: underline;
	}
`;

export const PopoverContentRoot = styled.div`
	width: 400px;
`;
PopoverContentRoot.defaultProps = {
	theme: defaultTheme,
};

export const AggregationPreviewText = styled.p`
	color: ${({ theme }) => theme.colors.text};

	.bp3-icon {
		vertical-align: super;
	}
`;
AggregationPreviewText.defaultProps = {
	theme: defaultTheme,
};

export const DisplayValueContainer = styled.div`
	display: flex;
	align-items: center;
`;

export const AnimatedButtonContainer = styled(motion.div)`
	overflow: hidden;
	padding: 3px;
`;
