import { useNavigate } from 'react-router';
import { Button } from '@campaign-buddy/primitive-ui';
import { routes } from '../routes';

export function HomePage() {
	const navigate = useNavigate();
	return (
		<div>
			<p>TODO: Add ability to select or create campaign</p>
			<Button onClick={() => navigate(routes.campaign('1234'))}>Do it</Button>
		</div>
	);
}
