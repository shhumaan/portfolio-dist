'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  React.useEffect(() => {
    // Force dark mode immediately on client load
    document.documentElement.classList.add('dark')
  }, [])
  
  return <NextThemesProvider forcedTheme="dark" {...props}>{children}</NextThemesProvider>
}
