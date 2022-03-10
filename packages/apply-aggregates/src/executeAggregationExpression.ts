import {
	resolveSubQueries,
	unescapeString,
} from '@campaign-buddy/json-path-ex';
import * as aggregateFunctions from './aggregateFunctions';

/**
 * Copied from https://blog.risingstack.com/writing-a-javascript-framework-sandboxed-code-evaluation/
 */
function compileCode(src: string) {
	src = `with (sandbox) {${src}}`;
	const code = new Function('sandbox', src);

	return function (sandbox: any) {
		const sandboxProxy = new Proxy(sandbox, { has, get });
		return code(sandboxProxy);
	};
}

function has() {
	return true;
}

function get(target: any, key: any) {
	if (key === Symbol.unscopables) return undefined;
	return target[key];
}

function _executeAggregationExpression(
	expression: string,
	baseValue: any
): any {
	const normalizedExpression = `return (${expression.replace(
		/<base>/gi,
		'base'
	)});`;

	try {
		return compileCode(normalizedExpression)({
			...aggregateFunctions,
			base: baseValue,
		});
	} catch {
		return undefined;
	}
}

export function executeAggregationExpression(
	expression: string,
	rootData: any,
	curValue: any,
	customDataAccessor: (path: string, value: any) => any
): any {
	if (expression.includes('return')) {
		throw new Error('Filter expression must not contain return statement');
	}

	let cleanedExpression = resolveSubQueries(rootData, expression, {
		serializeObjectsInSubQuery: (result) => JSON.stringify(result),
		customDataAccessor,
	});

	if (cleanedExpression) {
		cleanedExpression = unescapeString(cleanedExpression);
	}

	return _executeAggregationExpression(
		cleanedExpression ?? expression,
		curValue
	);
}
