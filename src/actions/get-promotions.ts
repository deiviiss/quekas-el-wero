'use server'

import { Promotion } from "@/lib/types"

const initialPromotions: Promotion[] = [
  {
    id: "1",
    name: "5 Quesabirrias + ½ litro de consomé",
    description: "Combo ideal para compartir: 5 quesabirrias con medio litro de consomé",
    discountPercentage: 7, // $135 normal vs $125 aprox.
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    productIds: ["3000", "2001"], // quesabirria, ½ orden de carne con consomé
    originalPrice: 275,
    promoPrice: 250,
    isActive: true,
    discountCode: "COMBO5Q",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1747625080/5_quesabirrias_mas_litro_de_consome_eeynfj.jpg",
  },
  {
    id: "2",
    name: "10 Quesabirrias + 1 litro de consomé",
    description: "Perfecto para reuniones o una buena comilona",
    discountPercentage: 15, // aprox. $370 normal vs $300 promo
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    productIds: ["3000", "2002"],
    isActive: true,
    originalPrice: 310,
    promoPrice: 300,
    discountCode: "COMBO10Q",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1747625095/498164685_678601344912396_4203856589691907909_n_amkn2o.jpg",
  },
  {
    id: "3",
    name: "12 Quesabirrias + 1 litro de consomé",
    description: "Ahorra más y come más: 12 quesabirrias y un litro de consomé",
    discountPercentage: 7,
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    productIds: ["3000", "2002"],
    isActive: true,
    originalPrice: 480,
    promoPrice: 450,
    discountCode: "COMBO12Q",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1747625091/12_quesabirrias_mas_litro_de_consome_n9cfwf.jpg",
  }
]

export async function getPromotions(): Promise<Promotion[]> {
  try {
    return initialPromotions
  } catch (error) {
    console.error("Error al obtener promociones:", error)
    return initialPromotions
  }
}
