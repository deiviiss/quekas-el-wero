'use server'

import { Category } from "@/lib/types"

const initialCategories: Category[] = [
  { "id": "1", "name": "Tacos" },
  { "id": "2", "name": "Extra" },
  { "id": "3", "name": "Especialidad de la casa" },
  { "id": "4", "name": "Trancas" }
]

export async function getCategories(): Promise<Category[]> {

  try {
    return initialCategories
  } catch (error) {
    console.error("Error al obtener categorías:", error)
    return initialCategories
  }
}
