'use server'

import { Product, ProductOption } from "@/lib/types"

const productOptions: ProductOption[] = [
  {
    id: "opt-1",
    productId: "4014",
    name: "Horchata",
    extraCost: 0,
    quantity: 0
  },
  {
    id: "opt-2",
    productId: "4014",
    name: "Jamaica",
    extraCost: 0,
    quantity: 0
  },
  {
    id: "opt-3",
    productId: "4014",
    name: "Limón",
    extraCost: 0,
    quantity: 0
  },
];

// FILTRA LA CATEGORÍA DE PRODUCTOS DE PROMOCIONES

const initialProducts: Product[] = [
  {
    id: "1000",
    name: "Birria de Res",
    price: 22,
    categoryId: "1",
    description: "Taco de birria de res suave y jugosa, servido con su juguito.",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1747625086/Taco_birria_tvq3tv.jpg",
    active: true,
    promotionPrice: null,
  },
  {
    id: "1001",
    name: "Chorizo Verde/Rojo",
    price: 20,
    categoryId: "1",
    description: "Taco de chorizo verde o rojo, bien doradito y lleno de sabor.",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1747625080/Taco_chorizo_verde_sil0kq.jpg",
    active: true,
    promotionPrice: null,
  },
  {
    id: "1002",
    name: "Poc Chuc",
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
    name: "Orden de Consomé con Carne",
    price: 110,
    categoryId: "2",
    description: "Caldo concentrado de birria con generosa porción de carne. Ideal para acompañar tus tacos.",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748065635/orden_consome_con_carne_hbwbkj.jpg",
    active: true,
    promotionPrice: null,
  },
  {
    id: "2001",
    name: "1/2 Orden Consomé con Carne",
    price: 80,
    categoryId: "2",
    description: "Media porción del delicioso consomé con carne. Justo para calmar el antojo.",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748065635/medio_consome_con_carne_qjv0ne.jpg",
    active: true,
    promotionPrice: null,
  },
  {
    id: "3000",
    name: "Quesabirria",
    price: 27,
    categoryId: "3",
    description: "Tortilla dorada con queso derretido y birria jugosa.",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1747698891/quesa-birria_bpfk7n.jpg",
    active: true,
    promotionPrice: null,
  },
  {
    id: "3001",
    name: "Quesabirria Extra Queso",
    price: 30,
    categoryId: "3",
    description: "Quesabirria con extra de queso para los más queseros.",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1747698890/quesa-birria-extra-queso_i6qw0m.jpg",
    active: true,
    promotionPrice: null,
  },
  {
    id: "4000",
    name: "Birria de Res",
    price: 70,
    categoryId: "4",
    description: "Tranca rellena de birria de res jugosa, ideal para los de buen diente.",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1747625090/Tranca_Birria_yadd6u.jpg",
    active: true,
    promotionPrice: null,
  },
  {
    id: "4001",
    name: "Poc Chuc con Queso",
    price: 25,
    categoryId: "1",
    description: "Taco de poc chuc al carbón con queso derretido. Un toque yucateco con todo el sabor.",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748065635/poc_chuc_gclidx.jpg",
    active: true,
    promotionPrice: null,
  },
  {
    id: "4002",
    name: "Birriamén",
    price: 120,
    categoryId: "2",
    description: "Ramen con caldo de birria, carne suave y fideos. Fusión sabrosa que sorprende.",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1747625086/Ramen_birria_125_jrbf1r.jpg",
    active: true,
    promotionPrice: null,
  },
  {
    id: "4003",
    name: "Birriamén con Queso",
    price: 140,
    categoryId: "2",
    description: "Ramen con birria y extra de queso derretido. Para los que aman lo cremoso.",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748065645/birriamen_con_queso_fhxcek.jpg",
    active: true,
    promotionPrice: null,
  },
  {
    id: "4004",
    name: "Costrabirria",
    price: 120,
    categoryId: "2",
    description: "Costra de queso crujiente rellena de birria. ¡Explosión de sabor en cada mordida!",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748137828/costrabirria_pp3egz.jpg",
    active: true,
    promotionPrice: null,
  },
  {
    id: "4005",
    name: "Empalme Norteño",
    price: 170,
    categoryId: "2",
    description: "Capas de tortilla, queso y birria doraditas al comal. Receta norteña, corazón campechano.",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748065660/Empalme_norte%C3%B1o_w3qksd.jpg",
    active: true,
    promotionPrice: null,
  },
  {
    id: "4006",
    name: "Chilaquiles de Birria",
    price: 120,
    categoryId: "2",
    description: "Totopos bañados en birria y gratinados con queso. Antojo de desayuno o cena.",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748065646/Chilaquiles_eblxcx.jpg",
    active: true,
    promotionPrice: null,
  },
  {
    id: "4007",
    name: "Quesabirria con Tortilla a Mano",
    price: 29,
    categoryId: "3",
    description: "Quesabirria servida con tortilla hecha a mano. Sabor casero garantizado.",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748065635/quesabirria_echa_a_mano_agjt5c.jpg",
    active: true,
    promotionPrice: null,
  },
  {
    id: "4008",
    name: "Megaquesabirria",
    price: 100,
    categoryId: "3",
    description: "Versión XL de la quesabirria. Para compartir... o no.",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1747768351/megaquesabirria_di6lsz.jpg",
    active: true,
    promotionPrice: null,
  },
  {
    id: "4009",
    name: "Quesabirria con Tortilla de Harina",
    price: 30,
    categoryId: "3",
    description: "Quesabirria envuelta en suave tortilla de harina. Ideal para los que quieren variar.",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748137828/quesabirria_de_harina_lui1ji.jpg",
    active: true,
    promotionPrice: null,
  },
  {
    id: "4010",
    name: "Chorizo Verde/Rojo",
    price: 60,
    categoryId: "4",
    description: "Tranca con chorizo rojo o verde, bien doradito. Elige tu estilo.",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748065635/tranca_chorizo_verde_y_rojo_c8csql.jpg",
    active: true,
    promotionPrice: null,
  },
  {
    id: "4011",
    name: "Poc Chuc",
    price: 65,
    categoryId: "4",
    description: "Tranca con carne asada al estilo yucateco. Sabor directo del carbón.",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748065640/tranca_poc_chuc_lbqann.jpg",
    active: true,
    promotionPrice: null,
  },
  {
    id: "4012",
    name: "Agrega Queso por",
    price: 10,
    categoryId: "4",
    description: "Dale un toque cremoso a tu taco, tranca o quesabirria. ¡Queso nunca sobra!",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748065652/Extra_queso_xgccnm.jpg",
    active: true,
    promotionPrice: null,
  },
  {
    id: "4013",
    name: "Coca Cola",
    price: 28,
    categoryId: "5",
    description: "Refresco clásico para acompañar tus tacos como se debe.",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748065647/coca_cola_d8zstv.jpg",
    active: true,
    promotionPrice: null,
  },
  {
    id: "4014",
    name: "Aguas Naturales",
    price: 25,
    categoryId: "5",
    description: "Agua del día: horchata, jamaica o limón. Pregunta cuál tenemos hoy.",
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748065645/variedad_de_refrescos_de_naturales_vsliuq.jpg",
    active: true,
    promotionPrice: null,
    options: [
      { id: "opt-1", productId: "4014", name: "Naranja dulce", extraCost: 0, quantity: 0 },
      { id: "opt-2", productId: "4014", name: "Fresa con limón", extraCost: 0, quantity: 0 },
      { id: "opt-3", productId: "4014", name: "Lima", extraCost: 0, quantity: 0 },
      { id: "opt-4", productId: "4014", name: "Chaya con piña", extraCost: 0, quantity: 0 },
      { id: "opt-5", productId: "4014", name: "Jamaica", extraCost: 0, quantity: 0 },
    ]
  },
];

export async function getProducts(): Promise<Product[]> {
  try {
    return initialProducts
  } catch (error) {
    console.error("Error al obtener productos:", error)
    return initialProducts
  }
}