import { FSItemFolder } from '@campaign-buddy/frontend-types';
import { Button, Icon, CampaignBuddyIcon } from '@campaign-buddy/core-ui';
import React, { Fragment } from 'react';
import { BreadcrumbContainer } from './Breadcrumbs.styled';

export interface BreadcrumbsProps {
	currentFolder?: FSItemFolder;
	onNavigate: (folderId?: string) => void;
	rootIcon?: CampaignBuddyIcon;
	breadcrumbs: FSItemFolder[];
}

export function Breadcrumbs({
	currentFolder,
	onNavigate,
	breadcrumbs,
	rootIcon,
}: BreadcrumbsProps) {
	const items = [...breadcrumbs, currentFolder];

	return (
		<BreadcrumbContainer>
			<Button
				variant="minimal"
				size="small"
				icon={rootIcon ?? 'cube'}
				onClick={() => onNavigate()}
			/>
			{items
				.filter((x): x is FSItemFolder => Boolean(x))
				.map((x) => (
					<Fragment key={x.id}>
						<Icon icon="chevron-right" />
						<Button
							variant="minimal"
							size="small"
							icon="folder-close"
							onClick={() => onNavigate(x.id)}
						>
							{x.name}
						</Button>
					</Fragment>
				))}
		</BreadcrumbContainer>
	);
}
