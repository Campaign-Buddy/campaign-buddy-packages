export interface PanelLayoutDto {
	kind: 'panelLayout';
	children: PanelRowDto[];
	sizes: number[];
}

export interface PanelRowDto {
	kind: 'panelRow';
	children: (PanelDto | PanelLayoutDto)[];
	sizes: number[];
}

export interface PanelDto {
	kind: 'panel';
	children: PaneDto[];
}

export interface PaneDto {
	kind: 'pane';
	location: string;
}

export type PanelParent = PanelLayoutDto | PanelRowDto | PanelDto;

function hasChildren(obj: any) {
	return obj && Array.isArray(obj.children);
}

function hasSizes(obj: any) {
	return obj && Array.isArray(obj.sizes);
}

export function isPanelLayoutModel(obj: any): obj is PanelLayoutDto {
	return obj.kind === 'panelLayout' && hasChildren(obj) && hasSizes(obj);
}

export function isPanelRowModel(obj: any): obj is PanelRowDto {
	return obj.kind === 'panelRow' && hasChildren(obj) && hasSizes(obj);
}

export function isPanelModel(obj: any): obj is PanelDto {
	return obj.kind === 'panel' && hasChildren(obj);
}

export function isPaneModel(obj: any): obj is PaneDto {
	return obj.kind === 'pane' && typeof obj.location === 'string';
}
