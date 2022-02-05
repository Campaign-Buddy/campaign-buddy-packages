import { baseInputCss, defaultTheme } from '@campaign-buddy/core-ui';
import { Editable } from 'slate-react';
import styled from 'styled-components';

export const EditorContainer = styled.div<{ variant?: 'default' | 'minimal' }>`
	${({ variant }) => (variant === 'minimal' ? '' : baseInputCss)}
	padding: 0;
`;
EditorContainer.defaultProps = {
	theme: defaultTheme,
};

interface StyledEditableProps {
	minHeight?: string;
	maxHeight?: string;
}

export const StyledEditable = styled(Editable)<StyledEditableProps>`
	padding: 8px 12px;
	min-height: ${({ minHeight }) => minHeight ?? '100px'};
	${({ maxHeight }) => maxHeight && `max-height: ${maxHeight};`}
	overflow-y: auto;
`;
