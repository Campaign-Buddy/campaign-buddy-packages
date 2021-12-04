import React, { useCallback } from 'react';
import { Link } from '../text';

interface LinkButtonProps {
	onClick: () => void;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
	onClick,
	children,
}) => {
	const handleClick = useCallback(
		(e) => {
			e.preventDefault();
			onClick();
		},
		[onClick]
	);

	return <Link onClick={handleClick}>{children}</Link>;
};
