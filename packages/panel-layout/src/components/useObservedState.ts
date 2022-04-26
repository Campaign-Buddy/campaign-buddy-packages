import { useCallback, useEffect, useRef, useState } from 'react';
import { PanelBase, ParentBase } from '../panelLayoutModel';

export function useObserverState<T>(model: PanelBase<any>, getState: () => T) {
	const [state, setState] = useState(getState());
	const getStateRef = useRef(getState);

	useEffect(() => {
		getStateRef.current = getState;
	}, [getState]);

	useEffect(() => {
		return model.observe(() => setState(getStateRef.current()));
	}, [model]);

	return state;
}

export function useChildren<TChildren extends PanelBase<any>>(
	model: ParentBase<TChildren, any>
) {
	return useObserverState(model, () => [...model.getChildren()]);
}

export function useSizes(
	model: ParentBase<any, any>
): [number[], (sizes: number[]) => void] {
	const sizes = useObserverState(model, () => [...model.getSizes()]);
	const setSizes = useCallback((sizes: number[]) => {
		model.setSizes(sizes);
	}, [model]);

	return [sizes, setSizes];
}
