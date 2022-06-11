import React, { useState } from 'react';
import { Overflow, ItemProps, OverflowedItemsProps } from '../src';
export default {
	title: 'overflow/Overflow',
};

const StringItem = ({ item, itemRef }: ItemProps<string, HTMLSpanElement>) => (
	<span ref={itemRef}>{item}</span>
);

const StringItemOverflow = ({ items }: OverflowedItemsProps<string>) => (
	<span>+{items.length}</span>
);

const stringItemId = (item: string) => item;

export const Primary = () => {
	const [items] = useState([
		'hi',
		'bye',
		'goodbye',
		'hello there',
		'well well well well well well',
	]);

	return (
		<Overflow
			items={items}
			ItemComponent={StringItem}
			OverflowedItemsComponent={StringItemOverflow}
			getItemId={stringItemId}
		/>
	);
};
