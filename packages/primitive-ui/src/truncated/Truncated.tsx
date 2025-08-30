import React, { useMemo } from 'react';
import { TruncatedContainer, TruncatedContent } from './styled';
import { useResizeObserver } from '@campaign-buddy/common-hooks';
import { Tooltip } from '../tooltip';

export function Truncated({ children }: React.PropsWithChildren) {
	const [containerRef, containerSize] = useResizeObserver();
	const [contentRef, contentSize] = useResizeObserver();

	const shouldShowFader = useMemo(() => {
		if (!containerSize?.width || !contentSize?.width) {
			return false;
		}

		return contentSize.width > containerSize.width;
	}, [containerSize?.width, contentSize?.width]);

	return (
		<TruncatedContainer ref={containerRef} showFader={shouldShowFader}>
			<TruncatedContent ref={contentRef}>
				<Tooltip disabled={!shouldShowFader}>
					<Tooltip.Reference>{children}</Tooltip.Reference>
					<Tooltip.Content>{children}</Tooltip.Content>
				</Tooltip>
			</TruncatedContent>
		</TruncatedContainer>
	);
}
