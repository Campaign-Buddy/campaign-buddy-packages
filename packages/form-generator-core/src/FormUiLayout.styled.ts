import styled from 'styled-components';
import { calculateFlex } from './utility';

export const MinWidthContent = styled.div<{ minWidth: number }>`
	min-width: ${({ minWidth }) => minWidth}px;
`;

export const FormCell = styled.div<{ cols: number }>`
	margin-bottom: 4px;
	flex: ${({ cols }) => calculateFlex(cols)};
	min-width: 100px;
`;

export const WhiteSpace = styled.div<{ cols: number; marginBottom?: number }>`
	margin-bottom: ${({ marginBottom }) => marginBottom ?? 0}px;
	flex: ${({ cols }) => calculateFlex(cols)};
	min-width: 100%;
`;

export const FormRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	column-gap: 8px;
`;

export const ColumnLayout = styled.div`
	display: flex;
	min-width: 100px;
	flex-wrap: wrap;
	flex-direction: row;
	width: 100%;
	column-gap: 8px;
`;

export const FormColumn = styled.div<{ cols: number }>`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	column-gap: 8px;
	flex: ${({ cols }) => calculateFlex(cols)};
	align-content: flex-start;
`;
