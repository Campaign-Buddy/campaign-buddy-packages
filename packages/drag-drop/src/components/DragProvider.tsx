import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DragDataTransformer } from '../types';
import { DragDataTransformerProvider } from './DragDataTransformerProvider';

export interface DragProviderProps {
	dragDataTransformer?: DragDataTransformer;
}

export function DragProvider({
	children,
	dragDataTransformer,
}: React.PropsWithChildren<DragProviderProps>) {
	return (
		<DndProvider backend={HTML5Backend}>
			<DragDataTransformerProvider transformer={dragDataTransformer}>
				{children}
			</DragDataTransformerProvider>
		</DndProvider>
	);
}
