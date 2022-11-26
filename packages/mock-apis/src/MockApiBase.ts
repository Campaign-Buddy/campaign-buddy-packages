import { getRandomString } from './getRandomString';

export interface MockApiBaseOptions {
	mockLatencyMs?: number;
}

export abstract class MockApiBase {
	private mockLatencyMs: number;

	constructor(options: MockApiBaseOptions) {
		this.mockLatencyMs = options.mockLatencyMs ?? 1000;
	}

	protected simulateLatency = (): Promise<void> => {
		return new Promise((resolve) => {
			setTimeout(() => resolve(), this.mockLatencyMs);
		});
	};

	protected generateId = () => getRandomString();
}
