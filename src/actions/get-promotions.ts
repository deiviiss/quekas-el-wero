'use server'

import { Promotion } from "@/lib/types"

const initialPromotions: Promotion[] = [
  {
    id: "1",
    name: "5 Quesabirrias con Queso Gratinado + ½ Consomé",
    description: "Combo para compartir: 5 quesabirrias con queso gratinado y medio consomé",
    discountPercentage: 26,
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    productIds: ["3000", "2001"],
    originalPrice: 215,
    promoPrice: 160,
    isActive: true,
    discountCode: "COMBO5Q",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1747625080/5_quesabirrias_mas_litro_de_consome_eeynfj.jpg",
  },
  {
    id: "2",
    name: "10 Quesabirrias + ½ Litro de Consomé",
    description: "Ideal para reuniones: 10 quesabirrias con medio litro de consomé",
    discountPercentage: 14,
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    productIds: ["3000", "2001"],
    originalPrice: 350,
    promoPrice: 300,
    isActive: true,
    discountCode: "COMBO10Q",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1747625095/498164685_678601344912396_4203856589691907909_n_amkn2o.jpg",
  },
  {
    id: "3",
    name: "12 Quesabirrias + 1 Litro de Consomé",
    description: "Más birria por tu dinero: 12 quesabirrias con un litro de consomé",
    discountPercentage: 31,
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    productIds: ["3000", "2002"],
    originalPrice: 434,
    promoPrice: 300,
    isActive: true,
    discountCode: "COMBO12Q",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1747625091/12_quesabirrias_mas_litro_de_consome_n9cfwf.jpg",
  },
  {
    id: "4",
    name: "18 Quesabirrias + 1 Litro de Consomé",
    description: "Pa' toda la banda: 18 quesabirrias con un litro de consomé",
    discountPercentage: 25,
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    productIds: ["3000", "2002"],
    originalPrice: 596,
    promoPrice: 450,
    isActive: true,
    discountCode: "COMBO18Q",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748065660/18_quesabirrias_mas_litro_de_consome_s6iqpl.jpg",
  },
  {
    id: "5",
    name: "1 Kg de Birria + 2 Litros de Consomé",
    description: "Incluye salsa y tortillas — para que no falte nada",
    discountPercentage: 20,
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    productIds: ["2003", "2004"],
    originalPrice: 750,
    promoPrice: 600,
    isActive: true,
    discountCode: "KGBIRRIA",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748065635/kilo_de_birria_mas_consome_otufgp.jpg",
  },
  {
    id: "6",
    name: "Martes de Quesabirria Tamaíz — 3 x $75",
    description: "Solo transferencia. Aplica los martes",
    discountPercentage: 14,
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    productIds: ["3000"],
    originalPrice: 87,
    promoPrice: 75,
    isActive: true,
    discountCode: "TAMAIZ3X75",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748065652/-_Martes_de_Quesabirria_Tama%C3%ADz_fwkqbr.jpg",
  },
];

export async function getPromotions(): Promise<Promotion[]> {
  try {
    return initialPromotions
  } catch (error) {
    console.error("Error al obtener promociones:", error)
    return initialPromotions
  }
}
