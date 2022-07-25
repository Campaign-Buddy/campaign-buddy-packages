import React from 'react';

export function List({
	children,
}: React.PropsWithChildren<Record<string, unknown>>) {
	return <ul>{children}</ul>;
}

export function ListItem({
	children,
}: React.PropsWithChildren<Record<string, unknown>>) {
	return <li>{children}</li>;
}

export interface ListItemTextProps {
	text: React.ReactNode;
}

export function ListItemText({ text }: ListItemTextProps) {
	return <span>{text}</span>;
}
