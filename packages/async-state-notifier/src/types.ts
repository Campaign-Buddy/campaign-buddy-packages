export enum UpdateKind {
	ResolveSuccess,
	ResolveError,
	Progress,
}

export enum AsyncActionKind {
	Blocking,
	Optimisitc,
	BackgroundClient,
	BackgroundServer,
}

export interface ResolveUpdateAsyncActionOptions {
	kind: UpdateKind.ResolveError | UpdateKind.ResolveSuccess;
	message?: string;
}

export interface ProgressUpdateAsyncActionOptions {
	kind: UpdateKind.Progress;
	progress: number;
}

export type UpdateAsyncActionOptions =
	| ResolveUpdateAsyncActionOptions
	| ProgressUpdateAsyncActionOptions;

export type UpdateAsyncActionCallback = (
	options: UpdateAsyncActionOptions
) => void;

export interface StartAsyncActionOptions {
	kind: AsyncActionKind;
	message?: string;
}

export type StartAsyncActionCallback = (
	options: StartAsyncActionOptions
) => UpdateAsyncActionCallback;
