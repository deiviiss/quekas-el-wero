'use server'

import { Promotion } from "@/lib/types"

const initialPromotions: Promotion[] = [
  {
    id: "1",
    name: "Combo Hamburguesa + Papas + Refresco",
    description: "Hamburguesa sencilla con papas fritas chicas y refresco",
    discountPercentage: 15,
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    productIds: ["1", "11", "17"],
    active: true,
    discountCode: "COMBO1",
    image: "https://media.istockphoto.com/id/533712416/es/foto/hamburguesa-con-queso-con-bebida-de-cola-y-patatas-fritas-de-luz-rojo.jpg?s=612x612&w=0&k=20&c=7wm2IEMh5KPKkyTPrl-LbdJZ3ufgC1GCJAhP0zinPVw=",
  },
  {
    id: "2",
    name: "2 Hot Dogs por $50",
    description: "Lleva 2 hot dogs sencillos por solo $50",
    discountPercentage: 20,
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    productIds: ["5"],
    active: true,
    discountCode: "HOTDOG2X1",
    image: "https://media.istockphoto.com/id/1349560418/es/foto/dos-perritos-calientes-con-ketchup-y-mostaza.jpg?s=612x612&w=0&k=20&c=1jgMNA6Kr6X2q6qmCRfURsnhaGYQlMSZ7g9T43ZCWAs=",
  },
  {
    id: "3",
    name: "Refresco gratis en pedidos mayores a $100",
    description: "Obtén un refresco gratis en compras mayores a $100",
    discountPercentage: 100,
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    productIds: ["17"],
    active: true,
    discountCode: "REFRESCOGRATIS",
    image: "https://media.istockphoto.com/id/2162110995/es/foto/soft-drinks.jpg?s=612x612&w=0&k=20&c=HdRyjTS-8Yw0RGAe540GeUbg0XysD6lEIhuSMZlhemY=",
  },
]

export async function getPromotions(): Promise<Promotion[]> {

  try {
    return initialPromotions
  } catch (error) {
    console.error("Error al obtener promociones:", error)
    return initialPromotions
  }
}