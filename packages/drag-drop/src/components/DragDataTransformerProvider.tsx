import React, { useCallback, useContext, useMemo } from 'react';
import {
	DragData,
	DragDataKind,
	DragDataTransformer,
	DragDataMap,
} from '../types';

interface DragDataTransformerContextData {
	transformer?: DragDataTransformer;
}

const DragDataTransfomerContext =
	React.createContext<DragDataTransformerContextData>({
		transformer: undefined,
	});

export interface DragDataTransfomerProviderProps {
	transformer?: DragDataTransformer;
}

export function DragDataTransformerProvider({
	transformer,
	children,
}: React.PropsWithChildren<DragDataTransfomerProviderProps>) {
	const contextValue = useMemo(() => ({ transformer }), [transformer]);
	return (
		<DragDataTransfomerContext.Provider value={contextValue}>
			{children}
		</DragDataTransfomerContext.Provider>
	);
}

export function useDragDataTransformer() {
	const { transformer } = useContext(DragDataTransfomerContext);

	const tryTransformData = useCallback(
		<TFrom extends DragData, TToKind extends DragDataKind>(
			fromItem: TFrom,
			toKind: TToKind
		): DragDataMap[TToKind] | undefined => {
			if (fromItem.kind === toKind) {
				return fromItem as DragDataMap[TToKind];
			}

			return transformer?.tryTransform(fromItem, toKind);
		},
		[transformer]
	);

	return { tryTransformData };
}
