export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  categoryId: string
  active: boolean
  promotionPrice: number | null
}

export interface Category {
  id: string
  name: string
}

export interface Promotion {
  id: string
  name: string
  description: string
  discountPercentage: number
  startDate: string
  endDate: string
  productIds: string[] // To know which products are included
  originalPrice: number // Real sum without discount (can be calculated manually or automatically in the admin)
  promoPrice: number // Price the customer will actually pay
  isActive: boolean
  discountCode: string
  image: string | null
}

// export interface Promotion {
//   id: string
//   name: string
//   description: string
//   discountPercentage: number
//   startDate: string
//   endDate: string
//   productIds: string[]
//   active: boolean
//   discountCode: string
//   image?: string // Añadimos campo para imagen de promoción
// }
