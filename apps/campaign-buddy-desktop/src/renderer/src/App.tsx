import { ThemeProvider } from '@campaign-buddy/react-theme-provider';
import styled from 'styled-components';
import { themes, semanticThemes } from '@campaign-buddy/themes';
import { DragProvider } from '@campaign-buddy/drag-drop';
import { HomePage } from './pages/HomePage';
import { CampaignPage } from './pages/CampaignPage';
import { PageComponentMap } from './routing/PageProps';
import { NavigationProvider } from './routing';

const pages: PageComponentMap = {
	campaign: CampaignPage,
	home: HomePage,
};

const Background = styled.div`
	width: 100%;
	height: 100%;
	background-color: ${({ theme }) => theme.colors.background.app};
	color: ${({ theme }) => theme.colors.primaryText.onBackground};
`;

function App(): React.JSX.Element {
	return (
		<ThemeProvider
			theme={themes.parchment}
			semanticTheme={semanticThemes.parchment}
		>
			<DragProvider>
				<Background>
					<NavigationProvider
						pages={pages}
						initialLocation={{ page: 'home' }}
					/>
				</Background>
			</DragProvider>
		</ThemeProvider>
	);
}

export default App;
