'use client'

import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export const ToogleDarkMode = () => {
  const { setTheme, theme } = useTheme()
  const [isVisible, setIsVisible] = useState(false)

  // Show the button when the user has scrolled 200px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <>
      <Button
        variant="default"
        size="lg"
        className="fixed bottom-3 left-3 z-40"
        onClick={toggleTheme}
      >
        {theme === 'light'
          ? (
            <SunIcon />)
          : (
            <MoonIcon />)
        }
        <span className="sr-only">Toggle theme</span>
      </Button>
    </>
  )
}
