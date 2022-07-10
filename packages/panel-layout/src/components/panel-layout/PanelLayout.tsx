import React, { useCallback } from 'react';
import { Split } from '../split';
import { PanelLayoutModel, PanelRowModel } from '../../panelLayoutModel';
import { PanelRow } from '../panel-row/PanelRow';
import { useChildren, useSizes } from '../useObservedState';
import {
	useSectionedDropZone,
	PaneDragItemKind,
	isPaneDragItem,
	coordinateTransformers,
} from '../drag-and-drop';
import { DividerDropZone } from './PanelLayout.styled';

export interface IPanelLayoutProps {
	panelLayout: PanelLayoutModel;
}

export const PanelLayout: React.FC<
	React.PropsWithChildren<IPanelLayoutProps>
> = ({ panelLayout }) => {
	const children = useChildren(panelLayout);
	const [sizes, setSizes] = useSizes(panelLayout);

	const renderDividerChild = useCallback(
		(rightIndex: number) => {
			return <RowDividerDropZone rightChild={children[rightIndex]} />;
		},
		[children]
	);

	return (
		<Split
			sizes={sizes}
			renderDividerChild={renderDividerChild}
			onSizesChange={setSizes}
			direction="vertical"
		>
			{children.map((x) => (
				<PanelRow key={x.getId()} row={x} />
			))}
		</Split>
	);
};

interface RowDividerDropZoneProps {
	rightChild: PanelRowModel;
}

function RowDividerDropZone({ rightChild }: RowDividerDropZoneProps) {
	const { dropRef } = useSectionedDropZone(
		PaneDragItemKind,
		coordinateTransformers.isOver,
		(_, item) => {
			if (!isPaneDragItem(item)) {
				return;
			}

			rightChild.getParent()?.addFromDrop(item, rightChild.getId());
		}
	);

	return <DividerDropZone ref={dropRef} />;
}
