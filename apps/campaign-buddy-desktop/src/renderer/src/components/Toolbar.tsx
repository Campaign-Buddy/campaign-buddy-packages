import { Button } from '@campaign-buddy/primitive-ui';
import { useNavigate } from '../routing';

export function Toolbar() {
	const navigate = useNavigate();

	return (
		<div>
			This is the toolbar{' '}
			<Button onClick={() => navigate({ page: 'home' })}>Go home</Button>
		</div>
	);
}
