/* eslint sort-keys: "error" */

export const iconNames = {
	chevronDown: 'io5/IoChevronDown',
	chevronLeft: 'io5/IoChevronBack',
	chevronRight: 'io5/IoChevronForward',
	chevronUp: 'io5/IoChevronUp',
	cross: 'io5/IoClose',
	d20: 'gi/GiDiceTwentyFacesTwenty',
	profile: 'io5/IoPeopleCircleOutline',
	character: 'gi/GiMeeple',
	note: 'io5/IoDocumentText',
} as const;

export type IconName = keyof typeof iconNames;
