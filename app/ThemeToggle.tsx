'use client'

import { useEffect } from 'react'
import { useThemeStore } from '@/src/lib/store'

const ThemeToggle = () => {
  const { theme } = useThemeStore()

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.className = theme
    }
  }, [theme])
  return null
}
export default ThemeToggle
