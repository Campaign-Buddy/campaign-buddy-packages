import React, { useCallback } from 'react';
import { Link } from '../text';

interface LinkButtonProps {
	onClick: () => void;
}

export const LinkButton: React.FC<React.PropsWithChildren<LinkButtonProps>> = ({
	onClick,
	children,
}) => {
	const handleClick = useCallback(
		(e: any) => {
			e.preventDefault();
			onClick();
		},
		[onClick]
	);

	return <Link onClick={handleClick}>{children}</Link>;
};
