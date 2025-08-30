import { ThemeProvider } from '@campaign-buddy/react-theme-provider';
import styled from 'styled-components';
import { themes, semanticThemes } from '@campaign-buddy/themes';
import { DragProvider } from '@campaign-buddy/drag-drop';
import { HomePage } from './pages/HomePage';
import { CampaignPage } from './pages/CampaignPage';
import { PageComponentMap } from './routing/PageProps';
import { NavigationProvider } from './routing';
import { backgroundColor, themed } from '@campaign-buddy/theme-util';
import { DragLayer } from './components/DragLayer';

const pages: PageComponentMap = {
	campaign: CampaignPage,
	home: HomePage,
};

const Background = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	${backgroundColor(themed.colors.background.app)}
	color: ${themed.colors.primaryText.onBackground};
`;

function App(): React.JSX.Element {
	return (
		<ThemeProvider
			theme={themes.parchment}
			semanticTheme={semanticThemes.parchment}
		>
			<Background>
				<DragProvider>
					<NavigationProvider
						pages={pages}
						initialLocation={{ page: 'home' }}
					/>
					<DragLayer />
				</DragProvider>
			</Background>
		</ThemeProvider>
	);
}

export default App;
