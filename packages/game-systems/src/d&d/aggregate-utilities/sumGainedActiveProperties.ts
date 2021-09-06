import { excludeNonActiveSubpaths, traverseLevels } from './subpaths';

// Adds togethers all of the properties that are actually active on the character (e.g. not data
// on a choice or on a level that the character doesn't have)
export function sumGainedActiveProperties(property: string) {
	return `SUM({$..${excludeNonActiveSubpaths}..${property}}) + SUM({$..${traverseLevels}..${property}})`;
}
