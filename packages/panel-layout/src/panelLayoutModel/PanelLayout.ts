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

export class PanelLayout extends ParentBase<PanelRow, PanelRow> {
	constructor(layout?: PanelLayoutDto, parent?: PanelRow) {
		super(parent);
		if (layout && !isPanelLayoutModel(layout)) {
			throw new Error('First constructor argument must be layout');
		}

		this.initChildren(layout?.children.map((x) => new PanelRow(x, this)) ?? []);
		this.initSizes(layout?.sizes ?? []);
	}

	public removeRow = (id: string): void => {
		this.removeChild(id);
	};

	public addRow = (row: PanelRowDto, beforeTargetRowId?: string) => {
		this.addChild(new PanelRow(row), beforeTargetRowId);
	};

	public toJson = (): PanelLayoutDto => ({
		children: this.children.map((x) => x.toJson()),
		sizes: [...this.sizes],
		kind: 'panelLayout',
	});
}

export class PanelRow extends ParentBase<Panel | PanelLayout, PanelLayout> {
	constructor(row?: PanelRowDto, parent?: PanelLayout) {
		super(parent);

		if (row && !isPanelRowModel(row)) {
			throw new Error('First constructor argument must be row');
		}

		this.initChildren(
			row?.children.map((x) => {
				if (isPanelModel(x)) {
					return new Panel(x, this);
				} else if (isPanelLayoutModel(x)) {
					return new PanelLayout(x, this);
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
		this.addChild(new Panel(dto, this), beforePanelId);
	};

	public toJson = (): PanelRowDto => ({
		children: this.children.map((x) => x.toJson()),
		sizes: [...this.sizes],
		kind: 'panelRow',
	});
}

export class Panel extends ParentBase<Pane, PanelRow> {
	constructor(panel?: PanelDto, parent?: PanelRow) {
		super(parent, true);
		
		if (panel && !isPanelModel(panel)) {
			throw new Error('First constructor argument must be panel');
		}

		this.initChildren(panel?.children.map((x) => new Pane(x, this)) ?? []);
	}

	public removePane = (id: string) => {
		this.removeChild(id);
	};

	public addPane = (dto: PaneDto, beforePaneId?: string) => {
		this.addChild(new Pane(dto, this), beforePaneId);
	};

	public toJson = (): PanelDto => ({
		children: this.children.map((x) => x.toJson()),
		kind: 'panel',
	});
}

export class Pane extends PanelBase<Panel> {
	private location: string;

	constructor(pane: PaneDto, parent?: Panel) {
		super(parent);

		if (pane && !isPaneModel(pane)) {
			throw new Error('First constructor argument must be pane');
		}

		this.location = pane.location;
	}

	public toJson = (): PaneDto => ({
		location: this.location,
		kind: 'pane',
	});
}
