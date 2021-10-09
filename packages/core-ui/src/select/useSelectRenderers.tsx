import React, { useCallback } from 'react';
import {
	ItemListRenderer,
	ItemRenderer,
} from '@blueprintjs/select';
import { IOption } from './IOption';
import { StyledMenu, StyledMenuItem } from '../menu/Menu.styled';
import { NoResults } from './Select.styled';

export function useSelectRenderers() {
	const renderMenu = useCallback<ItemListRenderer<IOption>>(
		({ items, itemsParentRef, renderItem }) => {
			const renderedItems = items
				.map(renderItem)
				.filter((item) => item != null);

			return (
				<StyledMenu ulRef={itemsParentRef}>{
					items.length === 0
						? <NoResults>No results</NoResults>
						: renderedItems
				}</StyledMenu>
			);
		},
		[]
	);

	const renderItem = useCallback<ItemRenderer<IOption>>(
		(option, { handleClick, modifiers }) => (
			<StyledMenuItem
				active={modifiers.active}
				key={option.id}
				onClick={handleClick}
				text={option.displayValue}
			/>
		),
		[]
	);

	return { renderMenu, renderItem };
}
