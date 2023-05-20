import { createTheme } from '@mui/material/styles'
import React from 'react'

import { breakpoints, palette } from '../constants'

export const themes = {
  light: createTheme({
    breakpoints: {
      values: breakpoints
    },
    palette: palette.light,
    spacing: 4,
    typography: {
      fontFamily: 'proxima_nova',
      h3: {
        fontWeight: 700,
        lineHeight: '44px',
        fontSize: '2rem',
        '@media (min-width:576px)': {
          fontSize: '3rem'
        }
      }
    }
  }),
  dark: createTheme({
    breakpoints: {
      values: breakpoints
    },
    palette: palette.dark,
    spacing: 4,
    typography: {
      fontFamily: 'proxima_nova',
      h3: {
        fontWeight: 700,
        lineHeight: '24px',
        fontSize: '1.375rem',
        '@media (min-width:576px)': {
          fontSize: '2rem'
        },
        '@media (min-width:1200px)': {
          fontSize: '3rem'
        }
      }
    }
  })
}

const themeContext = React.createContext({
  theme: themes.light,
  toggleTheme: () => {}
})

function useProvideTheme() {
  const [theme, setTheme] = React.useState(themes.light)

  const toggleTheme = () => {
    if (theme === themes.light) setTheme(themes.dark)
    else setTheme(themes.light)
  }

  return {
    theme,
    toggleTheme
  }
}

export interface LayoutProps {
  children: React.ReactNode
}

export function ProvideTheme({ children }: LayoutProps) {
  const theme = useProvideTheme()
  return <themeContext.Provider value={theme}>{children}</themeContext.Provider>
}

export const useTheme = () => React.useContext(themeContext)
