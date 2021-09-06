const nonActiveKeywords = [
	'choices',
	'options',
	'additionalProperties',
	'levels'
];

export const excludeNonActiveSubpaths = `<?(${nonActiveKeywords.map(x => `@ !== "${x}"`).join(' && ')})>`;
export const traverseLevels = `levels[0:{$.level}]..${excludeNonActiveSubpaths}`;
