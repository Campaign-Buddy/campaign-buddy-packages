import { sumGainedActiveProperties } from './sumGainedActiveProperties';

type ModifierType = 'wis' | 'char' | 'int' | 'dex' | 'con' | 'str' | 'ac';

export function sumModifier(type: ModifierType) {
	return sumGainedActiveProperties(`modifiers.${type}`);
}
