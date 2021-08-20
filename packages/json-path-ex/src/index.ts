import { evaluateFilterExpression } from './filterExpressionEvaluator';
import { popQueryExpression, QueryExpressionKind } from './syntaxAnalyzer';

export function query(json: any, q: string) {
	if (!q) {
		return undefined;
	}

	const cleanedQuery = resolveSubQueries(json, q);

	if (!cleanedQuery) {
		return undefined;
	}

	return _query(json, cleanedQuery);
}

export function resolveSubQueries(json: any, q: string, serializeObjects?: (obj: any) => string): string | undefined {
	let curQuery = q;
	let prevQuery = '';
	const errorMessage = 'SubQuery must resolve to a single primitive';

	while (prevQuery !== curQuery) {
		prevQuery = curQuery;

		try {
			curQuery = curQuery.replace(/\{([^\{\}]+)\}/g, (match, subQuery) => {
				const result = _query(json, subQuery);
		
				if (typeof result === 'object' || result === undefined) {
					if (!serializeObjects) {
						throw new Error(errorMessage);
					}

					return serializeObjects(result);
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

function _query(json: any, q: string): any | undefined {
	if (!q) {
		return undefined;
	}

	let allResults = [json];
	let expressionResult = popQueryExpression(q);
	let i = 0;

	while (expressionResult) {
		const [expression, remainingQuery] = expressionResult;

		if (expression.kind === QueryExpressionKind.Root) {
			if (i !== 0) {
				throw new Error('Root accessor must only be at the beginning of a query')
			}
		} else if (expression.kind === QueryExpressionKind.RecursiveDescent) {
			allResults = evaluateRecursiveDescent(allResults);
		} else if (expression.kind === QueryExpressionKind.ValueFilter) {
			allResults = evaluateValueFilter(allResults, expression.content, json);
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

	if (allResults.length === 1) {
		return allResults[0];
	}

	return allResults;
}

function evaluateWildCard(jsonResults: any[]): any[] {
	const allResults = [];

	for (const result of jsonResults) {
		const values = Object.values(result);
		allResults.push(...values);
	}

	return allResults;
}

function evaluateRecursiveDescent(jsonResults: any[], isFirstCall = true): any[] {
	const allResults = [];

	for (const result of jsonResults) {
		const values = Object.values(result);

		if (typeof result === 'object' && isFirstCall) {
			allResults.push(result);
		}

		for (const value of values) {
			if (typeof value === 'object') {
				allResults.push(value);
				allResults.push(...evaluateRecursiveDescent([value], false));
			}
		}
	}

	return allResults;
}

function evaluateValueFilter(jsonResults: any[], filterExpression: string, root: any): any[] {
	const allResults = [];

	for (const result of jsonResults) {
		const values = Object.values(result);

		for (const value of values) {
			if (evaluateFilterExpression(filterExpression, value, root)) {
				allResults.push(value);
			}
		}
	}

	return allResults;
}

function evaluateKeyFilter(jsonResults: any[], filterExpression: string, root: any): any[] {
	const allResults = [];

	for (const result of jsonResults) {
		const keys = Object.keys(result);

		for (const key of keys) {
			if (evaluateFilterExpression(filterExpression, key, root)) {
				allResults.push(result[key]);
			}
		}
	}

	return allResults;
}

function evaluatePropertyAccessor(jsonResults: any[], property: string): any[] {
	const allResults = [];

	for (const result of jsonResults) {
		if (typeof result === 'object' && result[property] !== undefined && result[property] !== null) {
			allResults.push(result[property]);
		}
	}

	return allResults;
}

function evaluateSlice(jsonResults: any[], content: string): any[] {
	const allResults = [];

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
		if (typeof result === 'object' && Array.isArray(result)) {
			const trueEnd = Math.min(result.length, end);			

			for (let i = start; i < trueEnd; i += step) {
				allResults.push(result[i]);
			}
		}
	}

	return allResults;
}
