import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product, ProductOption } from "@/lib/types"

interface CartItem {
  product: Product
  quantity: number
  options?: ProductOption[]
}

interface CartState {
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  removeOptionFromCart: (productId: string, optionId: string) => void
  updateOptionQuantity: (productId: string, optionId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getSubtotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product: Product) => {
        const cart = get().cart
        const hasOptions = product.options && product.options.length > 0
        const existingItemIndex = cart.findIndex((item) => item.product.id === product.id)

        // Si el producto ya está en el carrito
        if (existingItemIndex !== -1) {
          const existingItem = cart[existingItemIndex]
          console.log("Producto ya existe en el carrito:", existingItem)

          if (!hasOptions) {
            // Si no tiene opciones, simplemente sumamos cantidad
            const updatedCart = [...cart]
            updatedCart[existingItemIndex].quantity += 1
            console.log("Actualizando cantidad del producto sin opciones:", updatedCart[existingItemIndex])
            set({ cart: updatedCart })
            return
          }

          // Si tiene opciones, las comparamos
          const incomingOptions = product.options || []
          const updatedOptions = [...(existingItem.product.options || [])]

          incomingOptions.forEach((incomingOpt) => {
            const matchIndex = updatedOptions.findIndex((opt) => opt.id === incomingOpt.id)

            if (matchIndex !== -1) {
              // Si ya existe esa opción, le sumamos cantidad
              const existingQuantity = updatedOptions[matchIndex].quantity || 0
              updatedOptions[matchIndex].quantity = existingQuantity + 1
            } else {
              // Si no existe esa opción, la agregamos con cantidad = 1
              updatedOptions.push({ ...incomingOpt, quantity: 1 })
            }
          })

          // 🧠 Calcular el total de cantidades por opción
          const totalQuantity = updatedOptions.reduce((sum, opt) => sum + (opt.quantity || 0), 0)


          // Actualizamos el producto en el carrito con las opciones modificadas
          const updatedCart = [...cart]
          updatedCart[existingItemIndex] = {
            ...existingItem,
            quantity: totalQuantity, // Actualizamos la cantidad total del producto
            product: {
              ...existingItem.product,
              options: updatedOptions,
            },
          }

          set({ cart: updatedCart })
        } else {
          // Producto nuevo en el carrito

          if (!hasOptions) {
            // Producto sin opciones → cantidad directa
            set({
              cart: [
                ...cart,
                {
                  product: { ...product, options: [] },
                  quantity: 1,
                },
              ],
            })
          } else {
            // Producto con opciones → cada opción inicia con cantidad = 1
            const newOptions = (product.options || []).map((opt) => ({
              ...opt,
              quantity: 1,
            }))
            const totalQuantity = newOptions.reduce(
              (sum, opt) => sum + (opt.quantity || 0),
              0
            )

            set({
              cart: [
                ...cart,
                {
                  product: { ...product, options: newOptions },
                  quantity: totalQuantity,
                },
              ],
            })
          }
        }
      },

      removeOptionFromCart: (productId: string, optionId: string) => {
        const currentCart = get().cart

        const updatedCart = currentCart
          .map<CartItem | null>((item) => {
            if (item.product.id !== productId) return item

            const updatedOptions = item.options?.filter((opt) => opt.id !== optionId) || []

            const newQuantity = updatedOptions.reduce((sum, opt) => sum + opt.quantity, 0)

            return newQuantity > 0
              ? { ...item, options: updatedOptions, quantity: newQuantity }
              : null // marcar para eliminar si no quedan opciones
          })
          .filter((item): item is CartItem => item !== null) // elimina los nulls con type guard

        set({ cart: updatedCart })
      },

      updateOptionQuantity: (productId: string, optionId: string, quantity: number) => {
        const safeQuantity = Math.max(0, Number(quantity) || 0)
        const currentCart = get().cart

        const updatedCart = currentCart
          .map<CartItem | null>((item) => {
            if (item.product.id !== productId) return item

            const updatedOptions = (item.product.options || []).map((opt) =>
              opt.id === optionId ? { ...opt, quantity: safeQuantity } : opt
            )

            const newQuantity = updatedOptions.reduce((sum, opt) => sum + (opt.quantity || 0), 0)

            if (newQuantity === 0) return null // eliminar si ya no quedan opciones

            return {
              ...item,
              quantity: newQuantity,
              product: {
                ...item.product,
                options: updatedOptions,
              },
            }
          })
          .filter((item): item is CartItem => item !== null)

        set({ cart: updatedCart })
      },

      removeFromCart: (productId: string) => {
        set({ cart: get().cart.filter((item) => item.product.id !== productId) })
      },

      updateQuantity: (productId: string, quantity: number) => {
        set({
          cart: get().cart.map((item) => (item.product.id === productId ? { ...item, quantity } : item)),
        })
      },

      clearCart: () => {
        set({ cart: [] })
      },

      getTotalItems: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0)
      },

      getSubtotal: () => {
        return get().cart.reduce((total, item) => {
          const price = item.product.promotionPrice || item.product.price
          return total + price * item.quantity
        }, 0)
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)
