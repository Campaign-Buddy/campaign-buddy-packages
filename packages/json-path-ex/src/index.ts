import { evaluateFilterExpression } from './filterExpressionEvaluator';
import { popQueryExpression, QueryExpressionKind } from './syntaxAnalyzer';

interface EvaluationResult {
	path: string;
	data: any;
}

interface QueryOptions {
	customDataAccessor?: (path: string, data: any) => any;
	serializeObjectsInSubQuery?: (obj: any) => string;
}

export function query(json: any, q: string, options?: QueryOptions) {
	if (!q) {
		return undefined;
	}

	const cleanedQuery = resolveSubQueries(json, q, options);

	if (!cleanedQuery) {
		return undefined;
	}

	return _query(json, cleanedQuery, options ?? {});
}

export function resolveSubQueries(json: any, q: string, options?: QueryOptions): string | undefined {
	let curQuery = q;
	let prevQuery = '';
	const errorMessage = 'SubQuery must resolve to a single primitive';

	const {
		serializeObjectsInSubQuery
	} = options ?? {};

	while (prevQuery !== curQuery) {
		prevQuery = curQuery;

		try {
			curQuery = curQuery.replace(/\{([^\{\}]+)\}/g, (match, subQuery) => {
				const result = _query(json, subQuery, options ?? {});
		
				if (typeof result === 'object' || result === undefined) {
					if (!serializeObjectsInSubQuery) {
						throw new Error(errorMessage);
					}

					return serializeObjectsInSubQuery(result);
				}
		
				return JSON.stringify(result);
			});
		} catch (err) {
			if (err.message === errorMessage) {
				return undefined;
			}

			throw err;
		}
	}

	return curQuery;
}

function _query(json: any, q: string, options: QueryOptions): any | undefined {
	if (!q) {
		return undefined;
	}

	let allResults: EvaluationResult[] = [
		{
			path: '$',
			data: json,
		},
	];

	let expressionResult = popQueryExpression(q);
	let i = 0;

	while (expressionResult) {
		const [expression, remainingQuery] = expressionResult;

		if (options.customDataAccessor) {
			allResults = allResults.map((x) => ({
				path: x.path,
				data: options.customDataAccessor?.(x.path, x.data),
			}));
		}

		allResults = allResults.filter(hasData);

		if (expression.kind === QueryExpressionKind.Root) {
			if (i !== 0) {
				throw new Error('Root accessor must only be at the beginning of a query')
			}
		} else if (expression.kind === QueryExpressionKind.RecursiveDescent) {
			allResults = evaluateRecursiveDescent(allResults);
		} else if (expression.kind === QueryExpressionKind.ValueFilter) {
			allResults = evaluateValueFilter(allResults, expression.content, json, options);
		} else if (expression.kind === QueryExpressionKind.KeyFilter) {
			allResults = evaluateKeyFilter(allResults, expression.content, json);
		} else if (expression.kind === QueryExpressionKind.PropertyAccessor) {
			allResults = evaluatePropertyAccessor(allResults, expression.content);
		} else if (expression.kind === QueryExpressionKind.WildCard) {
			allResults = evaluateWildCard(allResults);
		} else if (expression.kind === QueryExpressionKind.Slice) {
			allResults = evaluateSlice(allResults, expression.content);
		}

		if (allResults.length === 0) {
			return undefined;
		}

		i++;
		expressionResult = popQueryExpression(remainingQuery);
	}

	if (options.customDataAccessor) {
		allResults = allResults.map((x) => ({
			path: x.path,
			data: options.customDataAccessor?.(x.path, x.data),
		}));
	}

	allResults = allResults.filter(hasData);

	if (allResults.length === 1) {
		return allResults[0].data;
	}

	return allResults.map(({ data }) => data);
}

function evaluateWildCard(jsonResults: EvaluationResult[]): EvaluationResult[] {
	const allResults: EvaluationResult[] = [];

	for (const result of jsonResults) {
		const entries = Object.entries(result.data);
		allResults.push(...entries.map(([key, value]) => ({
			path: `${result.path}.${key}`,
			data: value,
		})));
	}

	return allResults;
}

function evaluateRecursiveDescent(jsonResults: EvaluationResult[], isFirstCall = true): EvaluationResult[] {
	const allResults: EvaluationResult[] = [];

	for (const result of jsonResults) {
		const entries = Object.entries(result.data);

		if (typeof result.data === 'object' && isFirstCall) {
			allResults.push(result);
		}

		for (const [key, value] of entries) {
			if (typeof value === 'object') {
				allResults.push({
					path: `${result.path}.${key}`,
					data: value,
				});

				allResults.push(...evaluateRecursiveDescent([{
					path: `${result.path}.${key}`,
					data: value,
				}], false));
			}
		}
	}

	return allResults;
}

function evaluateValueFilter(jsonResults: EvaluationResult[], filterExpression: string, root: any, options?: QueryOptions): EvaluationResult[] {
	const allResults: EvaluationResult[] = [];

	for (const result of jsonResults) {
		const values = Object.entries(result.data);

		for (const [key, rawValue] of values) {
			const value = options?.customDataAccessor
				? options.customDataAccessor?.(`${result.path}.${key}`, rawValue)
				: rawValue;

			if (evaluateFilterExpression(filterExpression, value, root)) {
				allResults.push({
					path: `${result.path}.${key}`,
					data: value,
				});
			}
		}
	}

	return allResults;
}

function evaluateKeyFilter(jsonResults: EvaluationResult[], filterExpression: string, root: any): EvaluationResult[] {
	const allResults: EvaluationResult[] = [];

	for (const result of jsonResults) {
		const entries = Object.entries(result.data);

		for (const [key, value] of entries) {
			if (evaluateFilterExpression(filterExpression, key, root)) {
				allResults.push({
					path: `${result.path}.${key}`,
					data: value,
				});
			}
		}
	}

	return allResults;
}

function evaluatePropertyAccessor(jsonResults: EvaluationResult[], property: string): EvaluationResult[] {
	const allResults: EvaluationResult[] = [];

	for (const result of jsonResults) {
		if (typeof result.data === 'object') {
			allResults.push({
				path: `${result.path}.${property}`,
				data: result.data[property],
			});
		}
	}

	return allResults;
}

function evaluateSlice(jsonResults: EvaluationResult[], content: string): EvaluationResult[] {
	const allResults: EvaluationResult[] = [];

	const [startRaw, endRaw, stepRaw] = content.split(':');
	const start = parseInt(startRaw);
	const end = endRaw ? parseInt(endRaw) : Infinity;
	const step = parseInt(stepRaw);

	if (step <= 0) {
		throw new Error('Step must be a positive non-zero integer');
	}

	if (start > end) {
		return [];
	}

	for (const result of jsonResults) {
		if (typeof result.data === 'object' && Array.isArray(result.data)) {
			const trueEnd = Math.min(result.data.length, end);			

			for (let i = start; i < trueEnd; i += step) {
				allResults.push({
					path: `${result.path}.${i}`,
					data: result.data[i],
				});
			}
		}
	}

	return allResults;
}

function hasData(x: EvaluationResult) {
	return x.data !== undefined && x.data !== null;
}
