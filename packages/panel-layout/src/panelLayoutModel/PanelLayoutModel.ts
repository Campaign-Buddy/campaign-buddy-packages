import { PaneDragItem } from '../components';
import {
	isPanelLayoutModel,
	isPanelModel,
	isPanelRowModel,
	isPaneModel,
	PanelLayoutDto,
	PanelDto,
	PanelRowDto,
	PaneDto,
} from './PanelDtoTypes';
import { PanelBase, ParentBase } from './PanelLayoutBases';

export class PanelLayoutModel extends ParentBase<PanelRowModel, PanelRowModel> {
	constructor(layout?: PanelLayoutDto, parent?: PanelRowModel) {
		super(parent);
		if (layout && !isPanelLayoutModel(layout)) {
			throw new Error('First constructor argument must be layout');
		}

		this.initChildren(
			layout?.children.map((x) => new PanelRowModel(x, this)) ?? []
		);
		this.initSizes(layout?.sizes ?? []);
	}

	public removeRow = (id: string): void => {
		this.removeChild(id);
	};

	public addRow = (row: PanelRowDto, beforeTargetRowId?: string) => {
		this.addChild(new PanelRowModel(row), beforeTargetRowId);
	};

	public addRowFromModel = (
		model: PanelRowModel,
		beforeTargetRowId?: string
	) => {
		this.addChild(model, beforeTargetRowId);
	};

	public toJson = (): PanelLayoutDto => ({
		children: this.getChildren().map((x) => x.toJson()),
		sizes: [...this.getSizes()],
		kind: 'panelLayout',
	});
}

export class PanelRowModel extends ParentBase<
	PanelModel | PanelLayoutModel,
	PanelLayoutModel
> {
	constructor(row?: PanelRowDto, parent?: PanelLayoutModel) {
		super(parent);

		if (row && !isPanelRowModel(row)) {
			throw new Error('First constructor argument must be row');
		}

		this.initChildren(
			row?.children.map((x) => {
				if (isPanelModel(x)) {
					return new PanelModel(x, this);
				} else if (isPanelLayoutModel(x)) {
					return new PanelLayoutModel(x, this);
				} else {
					throw new Error('Unexpected child of row');
				}
			}) ?? []
		);

		this.initSizes(row?.sizes ?? []);
	}

	public removePanel = (id: string) => {
		this.removeChild(id);
	};

	public addPanel = (dto: PanelDto, beforePanelId?: string) => {
		this.addChild(new PanelModel(dto, this), beforePanelId);
	};

	public addPanelFromModel = (model: PanelModel, beforePanelId?: string) => {
		this.addChild(model, beforePanelId);
	};

	public addLayoutFromModel = (model: PanelLayoutModel, beforeId?: string) => {
		this.addChild(model, beforeId);
	};

	public toJson = (): PanelRowDto => ({
		children: this.getChildren().map((x) => x.toJson()),
		sizes: [...this.getSizes()],
		kind: 'panelRow',
	});
}

export class PanelModel extends ParentBase<PaneModel, PanelRowModel> {
	constructor(panel?: PanelDto, parent?: PanelRowModel) {
		super(parent, true);

		if (panel && !isPanelModel(panel)) {
			throw new Error('First constructor argument must be panel');
		}

		this.initChildren(panel?.children.map((x) => new PaneModel(x, this)) ?? []);
	}

	public addHorizontalFromDrop = (
		dropData: PaneDragItem,
		direction: 'left' | 'right'
	) => {
		this.transact(() => {
			const parent = this.getParent();

			if (!parent) {
				return;
			}

			const pane = this.popOrCreatePane(dropData);

			const newPanel = new PanelModel(undefined, parent);
			newPanel.addChild(pane);

			const relativePanel =
				direction === 'left' ? this : this.getSibling('after');

			parent.addPanelFromModel(newPanel, relativePanel?.getId());
		});
	};

	public addVerticalFromDrop = (
		dropData: PaneDragItem,
		direction: 'top' | 'bottom'
	) => {
		this.transact(() => {
			const parent = this.getParent();
			const beforeSibling = this.getSibling('before');
			const afterSibling = this.getSibling('after');
			const beforeRowId = beforeSibling?.getId() ?? afterSibling?.getId();

			if (!parent) {
				return;
			}

			const pane = this.popOrCreatePane(dropData);
			const newPanel = new PanelModel();
			newPanel.addChild(pane);

			parent.removePanel(this.getId());

			const newLayout = new PanelLayoutModel();
			const topRow = new PanelRowModel();
			const bottomRow = new PanelRowModel();

			if (direction === 'top') {
				topRow.addPanelFromModel(newPanel);
				bottomRow.addPanelFromModel(this);
			} else {
				bottomRow.addPanelFromModel(newPanel);
				topRow.addPanelFromModel(this);
			}

			newLayout.addRowFromModel(topRow);
			newLayout.addRowFromModel(bottomRow);

			parent.addLayoutFromModel(newLayout, beforeRowId);
		});
	};

	public addToTabBarFromDrop = (
		dropData: PaneDragItem,
		beforePaneId?: string
	) => {
		this.transact(() => {
			const pane = this.popOrCreatePane(dropData);
			this.addChild(pane, beforePaneId);
		});
	};

	public removePane = (id: string) => {
		this.removeChild(id);
	};

	public addPane = (dto: PaneDto, beforePaneId?: string) => {
		this.addChild(new PaneModel(dto, this), beforePaneId);
	};

	public toJson = (): PanelDto => ({
		children: this.getChildren().map((x) => x.toJson()),
		kind: 'panel',
	});

	private popOrCreatePane = (dropData: PaneDragItem) => {
		const existingItem = dropData.paneId && this.modelLookup[dropData.paneId];
		console.log('existing item', existingItem);
		if (existingItem instanceof PaneModel) {
			existingItem.getParent()?.removePane(existingItem.getId());
			console.log('existing item parent', existingItem.getParent()?.getId());
			return existingItem;
		} else {
			return new PaneModel(
				{
					location: dropData.location,
					kind: 'pane',
				},
				this
			);
		}
	};
}

export class PaneModel extends PanelBase<PanelModel> {
	private location: string;
	private tabTitle: string;

	constructor(pane: PaneDto, parent?: PanelModel) {
		super(parent);

		if (pane && !isPaneModel(pane)) {
			throw new Error('First constructor argument must be pane');
		}

		this.location = pane.location;
		this.tabTitle = 'Campaign Buddy';
	}

	public setLocation = (location: string) => {
		this.location = location;
		this.fireOnChange();
	};

	public setTabTitle = (title: string) => {
		this.tabTitle = title;
		this.fireOnChange();
	};

	public getTabTitle = () => this.tabTitle;

	public getLocation = () => this.location;

	public toJson = (): PaneDto => ({
		location: this.location,
		kind: 'pane',
	});
}
