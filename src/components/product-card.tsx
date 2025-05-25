"use client"

import Image from "next/image"
import { useState } from "react"
import { motion } from "framer-motion"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { PlusCircle, Settings } from "lucide-react"
import { useCartStore } from "@/store"
import { toast } from "sonner"
import ProductOptionsModal from "@/components/product-options-modal"

interface ProductCardProps {
  product: Product
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
  hover: {
    y: -5,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.2 },
  },
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartStore()
  const [isLoading, setIsLoading] = useState(false)
  const hasOptions = product.options && product.options.length > 0
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddToCart = () => {
    if (hasOptions) {
      setIsModalOpen(true)
      return
    }

    setIsLoading(true)
    // Simulate a small delay for the animation
    setTimeout(() => {
      addToCart(product)
      setIsLoading(false)
      toast.success(`${product.name} agregado al carrito`, {
        position: "bottom-right",
      })
    }, 300)
  }

  const isPromotion = product.promotionPrice && product.promotionPrice < product.price

  return (
    <>
      <motion.div className="bg-card dark:border dark:border-primary rounded-lg shadow-md overflow-hidden" variants={cardVariants} whileHover="hover">
        <div className="relative h-48">
          <Image
            src={product.image || "/images/placeholder.webp?height=200&width=300"}
            alt={product.name}
            fill
            className="object-cover"
          />
          {isPromotion && (
            <div className="absolute top-2 right-2 bg-destructive text-card px-2 py-1 rounded-full text-xs font-bold">
              Promoción
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
          {product.description && <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>}
          <div className="flex justify-between items-center">
            <div>
              {isPromotion ? (
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-destructive">${product.promotionPrice ? product.promotionPrice.toFixed(2) : 0}</span>
                  <span className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                </div>
              ) : (
                <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
              )}
            </div>
            <Button
              onClick={handleAddToCart}
              disabled={isLoading}
              size="sm"
              className="bg-primary hover:bg-primary/80"
            >
              {hasOptions ? (
                <>
                  <span className="mr-1">
                    <Settings className="h-4 w-4" />
                  </span>
                  Elegir opción
                </>
              ) : (
                <>
                  <PlusCircle className="mr-1 h-4 w-4" />
                  Agregar
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>

      <ProductOptionsModal product={product} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
