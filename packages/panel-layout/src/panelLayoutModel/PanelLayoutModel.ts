import { PaneDragItem } from '../components';
import { TabIcon } from './PaneDefinition';
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
import {
	AddChildOptions,
	ChildPanelModelBase,
	ParentPanelModelBase,
} from './PanelLayoutBases';
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

	public openPane = (pane: Omit<PaneDto, 'kind'>) => {
		this.transact(() => {
			const panel = this.getFirstPanel(this);
			panel.addPane({
				kind: 'pane',
				...pane,
			});
		});
	};

	public addFromDrop = (dropData: PaneDragItem, beforeRowId?: string) => {
		this.transact(() => {
			const pane = this.popOrCreatePane(dropData);

			const row = new PanelRowModel(this.transactionManager);
			const panel = new PanelModel(this.transactionManager);

			row.addPanelFromModel(panel);
			panel.addPaneFromModel(pane);

			this.addChild(row, { beforeTargetId: beforeRowId });
		});
	};

	public removeRow = (id: string, giveSizeToId: string): void => {
		this.removeChild(id, giveSizeToId);
	};

	public addRow = (row: PanelRowDto, options?: AddChildOptions) => {
		this.addChild(new PanelRowModel(this.transactionManager, row), options);
	};

	public addRowFromModel = (
		model: PanelRowModel,
		options?: AddChildOptions
	) => {
		this.addChild(model, options);
	};

	public toJson = (): PanelLayoutDto => ({
		children: this.getChildren().map((x) => x.toJson()),
		sizes: [...this.getSizes()],
		kind: 'panelLayout',
	});

	private popOrCreatePane = (dropData: PaneDragItem) => {
		const existingItem =
			dropData.paneId && this.modelRegistry.getById(dropData.paneId);
		if (existingItem instanceof PaneModel) {
			existingItem.getParent()?.removePane(existingItem.getId());
			return existingItem;
		} else {
			return new PaneModel(this.transactionManager, {
				location: dropData.location,
				kind: 'pane',
			});
		}
	};

	private getFirstPanel = (layout: PanelLayoutModel): PanelModel => {
		if (!layout.getChildren().length) {
			this.addRow({
				kind: 'panelRow',
				children: [],
				sizes: [100],
			});
		}

		const firstRow = layout.getChildren()[0];
		if (!firstRow.getChildren().length) {
			firstRow.addPanel({
				kind: 'panel',
				children: [],
			});
		}

		const firstRowChild = firstRow.getChildren()[0];
		if (firstRowChild instanceof PanelLayoutModel) {
			return this.getFirstPanel(firstRowChild);
		} else {
			return firstRowChild;
		}
	};
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

			parent.replaceChildren(this.getId(), rows);
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

	public addFromDrop = (dropData: PaneDragItem, beforeTargetId?: string) => {
		this.transact(() => {
			const pane = this.popOrCreatePane(dropData);

			const panel = new PanelModel(this.transactionManager);
			panel.addPaneFromModel(pane);

			this.addChild(panel, { beforeTargetId });
		});
	};

	public removePanel = (id: string, giveSizeToId: string) => {
		this.removeChild(id, giveSizeToId);
	};

	public addPanel = (dto: PanelDto, options?: AddChildOptions) => {
		this.addChild(new PanelModel(this.transactionManager, dto, this), options);
	};

	public addPanelFromModel = (model: PanelModel, options?: AddChildOptions) => {
		this.addChild(model, options);
	};

	public addLayoutFromModel = (
		model: PanelLayoutModel,
		options?: AddChildOptions
	) => {
		this.addChild(model, options);
	};

	public toJson = (): PanelRowDto => ({
		children: this.getChildren().map((x) => x.toJson()),
		sizes: [...this.getSizes()],
		kind: 'panelRow',
	});

	private popOrCreatePane = (dropData: PaneDragItem) => {
		const existingItem =
			dropData.paneId && this.modelRegistry.getById(dropData.paneId);
		if (existingItem instanceof PaneModel) {
			existingItem.getParent()?.removePane(existingItem.getId());
			return existingItem;
		} else {
			return new PaneModel(this.transactionManager, {
				location: dropData.location,
				kind: 'pane',
			});
		}
	};
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

			parent.addPanelFromModel(newPanel, {
				beforeTargetId: relativePanel?.getId(),
				takeSizeFromTargetId: this.getId(),
			});
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

			parent.replaceChildren(this.getId(), [newLayout]);

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
			this.addChild(pane, { beforeTargetId: beforePaneId });
			pane.focus();
		});
	};

	public removePane = (id: string) => {
		this.removeChild(id);
	};

	public addPaneFromModel = (pane: PaneModel, beforePaneId?: string) => {
		this.addChild(pane, { beforeTargetId: beforePaneId });
	};

	public addPane = (dto: PaneDto, beforePaneId?: string) => {
		this.addChild(new PaneModel(this.transactionManager, dto, this), {
			beforeTargetId: beforePaneId,
		});
	};

	public toJson = (): PanelDto => ({
		children: this.getChildren().map((x) => x.toJson()),
		kind: 'panel',
	});

	private popOrCreatePane = (dropData: PaneDragItem) => {
		const existingItem =
			dropData.paneId && this.modelRegistry.getById(dropData.paneId);
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
	private tabIcon: TransactableProperty<TabIcon | undefined>;
	private parameters: TransactableProperty<any>;

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
		this.tabIcon = new TransactableProperty<TabIcon | undefined>(
			{
				kind: 'icon',
				icon: 'hat',
			},
			this.transactionManager
		);
		this.parameters = new TransactableProperty<any | undefined>(
			pane.parameters,
			this.transactionManager
		);

		this.watchProperties(
			this.location,
			this.tabTitle,
			this.tabIcon,
			this.parameters
		);
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

	public setTabIcon = (icon: TabIcon | undefined) => {
		this.tabIcon.setValue(icon);
	};

	public getTabIcon = () => this.tabIcon.getValue();

	public setLocation = (location: string) => {
		this.location.setValue(location);
	};

	public setTabTitle = (title: string) => {
		this.tabTitle.setValue(title);
	};

	public setParameters = (parameters: any) => {
		this.parameters.setValue(parameters);
	};

	public getTabTitle = () => this.tabTitle.getValue();

	public getLocation = () => this.location.getValue();

	public getParameters = () => this.location.getValue();

	public toJson = (): PaneDto => ({
		location: this.location.getValue(),
		parameters: this.location.getValue(),
		kind: 'pane',
	});
}
