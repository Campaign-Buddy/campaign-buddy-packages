enum TokenKind {
	// Keyword tokens
	Root,
	ChildSelector,
	RecursiveDescent,
	CurrentElement,
	Colon,

	// Grouping Tokens
	BracketStart,
	BracketEnd,
	AngleBracketStart,
	AngleBracketEnd,
	FilterExpressionStart,
	ExpressionStart,
	ExpressionEnd,

	// Unrecognized tokens,
	// could be an accessor
	ExpressionContent,
}

function getNextToken(query: string): [kind: TokenKind, content: string, remainingQuery: string] | undefined {
	if (!query) {
		return;
	}

	if (query.startsWith('$')) {
		return [TokenKind.Root, '$', query.substring(1)];
	}

	if (query.startsWith('..')) {
		return [TokenKind.RecursiveDescent, '..', query.substring(2)];
	}

	if (query.startsWith('.')) {
		return [TokenKind.ChildSelector, '.', query.substring(1)];
	}

	if (query.startsWith('@')) {
		return [TokenKind.CurrentElement, '@', query.substring(1)];
	}

	if (query.startsWith(':')) {
		return [TokenKind.Colon, ':', query.substring(1)];
	}

	if (query.startsWith('[')) {
		return [TokenKind.BracketStart, '[', query.substring(1)];
	}

	if (query.startsWith(']')) {
		return [TokenKind.BracketEnd, ']', query.substring(1)];
	}

	if (query.startsWith('<')) {
		return [TokenKind.AngleBracketStart, '<', query.substring(1)];
	}

	if (query.startsWith('>')) {
		return [TokenKind.AngleBracketEnd, '>', query.substring(1)];
	}

	if (query.startsWith('?(')) {
		return [TokenKind.FilterExpressionStart, '?(', query.substring(2)];
	}

	if (query.startsWith('(')) {
		return [TokenKind.ExpressionStart, '(', query.substring(1)];
	}

	if (query.startsWith(')')) {
		return [TokenKind.ExpressionEnd, ')', query.substring(1)];
	}

	const match = /^[^\.:@\<\>\?\(\)@$\[\]]+/.exec(query);

	if (!match) {
		throw new Error(`Unexpected token: ${query}`);
	}

	return [TokenKind.ExpressionContent, match[0], query.substring(match[0].length)];
}

export function tokenize(query: string): [kind: TokenKind, content: string][] {
	if (!query) {
		return [];
	}

	const allResults: [TokenKind, string][] = [];
	let cur = getNextToken(query);
	while (cur) {
		const [kind, content, remaining] = cur;
		allResults.push([kind, content]);
		cur = getNextToken(remaining);
	}

	return allResults;
}
