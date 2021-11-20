import { resolveSubQueries } from './query';
import { QueryExpressionKind } from './syntaxAnalyzer';

interface AnalysisResult {
	evaluatedExpressions: {
		path: string;
		expressionKind: QueryExpressionKind;
	}[];
}

export function analyzeQuery(json: any, q: string): AnalysisResult {
	return analyzeSubQueries(json, `{${q}}`);
}

export function analyzeSubQueries(json: any, q: string): AnalysisResult {
	const result: AnalysisResult = {
		evaluatedExpressions: [],
	};

	resolveSubQueries(json, q, {
		onEvaluatingExpression: (paths, expressionKind) => {
			result.evaluatedExpressions.push(
				...paths.map((path) => ({
					path,
					expressionKind,
				}))
			);
		},
	});

	return result;
}
