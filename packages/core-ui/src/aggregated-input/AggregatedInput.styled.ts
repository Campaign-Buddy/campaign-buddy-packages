import styled from 'styled-components';
import { motion } from 'framer-motion';
import { defaultTheme } from '../theme';

export const AggregatedDisplayText = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
AggregatedDisplayText.defaultProps = {
	theme: defaultTheme,
};

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
