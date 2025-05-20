"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ShoppingCart, List, Sandwich } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUiStore, useCartStore } from "@/store"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function Navbar() {
  const { openSideCart, toggleCategories } = useUiStore()
  const totalItems = useCartStore((state) => state.getTotalItems())

  return (
    <header className="bg-card shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.webp"
              alt="Quekas el Wero Logo"
              width={90}
              height={90}
              className="object-contain"
              priority
            />
          </Link>

          {/* Navigation buttons */}
          <div className="flex items-center">
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
                <Badge className="absolute -top-2 -right-2 bg-primary text-card px-1.5 py-0.5 text-xs rounded-full">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
