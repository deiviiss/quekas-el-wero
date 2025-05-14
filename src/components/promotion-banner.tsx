"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import type { Product, Promotion } from "@/lib/types"
import { ShoppingCart, Tag } from "lucide-react"
import { useCartStore } from "@/store"

interface PromotionBannerProps {
  promotions: Promotion[]
  products: Product[]
}

export default function PromotionBanner({ promotions, products }: PromotionBannerProps) {
  const { addToCart } = useCartStore()
  const [activePromotions, setActivePromotions] = useState<Promotion[]>([])

  useEffect(() => {
    // Filtrar promociones activas y dentro del rango de fechas
    const now = new Date()
    const filtered = promotions.filter((promo) => {
      const startDate = new Date(promo.startDate)
      const endDate = new Date(promo.endDate)
      return promo.active && startDate <= now && endDate >= now
    })
    setActivePromotions(filtered)
  }, [promotions])

  if (activePromotions.length === 0) {
    return null
  }

  const handleAddPromoToCart = (promotion: Promotion) => {
    // Agregar todos los productos de la promoción al carrito
    promotion.productIds.forEach((productId) => {
      const product = products.find((p) => p.id === productId)
      if (product) {
        addToCart(product)
      }
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {activePromotions.map((promotion, index) => {
        // Calcular el precio total y el precio con descuento
        let totalPrice = 0
        let discountedPrice = 0

        promotion.productIds.forEach((productId) => {
          const product = products.find((p) => p.id === productId)
          if (product) {
            totalPrice += product.price
            discountedPrice += product.price * (1 - promotion.discountPercentage / 100)
          }
        })

        return (
          <motion.div
            key={promotion.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div className="relative h-48">
              <Image
                src={promotion.image || "/placeholder.svg?height=300&width=400"}
                alt={promotion.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                <h3 className="font-bold text-xl text-white">{promotion.name}</h3>
                <div className="flex items-center mt-1">
                  <Tag className="h-4 w-4 text-orange-300 mr-1" />
                  <span className="text-orange-300 font-semibold text-sm">
                    {promotion.discountPercentage}% DESCUENTO
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-600 mb-3">{promotion.description}</p>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-lg font-bold text-red-500">${discountedPrice.toFixed(2)}</span>
                  <span className="text-sm text-gray-500 line-through ml-2">${totalPrice.toFixed(2)}</span>
                </div>
                <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                  AHORRA ${(totalPrice - discountedPrice).toFixed(2)}
                </span>
              </div>
              <Button
                onClick={() => handleAddPromoToCart(promotion)}
                className="w-full bg-orange-500 hover:bg-orange-600 transition-colors"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Agregar al carrito
              </Button>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
