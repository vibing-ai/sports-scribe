'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps as NextThemeProviderProps } from 'next-themes/dist/types'

interface ProvidersProps extends NextThemeProviderProps {
  children: React.ReactNode
}

export function Providers({ children, ...props }: ProvidersProps) {
  return (
    <NextThemesProvider 
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
