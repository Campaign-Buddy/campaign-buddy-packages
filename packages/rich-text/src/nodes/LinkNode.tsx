import React from 'react';
import { Popover, LinkButton } from '@campaign-buddy/core-ui';
import { useBooleanState } from '@campaign-buddy/common-hooks';
import { ElementNodeProps, LinkNode as LinkNodeType } from '../types';

export const LinkNode: React.FC<ElementNodeProps<LinkNodeType>> = ({
	attributes,
	children,
}) => {
	const [isPopoverOpen, openPopover, closePopover] = useBooleanState();

	return (
		<span {...attributes}>
			<Popover
				isOpen={isPopoverOpen}
				onClose={closePopover}
				content="Here is a link"
				placement="bottom"
			>
				<LinkButton onClick={openPopover}>{children}</LinkButton>
			</Popover>
		</span>
	);
};
