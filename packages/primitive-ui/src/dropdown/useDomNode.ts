import { useEffect, useState } from 'react';

export function useDomNode(selector = 'body') {
	const [portalElement, setPortalElement] = useState<HTMLElement | undefined>();

	useEffect(() => {
		const element = document.querySelector(selector);
		setPortalElement(element instanceof HTMLElement ? element : undefined);
	}, [selector]);

	return portalElement;
}
