import { FSItemFolder } from '@campaign-buddy/frontend-types';
import { Button, Icon } from '@campaign-buddy/core-ui';
import React from 'react';
import { BreadcrumbContainer } from './Breadcrumbs.styled';

export interface BreadcrumbsProps {
	currentFolder?: FSItemFolder;
	onNavigate: (folderId?: string) => void;
	breadcrumbs: FSItemFolder[];
}

export function Breadcrumbs({
	currentFolder,
	onNavigate,
	breadcrumbs,
}: BreadcrumbsProps) {
	const items = [...breadcrumbs, currentFolder];

	return (
		<BreadcrumbContainer>
			<Button
				style="minimal"
				size="small"
				icon="cube"
				onClick={() => onNavigate()}
			/>
			{items
				.filter((x): x is FSItemFolder => Boolean(x))
				.map((x) => (
					<>
						<Icon icon="chevron-right" />
						<Button
							style="minimal"
							size="small"
							icon={'folder-close'}
							key={x.id}
							onClick={() => onNavigate(x.id)}
						>
							{x.name}
						</Button>
					</>
				))}
		</BreadcrumbContainer>
	);
}
