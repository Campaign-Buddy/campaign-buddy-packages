import React from 'react';
import { useSelected, useFocused } from 'slate-react';
import styled from 'styled-components';
import { ElementNodeProps, ImageNode as ImageNodeType } from '../types';

export const ImageNode: React.FC<
	React.PropsWithChildren<ElementNodeProps<ImageNodeType>>
> = ({ element, attributes, children }) => {
	const selected = useSelected();
	const focused = useFocused();

	return (
		<div {...attributes}>
			{children}
			<div contentEditable={false}>
				<Image
					src={element.src}
					alt={element.alt}
					shouldHighlight={selected && focused}
				/>
			</div>
		</div>
	);
};
const Image = styled.img<{ shouldHighlight: boolean }>`
	display: block;
	max-width: 100%;
	max-height: 20em;
	box-shadow: ${({ shouldHighlight }) =>
		shouldHighlight ? '0 0 0 3px #B4D5FF' : 'none'};
`;
