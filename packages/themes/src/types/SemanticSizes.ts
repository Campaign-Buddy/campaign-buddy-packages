import { Thickness } from './Thickness';

interface Stepped<T> {
	extraSmall: T;
	small: T;
	medium: T;
	large: T;
	extraLarge: T;
}

export type SizeStep = keyof Stepped<any>;

export interface SemanticSizes {
	uiContentPadding: Stepped<Thickness>;
	uiInputPadding: Stepped<Thickness>;
	gaps: Stepped<number>;
	iconSizes: Stepped<number>;
	uiFont: Stepped<number>;
	uiHeights: Stepped<number>;
}
