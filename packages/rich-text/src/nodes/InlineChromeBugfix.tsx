import React from 'react';
import styled from 'styled-components';

const InlineChromeBugfixContainer = styled.span`
	font-size: 0;
`;

// Put this at the start and end of an inline component to work around this Chromium bug:
// https://bugs.chromium.org/p/chromium/issues/detail?id=1249405
export const InlineChromiumBugfix = () => (
	<InlineChromeBugfixContainer contentEditable={false}>
		${String.fromCodePoint(160) /* Non-breaking space */}
	</InlineChromeBugfixContainer>
);
