import { ThemeProvider } from '@campaign-buddy/react-theme-provider';
import { themes, semanticThemes } from '@campaign-buddy/themes';
import { MemoryRouter, Route, Routes } from 'react-router';
import { HomePage } from './pages/HomePage';
import { CampaignPage } from './pages/CampaignPage';

function App(): React.JSX.Element {
	return (
		<div>
			<p>The app</p>
			<ThemeProvider
				theme={themes.parchment}
				semanticTheme={semanticThemes.parchment}
			>
				<MemoryRouter>
					<Routes>
						<Route path="/" Component={HomePage} />
						<Route path="/campaign/:campaignId" Component={CampaignPage} />
					</Routes>
				</MemoryRouter>
			</ThemeProvider>
		</div>
	);
}

export default App;
