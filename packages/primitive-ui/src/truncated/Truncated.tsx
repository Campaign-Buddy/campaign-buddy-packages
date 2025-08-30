import React, { useMemo } from 'react';
import { Fader, TruncatedContainer, TruncatedContent } from './styled';
import { useResizeObserver } from '@campaign-buddy/common-hooks';

export function Truncated({ children }: React.PropsWithChildren) {
	const [containerRef, containerSize] = useResizeObserver();
	const [contentRef, contentSize] = useResizeObserver();

	const shouldShowFader = useMemo(() => {
		console.log(containerSize?.width, contentSize?.width);
		if (!containerSize?.width || !contentSize?.width) {
			return false;
		}

		return contentSize.width > containerSize.width;
	}, [containerSize?.width, contentSize?.width]);

	console.log(shouldShowFader);

	return (
		<TruncatedContainer ref={containerRef}>
			<TruncatedContent ref={contentRef}>{children}</TruncatedContent>
			{shouldShowFader && <Fader />}
		</TruncatedContainer>
	);
}
