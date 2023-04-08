import { createContext, useContext } from 'react';

export type ToolbarOrientation = 'horizontal' | 'vertical';

const ToolbarOrientationContext = createContext<'horizontal' | 'vertical'>(
	'horizontal'
);

export const ToolbarOrientationProvider = ToolbarOrientationContext.Provider;

export function useToolbarOrientation() {
	return useContext(ToolbarOrientationContext);
}
