import { PaneModel } from '../../panelLayoutModel';
import type { PaneDragItem } from './PaneDragItem';

export function getPaneDragItem(pane: PaneModel): PaneDragItem {
	return {
		kind: 'paneDragItem',
		location: pane.getLocation(),
		tabName: pane.getTabTitle(),
		paneId: pane.getId(),
		icon: pane.getTabIcon(),
	};
}
