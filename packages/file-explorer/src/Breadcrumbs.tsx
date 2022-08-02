import { FSItemFolder } from '@campaign-buddy/frontend-types';
import React from 'react';

export interface BreadcrumbsProps {
	currentFolder?: FSItemFolder;
	onNavigate: (folderId?: string) => void;
	breadcrumbs: FSItemFolder[];
}

interface BreadcrumbItem {
	id?: string;
	name: string;
}

export function Breadcrumbs({
	currentFolder,
	onNavigate,
	breadcrumbs,
}: BreadcrumbsProps) {
	const items: (BreadcrumbItem | undefined)[] = [
		{ id: undefined, name: 'Root' },
		...breadcrumbs,
		currentFolder,
	];

	return (
		<p>
			{items
				.filter((x): x is BreadcrumbItem => Boolean(x))
				.map((x) => (
					<a key={x.id ?? 0} onClick={() => onNavigate(x.id)}>
						{x.name}
					</a>
				))}
		</p>
	);
}
