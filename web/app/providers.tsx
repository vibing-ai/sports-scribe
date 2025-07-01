'use client'

import * as React from 'react'

type Theme = 'light' | 'dark'

type ProvidersProps = {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const [theme, setTheme] = React.useState<Theme>('light')

  React.useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme') as Theme | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      setTheme(prefersDark ? 'dark' : 'light')
    }
  }, [])

  // Apply theme class to document element
  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  // Create context value
  const contextValue = {
    theme,
    setTheme: (newTheme: Theme) => setTheme(newTheme),
    toggleTheme: () => setTheme((prev: Theme) => (prev === 'dark' ? 'light' : 'dark')),
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <div className={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

// Create theme context
type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined)

// Custom hook to use theme context
export const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}