export type AsyncActionKind =
	| 'blocking'
	| 'optimisitic'
	| 'background-client'
	| 'background-server';

export interface UpdateAsyncOperationResult {
	isResolved: boolean;
}

export interface ProgressOperationOptions {
	progress: number;
}

export interface ResolveOperationOptions {
	message?: string;
}

export interface AsyncOperationState {
	readonly id: string;
	readonly kind: AsyncActionKind;
	readonly progress: number;
}

export interface AsyncOperation {
	readonly state: AsyncOperationState;

	progress: (options: ProgressOperationOptions) => UpdateAsyncOperationResult;
	succeed: (options?: ResolveOperationOptions) => UpdateAsyncOperationResult;
	fail: (options?: ResolveOperationOptions) => UpdateAsyncOperationResult;
}

export interface StartAsyncActionOptions {
	kind: AsyncActionKind;
	message?: string;
}

export type StartAsyncActionCallback = (
	options: StartAsyncActionOptions
) => AsyncOperation;
