import { query } from './query';
import { QueryExpressionKind } from './syntaxAnalyzer';

interface AnalysisResult {
	evaluatedExpressions: {
		path: string;
		expressionKind: QueryExpressionKind;
	}[];
}

export function analyzeQuery(json: any, q: string): AnalysisResult {
	const result: AnalysisResult = {
		evaluatedExpressions: [],
	};

	query(json, q, {
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
