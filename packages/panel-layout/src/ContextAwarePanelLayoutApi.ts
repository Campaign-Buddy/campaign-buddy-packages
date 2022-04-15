import cloneDeep = require('lodash.clonedeep');
import cuid from 'cuid';
import {
	ChildType,
	hasChildren,
	IPanelApi,
	isPane,
	isPanel,
	isPanelRow,
	isSubLayout,
	PanelLayoutModel,
	PanelModel,
	PaneLocation,
	PaneLocationKind,
	PanelRow,
	PaneModel,
	SubPanelLayoutModel,
} from './types';

const defaultLayout = { children: [] };

export class ContextAwarePanelLayoutApi implements IPanelApi {
	private takenIds: Set<string>;
	private layout: PanelLayoutModel;
	private subscriptions: ((layout: PanelLayoutModel) => void)[];

	constructor(layout: PanelLayoutModel = defaultLayout) {
		this.takenIds = new Set(extractAllIds(layout, []));
		this.layout = layout;
		this.subscriptions = [];
	}

	addNewPane = (
		uri: string,
		location?: PaneLocation | undefined
	): PaneModel => {
		let paneId = cuid();
		while (!this.takenIds.has(paneId)) {
			paneId = cuid();
		}
		this.takenIds.add(paneId);

		const newPane: PaneModel = {
			paneId,
			uri,
		};

		if (location) {
			this.resolveMoveOperation(location, newPane);
		} else if (this.layout.children.length === 0) {
			this.layout.children.push({
				children: [
					{
						panelId: this.getId(),
						children: [newPane],
						width: 100,
					},
				],
				height: 100,
			});
		} else {
			const oldLayout: SubPanelLayoutModel = {
				panelId: this.getId(),
				children: this.layout.children,
				width: 50,
			};

			const newLayout: SubPanelLayoutModel = {
				panelId: this.getId(),
				children: [
					{
						height: 100,
						children: [
							{
								panelId: this.getId(),
								children: [newPane],
								width: 100,
							},
						],
					},
				],
				width: 50,
			};

			this.layout = {
				children: [
					{
						children: [oldLayout, newLayout],
						height: 100,
					},
				],
			};
		}

		this.fireOnChange();
		return newPane;
	};

	movePane = (paneId: string, location: PaneLocation) => {
		const pane = this.removeById(paneId, 'pane');

		if (!isPane(pane)) {
			throw new Error('deleted target was not pane');
		}

		this.resolveMoveOperation(location, pane);

		this.fireOnChange();
		return pane;
	};

	removePane = (paneId: string) => {
		const pane = this.removeById(paneId, 'pane');

		if (!isPane(pane)) {
			throw new Error('deleted target was not pane');
		}

		this.fireOnChange();
		return pane;
	};

	navigateToLocationInPane = (paneId: string, uri: string): PaneModel => {
		const results = findWithId(this.layout, paneId, [], 'pane');

		if (!results) {
			throw new Error('could not find pane');
		}

		const pane = results[results.length - 1];

		if (!isPane(pane)) {
			throw new Error('target is not pane');
		}

		pane.uri = uri;
		this.fireOnChange();
		return pane;
	};

	closeAllPanesInPanel = (panelId: string) => {
		this.removeById(panelId, 'panel');
		this.fireOnChange();
	};

	closeAllPanesToRightOfPane = (paneId: string) => {
		const results = findWithId(this.layout, paneId, [], 'pane');
		if (!results) {
			throw new Error('could not find pane');
		}

		const pane = results[results.length - 1];

		if (!isPane(pane)) {
			throw new Error('target is not pane');
		}

		const parent = results[results.length - 2];
		if (!isPanel(parent)) {
			throw new Error('parent is not panel');
		}

		const index = parent.children.findIndex((x) => pane === x);

		if (index === parent.children.length - 1) {
			return;
		}

		parent.children.splice(index + 1, parent.children.length - index + 1);
		this.fireOnChange();
	};

	subscribe = (
		subscription: (layout: PanelLayoutModel) => void
	): (() => void) => {
		this.subscriptions.push(subscription);

		return () => {
			const index = this.subscriptions.findIndex((x) => x === subscription);
			this.subscriptions.splice(index, 1);
		};
	};

	private removeById(id: string, type: SearchType) {
		const resolvedLocation = findWithId(this.layout, id, [], type);
		if (!resolvedLocation) {
			throw new Error('could not resolve location');
		}

		const parent = resolvedLocation[resolvedLocation.length - 2];
		if (!hasChildren(parent)) {
			throw new Error('parent has no children');
		}

		const pane = resolvedLocation[resolvedLocation.length - 1];

		const oldPaneIndex = parent.children.findIndex((x: any) => x === pane);
		if (oldPaneIndex === -1) {
			throw new Error('target is not child of parent');
		}

		parent.children.splice(oldPaneIndex, 1);
		return pane;
	}

	private fireOnChange = () => {
		const referentiallyUnequalLayout = cloneDeep(this.layout);
		for (const sub of this.subscriptions) {
			sub(referentiallyUnequalLayout);
		}
	};

