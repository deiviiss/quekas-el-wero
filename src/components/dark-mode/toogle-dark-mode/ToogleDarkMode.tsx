'use client'

import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const ToogleDarkMode = () => {
  const { setTheme, theme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <>
      <Button
        variant="default"
        size="icon"
        className="fixed bottom-4 left-2 z-40"
        onClick={toggleTheme}
      >
        {theme === 'light'
          ? (
            <SunIcon className="h-[1.2rem] w-[1.2rem]" />)
          : (
            <MoonIcon className="h-[1.2rem] w-[1.2rem]" />)
        }
        <span className="sr-only">Toggle theme</span>
      </Button>
    </>
  )
}
