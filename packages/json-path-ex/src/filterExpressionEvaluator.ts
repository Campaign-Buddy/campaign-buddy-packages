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

export function evaluateFilterExpression(
	expression: string,
	currentElement: any,
	root: any
): boolean {
	if (expression.includes('return')) {
		throw new Error('Filter expression must not contain return statement');
	}

	if (/[^\w\d]_\$[^\w\d]|^_\$[^\w\d]|[^\w\d]_\$$|^_\$$/.test(expression)) {
		throw new Error(
			"Filter expression must not contain '_$'. It is reserved for the internal filter expression implementation."
		);
	}

	const normalizedExpression = `return ${expression.replace(/@/g, '_$')}`;

	try {
		return Boolean(
			compileCode(normalizedExpression)({ ['_$']: currentElement, ['$']: root })
		);
	} catch {
		return false;
	}
}
