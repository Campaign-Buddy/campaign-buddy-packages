import { useEffect, useRef, useState } from 'react';
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
	return useObserverState(model, () => model.getChildren());
}
