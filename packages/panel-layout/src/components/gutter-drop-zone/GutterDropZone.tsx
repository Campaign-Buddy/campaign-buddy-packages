import {
	PanelLayoutModel,
	PanelModel,
	PanelRowModel,
} from '../../panelLayoutModel';
import {
	useSectionedDropZone,
	PaneDragItemKind,
	coordinateTransformers,
	isPaneDragItem,
} from '../drag-and-drop';
import { StyledGutterDropZone } from './GutterDropZone.styled';

interface GutterDropzoneProps {
	rightChild: PanelRowModel | PanelLayoutModel | PanelModel;
	direction: 'horizontal' | 'vertical';
}

export function GutterDropZone({ rightChild, direction }: GutterDropzoneProps) {
	const { dropRef, hoveringLocation } = useSectionedDropZone(
		PaneDragItemKind,
		coordinateTransformers.isOver,
		(_, item) => {
			if (!isPaneDragItem(item)) {
				return;
			}

			rightChild.getParent()?.addFromDrop(item, rightChild.getId());
		}
	);

	return (
		<StyledGutterDropZone
			direction={direction}
			isDraggingOver={hoveringLocation}
			ref={dropRef}
		/>
	);
}
