import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { defaultTheme } from '../theme';
import { Popover } from '../popover';

export const StyledPopover = styled(Popover)`
	overflow: hidden;
`;

const AggregatedDisplayTextInner = styled.p<{ fontSize?: number }>`
	color: ${({ theme }) => theme.legacyCoreUi.colors.text};
	margin: 0;
	font-size: ${({ fontSize }) => fontSize ?? 14}px;
	outline: none !important;
	text-overflow: ellipsis;
	overflow: hidden;
`;
AggregatedDisplayTextInner.defaultProps = {
	theme: defaultTheme,
};

export const AggregatedDisplayTextOuter = styled.div<{ fontSize?: number }>`
	min-height: 30px;
	display: flex;
	align-items: center;
`;

type AggregatedDisplayTextProps = React.HTMLAttributes<HTMLParagraphElement> & {
	fontSize?: number;
};
export const AggregatedDisplayText: React.FC<
	React.PropsWithChildren<AggregatedDisplayTextProps>
> = ({ className, children, ...props }) => (
	<AggregatedDisplayTextOuter className={className}>
		<AggregatedDisplayTextInner {...props}>
			{children}
		</AggregatedDisplayTextInner>
	</AggregatedDisplayTextOuter>
);

export const InteractiveDisplayText = styled(AggregatedDisplayText)`
	cursor: pointer;

	&:hover,
	&:focus {
		text-decoration: underline;
	}
`;

export const PopoverContentRoot = styled.div`
	width: 300px;
`;
PopoverContentRoot.defaultProps = {
	theme: defaultTheme,
};

export const AggregationPreviewText = styled.p`
	color: ${({ theme }) => theme.legacyCoreUi.colors.text};
	text-overflow: ellipsis;
	overflow: hidden;

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
	margin-right: 2px;
	flex-shrink: 0;
`;
