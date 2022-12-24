import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    html, body {
    background-color: ${props => props.theme.colorPalette.background};
    padding: 0;
    margin: 0;
    font-family: ${props => props.theme.font};
    color: ${props => props.theme.colorPalette.text};
    }
`
