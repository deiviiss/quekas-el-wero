export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  categoryId: string
  active: boolean
  promotionPrice: number | null
  options?: ProductOption[] // Optional, to allow products without options
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
  image: string
}

export interface ProductOption {
  id: string;
  productId: string;
  name: string;
  quantity: number; // Optional, to allow products without options
  extraCost: number;
}