import { Thickness } from '../../../types';
import { SemanticSizes } from '../../../types/SemanticSizes';

export const sizes: SemanticSizes = {
	gaps: {
		extraSmall: 2,
		small: 4,
		medium: 8,
		large: 12,
		extraLarge: 16,
	},
	uiHeights: {
		extraSmall: 16,
		small: 24,
		medium: 30,
		large: 40,
		extraLarge: 48,
	},
	iconSizes: {
		extraSmall: 8,
		small: 12,
		medium: 18,
		large: 24,
		extraLarge: 28,
	},
	uiFont: {
		extraSmall: 12,
		small: 14,
		medium: 14,
		large: 16,
		extraLarge: 16,
	},
	uiContentPadding: {
		extraSmall: new Thickness(2),
		small: new Thickness(4),
		medium: new Thickness(8),
		large: new Thickness(12),
		extraLarge: new Thickness(16),
	},
	uiInputPadding: {
		extraSmall: new Thickness('2 4'),
		small: new Thickness('4 8'),
		medium: new Thickness('8 12'),
		large: new Thickness('12 16'),
		extraLarge: new Thickness('16 20'),
	},
};
