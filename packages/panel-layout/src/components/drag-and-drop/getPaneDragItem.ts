import { PaneModel } from '../../panelLayoutModel';
import { PaneDragItem } from './PaneDragItem';

export function getPaneDragItem(pane: PaneModel): PaneDragItem {
	return {
		kind: 'paneDragItem',
		paneId: pane.getId(),
		tabName: pane.getTabTitle(),
	}
}
