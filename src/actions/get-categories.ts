'use server'

import { Category } from "@/lib/types"

const initialCategories: Category[] = [
  { id: "1", name: "Hamburguesas" },
  { id: "2", name: "Hot Dogs" },
  { id: "3", name: "Tortas" },
  { id: "4", name: "Papas Fritas" },
  { id: "5", name: "Snacks" },
  { id: "6", name: "Bebidas" },
  { id: "7", name: "Postres" },
]

export async function getCategories(): Promise<Category[]> {

  try {
    return initialCategories
  } catch (error) {
    console.error("Error al obtener categorías:", error)
    return initialCategories
  }
}
