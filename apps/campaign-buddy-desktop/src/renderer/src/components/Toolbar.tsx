import { Button } from '@campaign-buddy/primitive-ui';
import { useNavigate } from '../routing';

export function Toolbar({ debug }: { debug: () => void }) {
	const navigate = useNavigate();

	return (
		<div>
			This is the toolbar{' '}
			<Button onClick={() => navigate({ page: 'home' })}>Go home</Button>
			<Button onClick={() => debug()} variant="minimal">
				Debug
			</Button>
		</div>
	);
}
