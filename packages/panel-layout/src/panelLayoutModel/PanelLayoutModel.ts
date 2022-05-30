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
import { TransactableProperty } from './TransactionManager';

export class PanelLayoutModel extends ParentPanelModelBase<
	PanelRowModel,
	PanelRowModel
> {
	constructor(layout?: PanelLayoutDto, parent?: PanelRowModel) {
		super(parent);
		if (layout && !isPanelLayoutModel(layout)) {
			throw new Error('First constructor argument must be layout');
		}

		this.init(
			layout?.children.map((x) => new PanelRowModel(x, this)) ?? [],
			layout?.sizes ?? []
		);
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

export class PanelRowModel extends ParentPanelModelBase<
	PanelModel | PanelLayoutModel,
	PanelLayoutModel
> {
	constructor(row?: PanelRowDto, parent?: PanelLayoutModel) {
		super(parent);

		if (row && !isPanelRowModel(row)) {
			throw new Error('First constructor argument must be row');
		}

		this.init(
			row?.children.map((x) => {
				if (isPanelModel(x)) {
					return new PanelModel(x, this);
				} else if (isPanelLayoutModel(x)) {
					return new PanelLayoutModel(x, this);
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

export class PanelModel extends ParentPanelModelBase<PaneModel, PanelRowModel> {
	constructor(panel?: PanelDto, parent?: PanelRowModel) {
		super(parent);

		if (panel && !isPanelModel(panel)) {
			throw new Error('First constructor argument must be panel');
		}

		this.init(panel?.children.map((x) => new PaneModel(x, this)) ?? [], []);
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
			// Panels are children of rows
			const parent = this.getParent();

			if (!parent) {
				return;
			}

			const newLayout = new PanelLayoutModel();
			const topRow = new PanelRowModel();
			const bottomRow = new PanelRowModel();

			newLayout.addRowFromModel(topRow);
			newLayout.addRowFromModel(bottomRow);

			const newPanel = new PanelModel();
			const pane = this.popOrCreatePane(dropData);
			newPanel.addChild(pane);

			if (direction === 'top') {
				topRow.addPanelFromModel(newPanel);
				bottomRow.addPanelFromModel(this);
			} else {
				topRow.addPanelFromModel(this);
				bottomRow.addPanelFromModel(newPanel);
			}

			console.log(
				'siblings?',
				this.getParent()
					?.getChildren()
					.map((x) => x.getId())
			);
			const formerBeforeSibling = this.getSibling('after');
			parent.removePanel(this.getId());
			console.log(formerBeforeSibling, formerBeforeSibling?.getId());
			parent.addLayoutFromModel(newLayout, formerBeforeSibling?.getId());
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
		const existingItem = dropData.paneId && this.modelRegistry[dropData.paneId];
		console.log(
			'existing item',
			existingItem,
			this.modelRegistry,
			dropData.paneId
		);
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

export class PaneModel extends ChildPanelModelBase<PanelModel> {
	private location: TransactableProperty<string>;
	private tabTitle: TransactableProperty<string>;

	constructor(pane: PaneDto, parent?: PanelModel) {
		super(parent);

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
