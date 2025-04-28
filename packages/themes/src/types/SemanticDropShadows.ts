import { DropShadow } from './DropShadow';
import { StatefulDropShadow } from './StatefulDropShadow';

export interface SemanticDropShadows {
	raised: StatefulDropShadow;
	inset: StatefulDropShadow;
	dropdown: DropShadow;
	none: StatefulDropShadow;
}
