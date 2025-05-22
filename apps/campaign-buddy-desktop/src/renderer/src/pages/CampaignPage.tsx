import { Button } from '@campaign-buddy/primitive-ui';
import { useNavigate } from '@renderer/routing';

export function CampaignPage() {
	const navigate = useNavigate();
	return (
		<div>
			<p>This is the campaign page</p>
			<Button onClick={() => navigate({ page: 'home' })}>Go back</Button>
		</div>
	);
}
