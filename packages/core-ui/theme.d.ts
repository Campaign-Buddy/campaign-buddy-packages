// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      inputBackground: string;
      text: string;
      primary: string;
      primaryHover: string;
      primaryActive: string;
      background: string;
    };
  }
}
