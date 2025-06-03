/* eslint sort-keys: "error" */

export const iconNames = {
	character: 'gi/GiMeeple',
	chevronDown: 'io5/IoChevronDown',
	chevronLeft: 'io5/IoChevronBack',
	chevronRight: 'io5/IoChevronForward',
	chevronUp: 'io5/IoChevronUp',
	cross: 'io5/IoClose',
	d20: 'gi/GiDiceTwentyFacesTwenty',
	note: 'io5/IoDocumentText',
	profile: 'io5/IoPeopleCircleOutline',
} as const;

export type IconName = keyof typeof iconNames;
