import React from 'react';
import SplitCore from 'react-split';
import { SplitContainer } from './Split.styled';

interface SplitProps {
	direction: 'vertical' | 'horizontal';
	sizes: number[];
	onSizesChange: (sizes: number[]) => void;
}

export const Split: React.FC<SplitProps> = ({
	direction,
	children,
	sizes,
	onSizesChange,
}) => {
	const childCount = React.Children.count(children);

	if (childCount === 1) {
		return <SplitContainer>{children}</SplitContainer>;
	}

	return (
		<SplitContainer>
			<SplitCore
				className={`campaign-buddy-panel-split-${direction}`}
				sizes={sizes}
				direction={direction}
				onDragEnd={onSizesChange}
				gutterSize={8}
				snapOffset={0}
				minSize={0}
				cursor={direction === 'horizontal' ? 'ew-resize' : 'ns-resize'}
			>
				{React.Children.map(children, (child) => (
					<div>{child}</div>
				))}
			</SplitCore>
		</SplitContainer>
	);
};
