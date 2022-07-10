import React, { useCallback } from 'react';
import { Split } from '../split';
import {
	PanelLayoutModel,
	PanelModel,
	PanelRowModel,
} from '../../panelLayoutModel';
import { PanelLayout } from '../panel-layout/PanelLayout';
import { Panel } from '../panel';
import { useChildren, useSizes } from '../useObservedState';
import {
	useSectionedDropZone,
	PaneDragItemKind,
	coordinateTransformers,
	isPaneDragItem,
} from '../drag-and-drop';
import { DividerDropZone } from './PanelRow.styled';

interface IPanelRowProps {
	row: PanelRowModel;
}

export const PanelRow: React.FC<React.PropsWithChildren<IPanelRowProps>> = ({
	row,
}) => {
	const children = useChildren(row);
	const [sizes, setSizes] = useSizes(row);

	const renderDividerChild = useCallback(
		(leftIndex: number) => {
			return <ColumnDividerDropZone child={children[leftIndex]} />;
		},
		[children]
	);

	return (
		<Split
			sizes={sizes}
			onSizesChange={setSizes}
			direction="horizontal"
			renderDividerChild={renderDividerChild}
		>
			{children.map((x) =>
				x instanceof PanelModel ? (
					<Panel panel={x} key={x.getId()} />
				) : (
					<PanelLayout panelLayout={x} key={x.getId()} />
				)
			)}
		</Split>
	);
};

interface ColumnDividerDropZoneProps {
	child: PanelModel | PanelLayoutModel;
}

function ColumnDividerDropZone({ child }: ColumnDividerDropZoneProps) {
	const { dropRef } = useSectionedDropZone(
		PaneDragItemKind,
		coordinateTransformers.isOver,
		(_, item) => {
			if (!isPaneDragItem(item)) {
				return;
			}

			console.log('dropped on column divider', child);
		}
	);

	return <DividerDropZone ref={dropRef} />;
}
