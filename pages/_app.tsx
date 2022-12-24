import type { AppProps } from 'next/app'
import TitleBar from '../components/TitleBar'
import * as theme from '../styles/theme'
import useColorScheme from '../styles/useColorScheme'

import { ThemeProvider } from 'styled-components'
import GlobalStyle from '../styles/GlobalStyle'

export default function App({ Component, pageProps }: AppProps) {
  const colorScheme = useColorScheme();
  
  const themeWithSchemeSelected = {
    ...theme,
    colorPalette: colorScheme === 'dark' ? theme.colorPaletteDark : theme.colorPalette,
  }

  return (
    <ThemeProvider theme={themeWithSchemeSelected}>
      <GlobalStyle/>
      <TitleBar/>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
