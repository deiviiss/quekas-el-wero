"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Trash2, MessageCircle } from "lucide-react"
import { useCartStore } from "@/store"

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore()
  const [isOpen, setIsOpen] = useState(false)

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cart.reduce((total, item) => {
    const price = item.product.promotionPrice || item.product.price
    return total + price * item.quantity
  }, 0)

  const handleWhatsAppCheckout = () => {
    const phoneNumber = "5219811250049" // Número del negocio

    let message = "🛒 *Nuevo Pedido*\n\n"

    // Agregar productos al mensaje
    cart.forEach((item) => {
      const price = item.product.promotionPrice || item.product.price
      message += `*${item.quantity}x* ${item.product.name} - $${price.toFixed(2)}\n`
    })

    message += `\n*Total:* $${subtotal.toFixed(2)}\n\n`
    message += "¡Gracias por tu pedido! Por favor, confirma los detalles de entrega."

    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(message)

    // Abrir WhatsApp con el mensaje
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank")
  }

  return (
    <div className="mt-6 bg-white rounded-lg shadow-md">
      <motion.div
        className="p-4 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ backgroundColor: "#f9fafb" }}
      >
        <div className="flex items-center">
          <ShoppingCart className="h-5 w-5 mr-2 text-orange-500" />
          <h3 className="font-semibold">Carrito de Compras</h3>
        </div>
        {totalItems > 0 && (
          <motion.span
            className="bg-orange-500 text-white rounded-full px-2 py-1 text-xs font-bold"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            {totalItems}
          </motion.span>
        )}
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="p-4 border-t"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Tu carrito está vacío</p>
            ) : (
              <>
                <ul className="divide-y">
                  {cart.map((item) => (
                    <motion.li
                      key={item.product.id}
                      className="py-3 flex justify-between"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <div className="flex items-center mt-1">
                          <button
                            onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            className="text-gray-500 hover:text-orange-500"
                          >
                            -
                          </button>
                          <span className="mx-2 w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="text-gray-500 hover:text-orange-500"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-medium">
                          ${((item.product.promotionPrice || item.product.price) * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 hover:text-red-700 mt-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  className="mt-4 pt-4 border-t"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex justify-between font-bold mb-4">
                    <span>Total:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="space-y-2">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={handleWhatsAppCheckout}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Pedir por WhatsApp
                      </Button>
                    </motion.div>

                    <Button
                      variant="outline"
                      onClick={clearCart}
                      className="w-full text-red-500 border-red-500 hover:bg-red-50"
                    >
                      Vaciar carrito
                    </Button>
                  </div>
                </motion.div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
