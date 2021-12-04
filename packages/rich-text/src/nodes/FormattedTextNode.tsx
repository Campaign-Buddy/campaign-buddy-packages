import React from 'react';
import styled from 'styled-components';
import {
	Formatting,
	LeafNodeProps,
	FormattedText as FormattedTextType,
} from '../types';

function conditionalFormatting<T extends keyof Formatting>(
	key: T,
	styles: string | ((value: Formatting[T]) => string)
) {
	return (formatting: Formatting) => {
		if (formatting[key] === undefined) {
			return '';
		}

		if (typeof styles === 'string') {
			return styles;
		}

		return styles(formatting[key]);
	};
}

const FormattedText = styled.span<Formatting>`
	${conditionalFormatting('isBold', 'font-weight: bold;')}
	${conditionalFormatting('isItalic', 'font-style: italic;')}
	${conditionalFormatting('isUnderline', 'text-decoration: underline;')}
`;

export const FormattedTextNode: React.FC<LeafNodeProps<FormattedTextType>> = ({
	leaf,
	attributes,
	children,
}) => {
	return (
		<FormattedText {...attributes} {...(leaf ?? {})}>
			{children}
		</FormattedText>
	);
};
