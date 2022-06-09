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
import { ChildPanelModelBase, ParentPanelModelBase } from './PanelLayoutBases';
import { TransactableProperty, TransactionManager } from './TransactionManager';

export class PanelLayoutModel extends ParentPanelModelBase<
	PanelRowModel,
	PanelRowModel
> {
	public static create = (layout?: PanelLayoutDto) => {
		return new PanelLayoutModel(new TransactionManager(), layout);
	};

	constructor(
		transactionManager: TransactionManager,
		layout?: PanelLayoutDto,
		parent?: PanelRowModel
	) {
		super(transactionManager, parent);
		if (layout && !isPanelLayoutModel(layout)) {
			throw new Error('First constructor argument must be layout');
		}

		this.init(
			layout?.children.map(
				(x) => new PanelRowModel(this.transactionManager, x, this)
			) ?? [],
			layout?.sizes ?? []
		);
	}

	public removeRow = (id: string): void => {
		this.removeChild(id);
	};

	public addRow = (row: PanelRowDto, beforeTargetRowId?: string) => {
		this.addChild(
			new PanelRowModel(this.transactionManager, row),
			beforeTargetRowId
		);
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

export class PanelRowModel extends ParentPanelModelBase<
	PanelModel | PanelLayoutModel,
	PanelLayoutModel
> {
	constructor(
		transactionManager: TransactionManager,
		row?: PanelRowDto,
		parent?: PanelLayoutModel
	) {
		super(transactionManager, parent);

		if (row && !isPanelRowModel(row)) {
			throw new Error('First constructor argument must be row');
		}

		this.children.addNormalization(() => {
			const children = this.getChildren();
			const parent = this.getParent();

			if (children.length !== 1 || !parent) {
				return;
			}
			const cell = children[0];

			if (!(cell instanceof PanelLayoutModel)) {
				return;
			}

			const rows = cell.getChildren();
			if (rows.length === 0) {
				return;
			}

			const nextSibling = this.getSibling('after');
			parent.removeChild(this.getId());

			for (const row of rows) {
				parent.addChild(row, nextSibling?.getId());
			}
		});

		this.init(
			row?.children.map((x) => {
				if (isPanelModel(x)) {
					return new PanelModel(this.transactionManager, x, this);
				} else if (isPanelLayoutModel(x)) {
					return new PanelLayoutModel(this.transactionManager, x, this);
				} else {
					throw new Error('Unexpected child of row');
				}
			}) ?? [],
			row?.sizes ?? []
		);
	}

	public removePanel = (id: string) => {
		this.removeChild(id);
	};

	public addPanel = (dto: PanelDto, beforePanelId?: string) => {
		this.addChild(
			new PanelModel(this.transactionManager, dto, this),
			beforePanelId
		);
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

export class PanelModel extends ParentPanelModelBase<PaneModel, PanelRowModel> {
	private activeTabId: TransactableProperty<string | undefined>;

	constructor(
		transactionManager: TransactionManager,
		panel?: PanelDto,
		parent?: PanelRowModel
	) {
		super(transactionManager, parent, false);

		if (panel && !isPanelModel(panel)) {
			throw new Error('First constructor argument must be panel');
		}

		this.init(
			panel?.children.map(
				(x) => new PaneModel(this.transactionManager, x, this)
			) ?? [],
			[]
		);

		this.activeTabId = new TransactableProperty<string | undefined>(
			this.getChildren()[0]?.getId(),
			this.transactionManager
		);

		this.children.addNormalization(() => {
			const children = this.getChildren();
			const activeTabId = this.activeTabId.getValue();
			if (children.length === 0) {
				return;
			}

			const activePane = children.find((x) => x.getId() === activeTabId);
			if (!activePane) {
				this.setActiveTabId(children[0].getId());
			}
		});

		this.watchProperties(this.activeTabId);
	}

	public getActiveTabId = () => this.activeTabId.getValue();
	public setActiveTabId = (tabId: string) => this.activeTabId.setValue(tabId);

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

			const newPanel = new PanelModel(this.transactionManager);
			newPanel.addChild(pane);

			const relativePanel =
				direction === 'left' ? this : this.getSibling('after');

			parent.addPanelFromModel(newPanel, relativePanel?.getId());
			pane.focus();
		});
	};

	public addVerticalFromDrop = (
		dropData: PaneDragItem,
		direction: 'top' | 'bottom'
	) => {
		this.transact(() => {
			// Panels are children of rows
			const parent = this.getParent();

			if (!parent) {
				return;
			}

			const newLayout = new PanelLayoutModel(this.transactionManager);

			const formerBeforeSibling = this.getSibling('after');
			parent.addLayoutFromModel(newLayout, formerBeforeSibling?.getId());
			parent.removePanel(this.getId());

			const topRow = new PanelRowModel(this.transactionManager);
			const bottomRow = new PanelRowModel(this.transactionManager);

			newLayout.addRowFromModel(topRow);
			newLayout.addRowFromModel(bottomRow);

			const newPanel = new PanelModel(this.transactionManager);
			const pane = this.popOrCreatePane(dropData);
			newPanel.addChild(pane);

			if (direction === 'top') {
				topRow.addPanelFromModel(newPanel);
				bottomRow.addPanelFromModel(this);
			} else {
				topRow.addPanelFromModel(this);
				bottomRow.addPanelFromModel(newPanel);
			}

			pane.focus();
		});
	};

	public addToTabBarFromDrop = (
		dropData: PaneDragItem,
		beforePaneId?: string
	) => {
		this.transact(() => {
			const pane = this.popOrCreatePane(dropData);
			this.addChild(pane, beforePaneId);
			pane.focus();
		});
	};

	public removePane = (id: string) => {
		this.removeChild(id);
	};

	public addPane = (dto: PaneDto, beforePaneId?: string) => {
		this.addChild(
			new PaneModel(this.transactionManager, dto, this),
			beforePaneId
		);
	};

	public toJson = (): PanelDto => ({
		children: this.getChildren().map((x) => x.toJson()),
		kind: 'panel',
	});

	private popOrCreatePane = (dropData: PaneDragItem) => {
		const existingItem = dropData.paneId && this.modelRegistry[dropData.paneId];
		if (existingItem instanceof PaneModel) {
			existingItem.getParent()?.removePane(existingItem.getId());
			return existingItem;
		} else {
			return new PaneModel(
				this.transactionManager,
				{
					location: dropData.location,
					kind: 'pane',
				},
				this
			);
		}
	};
}

export class PaneModel extends ChildPanelModelBase<PanelModel> {
	private location: TransactableProperty<string>;
	private tabTitle: TransactableProperty<string>;

	constructor(
		transactionManager: TransactionManager,
		pane: PaneDto,
		parent?: PanelModel
	) {
		super(transactionManager, parent);

		if (pane && !isPaneModel(pane)) {
			throw new Error('First constructor argument must be pane');
		}

		this.location = new TransactableProperty(
			pane.location,
			this.transactionManager
		);
		this.tabTitle = new TransactableProperty(
			'Campaign Buddy',
			this.transactionManager
		);

		this.watchProperties(this.location, this.tabTitle);
	}

	public close = () => {
		this.transact(() => {
			const parent = this.getParent();
			if (!parent) {
				return;
			}

			parent.removeChild(this.getId());
		});
	};

	public focus = () => {
		const parent = this.getParent();
		if (!parent) {
			return;
		}

		parent.setActiveTabId(this.getId());
	};

	public setLocation = (location: string) => {
		this.location.setValue(location);
	};

	public setTabTitle = (title: string) => {
		this.tabTitle.setValue(title);
	};

	public getTabTitle = () => this.tabTitle.getValue();

	public getLocation = () => this.location.getValue();

	public toJson = (): PaneDto => ({
		location: this.location.getValue(),
		kind: 'pane',
	});
}
