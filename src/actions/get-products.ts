'use server'

import { Product } from "@/lib/types"

const initialProducts: Product[] = [
  {
    id: "1000",
    name: "Birria de res",
    price: 22,
    categoryId: "1",
    description: "Taco de birria de res suave y jugosa, servido con su juguito.",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1747625086/Taco_birria_tvq3tv.jpg",
    active: true,
    promotionPrice: null,
  },
  {
    id: "1001",
    name: "Chorizo verde/rojo",
    price: 20,
    categoryId: "1",
    description: "Taco de chorizo verde o rojo, bien doradito y lleno de sabor.",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1747625080/Taco_chorizo_verde_sil0kq.jpg",
    active: true,
    promotionPrice: null,
  },
  {
    id: "1002",
    name: "Poc chuc",
    price: 20,
    categoryId: "1",
    description: "Taco de cerdo marinado al estilo yucateco, asado al carbón.",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1747625089/Taco_Pocchuc_sirx9l.jpg",
    active: true,
    promotionPrice: null,
  },
  {
    id: "1003",
    name: "Chorizo c/queso",
    price: 25,
    categoryId: "1",
    description: "Taco de chorizo con queso derretido, combinación que nunca falla.",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1747625087/Taco_chorizo_con_queso_vqjwfw.jpg",
    active: true,
    promotionPrice: null,
  },
  {
    id: "2000",
    name: "Orden de consomé",
    price: 100,
    categoryId: "2",
    description: "Consomé caliente y sabroso, perfecto para acompañar tus tacos.",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1747625079/Orden_de_consome_eumazw.jpg",
    active: true,
    promotionPrice: null,
  },
  {
    id: "2001",
    name: "½ orden c/carne",
    price: 60,
    categoryId: "2",
    description: "Media orden de consomé con trozos de carne suave y sabrosa.",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1747625084/Consome_con_carne_85_zfbntb.jpg",
    active: true,
    promotionPrice: null,
  },
  {
    id: "3002",
    name: "Tortilla a mano",
    price: 30,
    categoryId: "2",
    description: "Tortillas gruesas hechas a mano, recién salidas del comal.",
    image: "",
    active: true,
    promotionPrice: null,
  },
  {
    id: "3000",
    name: "Quesabirria",
    price: 27,
    categoryId: "3",
    description: "Tortilla dorada con queso derretido y birria jugosa.",
    image: "",
    active: true,
    promotionPrice: null,
  },
  {
    id: "3001",
    name: "Quesabirria ex/queso",
    price: 30,
    categoryId: "3",
    description: "Quesabirria con extra de queso para los más queseros.",
    image: "",
    active: true,
    promotionPrice: null,
  },
  {
    id: "3003",
    name: "Ramen",
    price: 30,
    categoryId: "3",
    description: "Ramen con caldo de birria, fideos y carne suave. ¡Bien antojable!",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1747625086/Ramen_birria_125_jrbf1r.jpg",
    active: true,
    promotionPrice: null,
  },
  {
    id: "4000",
    name: "Birria de res",
    price: 70,
    categoryId: "4",
    description: "Tranca rellena de birria de res jugosa, ideal para los de buen diente.",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1747625090/Tranca_Birria_yadd6u.jpg",
    active: true,
    promotionPrice: null,
  },
];

export async function getProducts(): Promise<Product[]> {
  // if (typeof window === "undefined") return initialProducts

  try {
    return initialProducts
  } catch (error) {
    console.error("Error al obtener productos:", error)
    return initialProducts
  }
}