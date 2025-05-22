import { Button } from '@campaign-buddy/primitive-ui';
import { useNavigate } from '../routing';

export function HomePage() {
	const navigate = useNavigate();
	return (
		<div>
			<p>TODO: Add ability to select or create campaign</p>
			<Button
				onClick={() => navigate({ page: 'campaign', campaignId: '1234' })}
			>
				Do it
			</Button>
		</div>
	);
}
