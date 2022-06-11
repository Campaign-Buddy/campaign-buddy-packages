import React, { useCallback, useState } from 'react';
import { Overflow, ItemProps, OverflowedItemsProps } from '../src';
import { ResizableDiv } from './ResizableDiv';
export default {
	title: 'overflow/Overflow',
};

const ObjectItem = ({
	item,
	itemRef,
}: ItemProps<{ text: string }, HTMLDivElement>) => (
	<div ref={itemRef}>
		<div style={{ padding: '8px 4px', boxSizing: 'border-box' }}>
			<span>{item.text}</span>
		</div>
	</div>
);

const StringItem = ({ item, itemRef }: ItemProps<string, HTMLSpanElement>) => (
	<span ref={itemRef}>{item}</span>
);

const CountOverflow = ({ items }: OverflowedItemsProps<any>) => (
	<span>+{items.length}</span>
);

const stringItemId = (item: string) => item;
const objectItemId = (item: { id: number }) => item.id.toString();

export const Primary = () => {
	const [items] = useState([
		'hi',
		'bye',
		'goodbye',
		'hello there',
		'well well well well well well',
	]);

	return (
		<ResizableDiv>
			<Overflow
				items={items}
				ItemComponent={StringItem}
				OverflowedItemsComponent={CountOverflow}
				getItemId={stringItemId}
			/>
		</ResizableDiv>
	);
};

export const Objects = () => {
	const [items, setItems] = useState([
		{ text: 'hi', id: 1 },
		{ text: 'bye', id: 2 },
		{ text: 'goodbye', id: 3 },
		{ text: 'hello there', id: 4 },
		{ text: 'well well well well well well', id: 5 },
	]);

	const onInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setItems((prev) => [{ text: e.target.value, id: 1 }, ...prev.slice(1)]);
		},
		[]
	);

	return (
		<>
			<input value={items[0]?.text} onChange={onInputChange} />
			<ResizableDiv>
				<Overflow
					items={items}
					ItemComponent={ObjectItem}
					OverflowedItemsComponent={CountOverflow}
					getItemId={objectItemId}
				/>
			</ResizableDiv>
		</>
	);
};
