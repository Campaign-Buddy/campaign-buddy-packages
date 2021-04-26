type ModifierType = 'wis' | 'char' | 'int' | 'dex' | 'con' | 'str' | 'ac';

export function sumModifier(type: ModifierType) {
	return `SUM({$..<?(@ !== "choices" && @ !== "options")>..modifiers.${type}})`;
}
