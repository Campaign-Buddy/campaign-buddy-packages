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
		(leftIndex: number) => {
			return <RowDividerDropZone child={children[leftIndex]} />;
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
	child: PanelRowModel;
}

function RowDividerDropZone({ child }: RowDividerDropZoneProps) {
	const { dropRef } = useSectionedDropZone(
		PaneDragItemKind,
		coordinateTransformers.isOver,
		(_, item) => {
			if (!isPaneDragItem(item)) {
				return;
			}

			console.log('dropped on row divider', child);
		}
	);

	return <DividerDropZone ref={dropRef} />;
}
