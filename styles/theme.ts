import tinycolor from 'tinycolor2'

type ColorPalette = {
    background: string
    background2?: string
    text: string
    accent: string
    answerError: string
    answerSuccess: string
}

export const colorPalette: ColorPalette = {
    background: '#F8F4EA',
    text: '#579BB1',
    accent: '#FD8A8A',
    answerError: '#FF597B',
    answerSuccess: '#88A47C'
}
colorPalette['background2'] = tinycolor(colorPalette.background).darken(10).toString()

export const colorPaletteDark: ColorPalette = {
    background: '#041C32',
    text: '#ECB365',
    accent: '#064663',
    answerError: '#FF597B',
    answerSuccess: '#88A47C'
}
colorPaletteDark['background2'] = tinycolor(colorPaletteDark.background).darken(10).toString()

export const space = ['40px', '20px', '10px', '5px', '2px']

export const fontSizes = ['40px', '24px', '18px']

export const font = 'Helvetica'

export const borderRadius = '5px'