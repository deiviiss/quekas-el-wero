"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ShoppingCart, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Product } from "@/lib/types"
import { useCartStore } from "@/store"
import { toast } from "sonner"
import Image from "next/image"

interface ProductOptionsModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export default function ProductOptionsModal({ product, isOpen, onClose }: ProductOptionsModalProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string>("")
  const [quantity, setQuantity] = useState<number>(1)
  const { addToCart } = useCartStore()

  const selectedOption = product.options?.find((option) => option.id === selectedOptionId) || null

  const handleAddToCart = () => {
    if (!selectedOption) return

    const productWithSelectedOption = {
      ...product,
      options: [selectedOption],
    }

    // Add the specified quantity to the cart
    for (let i = 0; i < quantity; i++) {
      addToCart(productWithSelectedOption)
    }

    const quantityText = quantity === 1 ? "" : ` (${quantity} unidades)`
    toast.success(`${product.name} (${selectedOption.name})${quantityText} agregado al carrito`)
    onClose()
    setSelectedOptionId("")
    setQuantity(1)
  }

  const handleClose = () => {
    onClose()
    setSelectedOptionId("")
    setQuantity(1)
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-muted rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden border">
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-semibold">Elegir opción</h2>
                <button
                  onClick={handleClose}
                  className="p-1 rounded-full hover:bg-muted transition-colors"
                  aria-label="Cerrar modal"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 max-h-[calc(90vh-140px)] overflow-y-auto">
                {/* Product Info */}
                <div className="flex gap-3 mb-6">
                  <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={product.image || "/placeholder.svg?height=80&width=80"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{product.name}</h3>
                    {product.description && <p className="text-muted-foreground text-sm mt-1">{product.description}</p>}
                    <div className="mt-2">
                      <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Options Select */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Selecciona una opción:</h4>
                    <Select value={selectedOptionId} onValueChange={setSelectedOptionId}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Elige una opción..." />
                      </SelectTrigger>
                      <SelectContent>
                        {product.options?.map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            <div className="flex justify-between items-center w-full">
                              <span>{option.name}</span>
                              {/* <span className="text-muted-foreground ml-4">
                                {option.price > 0 ? `+$${option.price.toFixed(2)}` : "Incluido"}
                              </span> */}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Quantity Selector */}
                  {selectedOption && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2"
                    >
                      <h4 className="font-medium">Cantidad:</h4>
                      <div className="flex items-center justify-center gap-4 p-3 bg-muted/30 rounded-lg">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(-1)}
                          disabled={quantity <= 1}
                          className="h-8 w-8"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>

                        <div className="flex items-center justify-center min-w-[3rem]">
                          <span className="text-lg font-semibold">{quantity}</span>
                        </div>

                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(1)}
                          disabled={quantity >= 99}
                          className="h-8 w-8"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t bg-muted/30">
                <Button onClick={handleAddToCart} disabled={!selectedOption} className="w-full">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Agregar al carrito {quantity > 1 && `(${quantity})`}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// "use client"

// import { useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { X, ShoppingCart } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import type { Product } from "@/lib/types"
// import { useCartStore } from "@/store"
// import { toast } from "sonner"
// import Image from "next/image"

// interface ProductOptionsModalProps {
//   product: Product
//   isOpen: boolean
//   onClose: () => void
// }

// export default function ProductOptionsModal({ product, isOpen, onClose }: ProductOptionsModalProps) {
//   const [selectedOptionId, setSelectedOptionId] = useState<string>("")
//   const { addToCart } = useCartStore()

//   const selectedOption = product.options?.find((option) => option.id === selectedOptionId) || null

//   const handleAddToCart = () => {
//     if (!selectedOption) return

//     const productWithSelectedOption = {
//       ...product,
//       options: [selectedOption],
//     }

//     console.log("Producto con opción seleccionada:", productWithSelectedOption)

//     addToCart(productWithSelectedOption)
//     toast.success(`${product.name} (${selectedOption.name}) agregado al carrito`)
//     onClose()
//     setSelectedOptionId("")
//   }

//   const handleClose = () => {
//     onClose()
//     setSelectedOptionId("")
//   }

//   const isPromotion = product.promotionPrice && product.promotionPrice < product.price

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Overlay */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
//             onClick={handleClose}
//           />

//           {/* Modal */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9, y: 20 }}
//             transition={{ duration: 0.2 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4"
//           >
//             <div className="bg-background rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden border">
//               {/* Header */}
//               <div className="flex justify-between items-center p-4 border-b">
//                 <h2 className="text-lg font-semibold">Elegir opción</h2>
//                 <button
//                   onClick={handleClose}
//                   className="p-1 rounded-full hover:bg-muted transition-colors"
//                   aria-label="Cerrar modal"
//                 >
//                   <X className="h-6 w-6" />
//                 </button>
//               </div>

//               {/* Content */}
//               <div className="p-4 max-h-[calc(90vh-140px)] overflow-y-auto">
//                 {/* Product Info */}
//                 <div className="flex gap-3 mb-6">
//                   <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
//                     <Image
//                       src={product.image || "/placeholder.svg?height=80&width=80"}
//                       alt={product.name}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="font-medium">{product.name}</h3>
//                     {product.description && <p className="text-muted-foreground text-sm mt-1">{product.description}</p>}
//                     <div className="mt-2">
//                       <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Options Select */}
//                 <div className="space-y-3">
//                   <h4 className="font-medium">Selecciona una opción:</h4>
//                   <Select value={selectedOptionId} onValueChange={setSelectedOptionId}>
//                     <SelectTrigger className="w-full">
//                       <SelectValue placeholder="Elige una opción..." />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {product.options?.map((option) => (
//                         <SelectItem key={option.id} value={option.id}>
//                           <div className="flex justify-between items-center w-full">
//                             <span>{option.name}</span>
//                             {/* <span className="text-muted-foreground ml-4">
//                               Aquí podrías mostrar el precio extra si aplica
//                             </span> */}
//                           </div>
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               {/* Footer */}
//               <div className="p-4 border-t bg-muted/30">
//                 <Button onClick={handleAddToCart} disabled={!selectedOption} className="w-full">
//                   <ShoppingCart className="mr-2 h-4 w-4" />
//                   Agregar al carrito
//                 </Button>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   )
// }
