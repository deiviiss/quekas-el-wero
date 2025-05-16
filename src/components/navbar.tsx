"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ShoppingCart, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUiStore, useCartStore } from "@/store"
import { Badge } from "@/components/ui/badge"
import { ToogleDarkMode } from "@/components/dark-mode/toogle-dark-mode/ToogleDarkMode"

export function Navbar() {
  const { openSideCart, toggleCategories } = useUiStore()
  const totalItems = useCartStore((state) => state.getTotalItems())

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link href="/" className="text-xl font-bold text-orange-500">
              Menú Digital
            </Link>
          </motion.div>

          {/* Navigations buttons */}
          <div className="flex items-center space-x-3">
            {/* Category button */}
            <Button variant="ghost" size="sm" onClick={toggleCategories} className="flex items-center md:hidden">
              <List className="h-5 w-5 mr-1" />
              <span className="hidden sm:inline">Categorías</span>
            </Button>

            {/* Cart button */}
            <Button variant="ghost" size="sm" onClick={openSideCart} className="flex items-center relative">
              <ShoppingCart className="h-5 w-5 mr-1" />
              <span className="hidden sm:inline">Carrito</span>
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white px-1.5 py-0.5 text-xs rounded-full">
                  {totalItems}
                </Badge>
              )}
            </Button>

            {/* dark mode button */}
            <ToogleDarkMode />
          </div>
        </div>
      </div>
    </header>
  )
}
