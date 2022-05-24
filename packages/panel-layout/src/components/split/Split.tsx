import React, { useEffect, useMemo, useRef } from 'react';
import isEqual from 'lodash.isequal';
import { useTheme } from '@campaign-buddy/react-theme-provider';
import {
	minSize,
	SplitChild,
	SplitContainer,
	SplitDirection,
} from './Split.styled';
import { Divider } from './Divider';
import { adjustChildrenForDrag, getFlexBasis } from './adjustChildrenForDrag';
import { findIndexReverse } from './findIndexReverse';

export interface SplitProps {
	direction: SplitDirection;
	sizes: number[];
	onSizesChange: (sizes: number[]) => void;
}

export const Split: React.FC<React.PropsWithChildren<SplitProps>> = ({
	direction,
	children,
	sizes,
	onSizesChange,
}) => {
	const childCount = React.Children.count(children);
	const containerRef = useRef<HTMLDivElement>(null);
	const childRefs = useRef<
		Map<any, { element: HTMLDivElement; index: number }>
	>(new Map());
	const childRefsByIndex = useRef<HTMLDivElement[]>([]);

	const syncedSizesRef = useRef(sizes);
	const nextSizesRef = useRef([...sizes]);
	const onSizesChangeRef = useRef(onSizesChange);
	const theme = useTheme();
	const gutterSize = theme.panelLayout.gap.size;

	useEffect(() => {
		onSizesChangeRef.current = onSizesChange;
	}, [onSizesChange]);

	useEffect(() => {
		childRefsByIndex.current = [...childRefs.current.values()]
			.sort((a, b) => a.index - b.index)
			.map((x) => x.element);
	}, [children]);

	useEffect(() => {
		if (isEqual(syncedSizesRef.current, sizes)) {
			return;
		}

		syncedSizesRef.current = sizes;
		nextSizesRef.current = [...sizes];

		for (let i = 0; i < childRefsByIndex.current.length; i++) {
			const child = childRefsByIndex.current[i];
			const size = sizes[i];

			child.style.flexBasis = getFlexBasis(
				size,
				i !== 0 && i !== childRefsByIndex.current.length - 1,
				gutterSize
			);
		}
	}, [sizes, gutterSize]);

	const mappedChildren = useMemo(() => {
		const childCount = React.Children.count(children);
		return React.Children.map(children, (child, index) => (
			<>
				{index !== 0 && (
					<Divider
						direction={direction}
						onDrag={(diff) => {
							// Mutates nextSizesRef.current
							adjustChildrenForDrag(
								diff,
								direction,
								index,
								containerRef.current,
								childRefsByIndex.current,
								syncedSizesRef.current,
								nextSizesRef.current,
								gutterSize
							);
						}}
						onDragEnd={() => {
							// Ensure sizes add up to 100
							const total = nextSizesRef.current.reduce((a, b) => a + b);

							const dimension = direction === 'horizontal' ? 'width' : 'height';
							const containerSize =
								containerRef.current?.getBoundingClientRect()[dimension] ?? 0;

							if (total !== 100) {
								const diff = 100 - total;
								const lastViableChildIndex = findIndexReverse(
									nextSizesRef.current,
									(el) => el * containerSize > minSize
								);

								nextSizesRef.current[lastViableChildIndex] += diff;
							}

							syncedSizesRef.current = [...nextSizesRef.current];
							onSizesChangeRef.current(nextSizesRef.current);
						}}
					/>
				)}
				<SplitChild
					ref={(ref) => {
						if (ref === null) {
							childRefs.current.delete(child);
						} else {
							childRefs.current.set(child, { element: ref, index });
							ref.style.flexBasis = getFlexBasis(
								syncedSizesRef.current[index],
								index !== 0 && index !== childCount - 1,
								gutterSize
							);
						}
					}}
				>
					{child}
				</SplitChild>
			</>
		));
	}, [children, direction, gutterSize]);

	if (childCount === 1) {
		return (
			<SplitContainer ref={containerRef} direction={direction}>
				{children}
			</SplitContainer>
		);
	}

	return (
		<SplitContainer ref={containerRef} direction={direction}>
			{mappedChildren}
		</SplitContainer>
	);
};
