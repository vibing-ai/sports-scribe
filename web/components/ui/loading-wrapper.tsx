'use client'

import { useEffect, useState } from 'react'

interface LoadingWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function LoadingWrapper({ children, fallback }: LoadingWrapperProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return fallback || null
  }

  return <>{children}</>
}
