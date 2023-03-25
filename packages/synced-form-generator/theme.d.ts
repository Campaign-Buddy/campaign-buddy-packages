// import original module declarations
import 'styled-components';
import { ITheme } from '@campaign-buddy/themes';

// and extend them!
declare module 'styled-components' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface DefaultTheme extends ITheme {}
}