	private resolveMoveOperation = (location: PaneLocation, pane: PaneModel) => {
		const id = location.id;

		// Move operations are always relative to some existing
		// pane or panel so first resolve the location of the panel
		const searchKindByLocationKind: Record<PaneLocationKind, SearchType> = {
			inNewRowAbovePanel: 'panel',
			inNewRowBelowPanel: 'panel',
			toRightOfPanel: 'panel',
			toLeftOfPanel: 'panel',
			toLeftOfPane: 'pane',
			toRightOfPane: 'pane',
		};
		const searchKind = searchKindByLocationKind[location.kind];

		const resolvedLocation = findWithId(this.layout, id, [], searchKind);

		if (!resolvedLocation) {
			throw new MoveOperationError(location, 'could not resolve location');
		}

		const operationKind = operationKindsByLocationKind[location.kind];
		const parentAndTarget = this.getParentAndTarget(
			operationKind,
			pane,
			resolvedLocation
		);
		let { targetIndex } = parentAndTarget;
		const { parent, target } = parentAndTarget;

		if (
			(operationKind === 'addToPanel' || operationKind === 'newPanel') &&
			location.kind.includes('Right')
		) {
			targetIndex++;
		} else if (operationKind === 'newRow' && location.kind.includes('Below')) {
			targetIndex++;
		}

		parent.children.splice(targetIndex, 0, target as any);
	};

	private findByLocation = (location: PaneLocation) => {
		const id = location.id;

		const searchKindByLocationKind: Record<PaneLocationKind, SearchType> = {
			inNewRowAbovePanel: 'panel',
			inNewRowBelowPanel: 'panel',
			toRightOfPanel: 'panel',
			toLeftOfPanel: 'panel',
			toLeftOfPane: 'pane',
			toRightOfPane: 'pane',
		};
		const searchKind = searchKindByLocationKind[location.kind];

		return findWithId(this.layout, id, [], searchKind);
	};

	private getParentAndTarget = (
		operationKind: OperationKind,
		pane: PaneModel,
		resolvedLocation: ChildLocation
	): ParentAndTarget => {
		let target: ChildType = pane;
		let parentTypeCheck: (obj: any) => boolean = isPanel;

		if (operationKind === 'newRow') {
			target = {
				height: 100,
				children: [
					{
						panelId: this.getId(),
						children: [pane],
						width: 100,
					},
				],
			} as PanelRow;

			parentTypeCheck = isSubLayout;
		}

		if (operationKind === 'newPanel') {
			target = {
				width: 100,
				children: [pane],
				panelId: this.getId(),
			};

			parentTypeCheck = isPanelRow;
		}

		let parentIndex = resolvedLocation.length - 2;
		while (
			!parentTypeCheck(resolvedLocation[parentIndex]) &&
			parentIndex >= 0
		) {
			parentIndex--;
		}

		const parent = resolvedLocation[parentIndex] ?? this.layout;
		if (!hasChildren(parent)) {
			throw new Error('parent does not have children');
		}

		const immediateChild = resolvedLocation[parentIndex + 1];
		const targetIndex = parent.children.findIndex(
			(x: any) => x === immediateChild
		);
		if (targetIndex === -1) {
			throw new Error('could not resolve child in parent');
		}

		return {
			parent,
			target,
			targetIndex,
		};
	};

	private getId(): string {
		let id = cuid();
		while (!this.takenIds.has(id)) {
			id = cuid();
		}
		this.takenIds.add(id);
		return id;
	}
}

type ChildLocation = (
	| PanelRow
	| SubPanelLayoutModel
	| PanelModel
	| PaneModel
)[];

type SearchType = 'pane' | 'panel';

function findWithId(
	layout: PanelLayoutModel,
	id: string,
	location: ChildLocation,
	type: SearchType
): ChildLocation | undefined {
	for (const row of layout.children) {
		for (const child of row.children) {
			if (child.panelId === id && type === 'panel') {
				return [...location, row, child];
			}

			if (isPanel(child) && type === 'pane') {
				for (const pane of child.children) {
					if (pane.paneId === id) {
						return [...location, row, child, pane];
					}
				}
			} else if (isSubLayout(child)) {
				const foundLocation = findWithId(
					child,
					id,
					[...location, row, child],
					type
				);
				if (foundLocation) {
					return foundLocation;
				}
			}
		}
	}
}

function extractAllIds(layout: PanelLayoutModel, ids: string[]): string[] {
	for (const row of layout.children) {
		for (const child of row.children) {
			ids.push(child.panelId);

			if (isPanel(child)) {
				ids.push(...child.children.map((x) => x.paneId));
			} else if (isSubLayout(child)) {
				extractAllIds(layout, ids);
			}
		}
	}

	return ids;
}

type OperationKind = 'newRow' | 'newPanel' | 'addToPanel';

const operationKindsByLocationKind: Record<PaneLocationKind, OperationKind> = {
	inNewRowAbovePanel: 'newRow',
	inNewRowBelowPanel: 'newRow',
	toRightOfPanel: 'newPanel',
	toLeftOfPanel: 'newPanel',
	toLeftOfPane: 'addToPanel',
	toRightOfPane: 'addToPanel',
};

interface ParentAndTarget {
	parent: PanelModel | PanelRow | PanelLayoutModel;
	target: PanelModel | PanelRow | PaneModel | SubPanelLayoutModel;
	targetIndex: number;
}

export class MoveOperationError extends Error {
	constructor(location: PaneLocation, message?: string) {
		super(
			`Error constructing move operation${message ? `: ${message}` : ''} (${
				location.kind
			}, ${location.id})`
		);
	}
}
