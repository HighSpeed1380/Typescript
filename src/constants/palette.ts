import { PaletteOptions } from '@mui/material'

declare module '@mui/material/styles' {
  interface Palette {
    black: string
    green: {
      dark: string
      middle: string
      light1: string
      light2: string
    }
    orange: {
      dark: string
      middle: string
      light1: string
      light2: string
    }
  }

  interface BreakpointOverrides {
    xs: true
    sm: true
    md: true
    lg: true
    xl: true
    xxl: true
  }

  interface PaletteOptions {
    black: string
    green: {
      dark: string
      middle: string
      light1: string
      light2: string
    }
    orange: {
      dark: string
      middle: string
      light1: string
      light2: string
    }
  }
}

export const palette: {
  light: PaletteOptions
  dark: PaletteOptions
} = {
  light: {
    mode: 'light',
    black: '#000000',
    green: {
      dark: '#003300',
      middle: '#707268',
      light1: '#D5D8CB',
      light2: '#E5E8DB'
    },
    orange: {
      dark: '#DFA224',
      middle: '#FFD276',
      light1: '#FDEBB1',
      light2: '#FEFAEF'
    }
  },
  dark: {
    mode: 'dark',
    black: '#000000',
    green: {
      dark: '#003300',
      middle: '#707268',
      light1: '#D5D8CB',
      light2: '#E5E8DB'
    },
    orange: {
      dark: '#DFA224',
      middle: '#FFD276',
      light1: '#FDEBB1',
      light2: '#FEFAEF'
    }
  }
}

export default palette
