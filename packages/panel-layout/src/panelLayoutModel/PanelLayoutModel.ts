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
