"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import type { Product, Promotion } from "@/lib/types"
import { ShoppingCart, Tag } from "lucide-react"
import { useCartStore } from "@/store"
import { toast } from "sonner"

interface PromotionBannerProps {
  promotions: Promotion[]
  products: Product[]
}

export function PromotionBanner({ promotions, products }: PromotionBannerProps) {
  const { addToCart } = useCartStore()
  const [activePromotions, setActivePromotions] = useState<Promotion[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Filter active promotions within the date range
    const now = new Date()
    const filtered = promotions.filter((promo) => {
      const startDate = new Date(promo.startDate)
      const endDate = new Date(promo.endDate)
      return promo.isActive && startDate <= now && endDate >= now
    })
    setActivePromotions(filtered)
  }, [promotions])

  if (activePromotions.length === 0) {
    return null
  }

  const handleAddPromoToCart = (promotion: Promotion) => {
    // Add all products from the promotion to the cart
    promotion.productIds.forEach((productId) => {
      const product = products.find((p) => p.id === productId)
      if (product) {
        addToCart(product)
        setIsLoading(false)
        toast.success(`${product.name} agregado al carrito`, {
          position: "bottom-right",
        })
      }
    })
  }

  return (
    <>




      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activePromotions.map((promotion, index) => {
          const { originalPrice, promoPrice } = promotion
          const discountAmount = originalPrice - promoPrice
          const discountPercentage = ((discountAmount / originalPrice) * 100).toFixed(0)

          return (
            <motion.div
              key={promotion.id}
              className="bg-card dark:border dark:border-primary rounded-lg shadow-md overflow-hidden"
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
                    <Tag className="h-4 w-4 text-secondary dark:text-primary mr-1" />
                    <span className="text-secondary dark:text-primary font-semibold text-sm">
                      {discountPercentage}% DESCUENTO
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-muted-foreground mb-3">{promotion.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-lg font-bold text-destructive">${promoPrice.toFixed(2)}</span>
                    <span className="text-sm text-muted-foreground line-through ml-2">${originalPrice.toFixed(2)}</span>
                  </div>
                  <span className="bg-destructive/20 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                    AHORRA ${discountAmount.toFixed(2)}
                  </span>
                </div>
                <Button
                  onClick={() => handleAddPromoToCart(promotion)}
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/80 transition-colors"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Agregar al carrito
                </Button>
              </div>
            </motion.div>
          )
        })}
      </div>

    </>
  )
}
