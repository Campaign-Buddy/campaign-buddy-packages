import { useCallback, useEffect, useRef, useState } from 'react';
import { ChildPanelModelBase, ParentPanelModelBase } from '../panelLayoutModel';

export function useObserverState<T>(
	model: ChildPanelModelBase<any>,
	getState: () => T
) {
	const [state, setState] = useState(getState());
	const getStateRef = useRef(getState);
	getStateRef.current = getState;

	useEffect(() => {
		return model.observe(() => setState(getStateRef.current()));
	}, [model]);

	return state;
}

export function useChildren<TChildren extends ChildPanelModelBase<any>>(
	model: ParentPanelModelBase<TChildren, any>
) {
	return useObserverState(model, () => [...model.getChildren()]);
}

export function useSizes(
	model: ParentPanelModelBase<any, any>
): [number[], (sizes: number[]) => void] {
	const sizes = useObserverState(model, () => [...model.getSizes()]);
	const setSizes = useCallback(
		(sizes: number[]) => {
			model.setSizes(sizes);
		},
		[model]
	);

	return [sizes, setSizes];
}
