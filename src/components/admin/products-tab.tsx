"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import type { Product, Category } from "@/lib/types"
import { getProducts, getCategories, saveProduct, deleteProduct } from "@/lib/data"
import { PlusCircle, Pencil, Trash2, Save, X } from "lucide-react"

export default function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)

  const emptyProduct: Product = {
    id: "",
    name: "",
    description: "",
    price: 0,
    image: "",
    categoryId: "",
    active: true,
    promotionPrice: null,
  }

  useEffect(() => {
    const loadData = async () => {
      const productsData = await getProducts()
      const categoriesData = await getCategories()
      setProducts(productsData)
      setCategories(categoriesData)
    }

    loadData()
  }, [])

  const handleAddNew = () => {
    setCurrentProduct({ ...emptyProduct, id: Date.now().toString() })
    setIsEditing(true)
  }

  const handleEdit = (product: Product) => {
    setCurrentProduct({ ...product })
    setIsEditing(true)
  }

  const handleCancel = () => {
    setCurrentProduct(null)
    setIsEditing(false)
  }

  const handleSave = async () => {
    if (!currentProduct) return

    // Validación básica
    if (!currentProduct.name || !currentProduct.price || !currentProduct.categoryId) {
      alert("Por favor completa los campos obligatorios: Nombre, Precio y Categoría")
      return
    }

    try {
      await saveProduct(currentProduct)

      // Actualizar la lista local
      const updatedProducts = [...products]
      const index = updatedProducts.findIndex((p) => p.id === currentProduct.id)

      if (index >= 0) {
        updatedProducts[index] = currentProduct
      } else {
        updatedProducts.push(currentProduct)
      }

      setProducts(updatedProducts)
      setCurrentProduct(null)
      setIsEditing(false)
    } catch (error) {
      console.error("Error al guardar el producto:", error)
      alert("Ocurrió un error al guardar el producto")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) return

    try {
      await deleteProduct(id)
      setProducts(products.filter((p) => p.id !== id))
    } catch (error) {
      console.error("Error al eliminar el producto:", error)
      alert("Ocurrió un error al eliminar el producto")
    }
  }

  return (
    <div>
      {!isEditing ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Lista de Productos</h2>
            <Button onClick={handleAddNew} className="bg-orange-500 hover:bg-orange-600">
              <PlusCircle className="h-4 w-4 mr-2" />
              Nuevo Producto
            </Button>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No hay productos. ¡Agrega uno nuevo!</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3">Nombre</th>
                    <th className="text-left p-3">Categoría</th>
                    <th className="text-left p-3">Precio</th>
                    <th className="text-left p-3">Estado</th>
                    <th className="text-right p-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => {
                    const category = categories.find((c) => c.id === product.categoryId)
                    return (
                      <tr key={product.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{product.name}</td>
                        <td className="p-3">{category?.name || "Sin categoría"}</td>
                        <td className="p-3">
                          {product.promotionPrice ? (
                            <div>
                              <span className="text-red-500 font-medium">${product.promotionPrice.toFixed(2)}</span>
                              <span className="text-gray-500 line-through ml-2">${product.price.toFixed(2)}</span>
                            </div>
                          ) : (
                            <span>${product.price.toFixed(2)}</span>
                          )}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${product.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                          >
                            {product.active ? "Activo" : "Inactivo"}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(product)}
                            className="text-blue-500 hover:text-blue-700 mr-1"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(product.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {currentProduct?.id === emptyProduct.id ? "Nuevo Producto" : "Editar Producto"}
            </h2>
            <Button variant="ghost" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre *</Label>
                <Input
                  id="name"
                  value={currentProduct?.name || ""}
                  onChange={(e) => setCurrentProduct({ ...currentProduct!, name: e.target.value })}
                  placeholder="Nombre del producto"
                />
              </div>

              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={currentProduct?.description || ""}
                  onChange={(e) => setCurrentProduct({ ...currentProduct!, description: e.target.value })}
                  placeholder="Descripción del producto"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="category">Categoría *</Label>
                <Select
                  value={currentProduct?.categoryId || ""}
                  onValueChange={(value) => setCurrentProduct({ ...currentProduct!, categoryId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="price">Precio *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={currentProduct?.price || ""}
                  onChange={(e) =>
                    setCurrentProduct({ ...currentProduct!, price: Number.parseFloat(e.target.value) || 0 })
                  }
                  placeholder="0.00"
                />
              </div>

              <div>
                <Label htmlFor="promotionPrice">Precio de Promoción</Label>
                <Input
                  id="promotionPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={currentProduct?.promotionPrice || ""}
                  onChange={(e) => {
                    const value = e.target.value ? Number.parseFloat(e.target.value) : null
                    setCurrentProduct({ ...currentProduct!, promotionPrice: value })
                  }}
                  placeholder="0.00"
                />
              </div>

              <div>
                <Label htmlFor="image">URL de la Imagen</Label>
                <Input
                  id="image"
                  value={currentProduct?.image || ""}
                  onChange={(e) => setCurrentProduct({ ...currentProduct!, image: e.target.value })}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="active"
                  checked={currentProduct?.active || false}
                  onCheckedChange={(checked) => setCurrentProduct({ ...currentProduct!, active: checked })}
                />
                <Label htmlFor="active">Producto Activo</Label>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600">
              <Save className="h-4 w-4 mr-2" />
              Guardar Producto
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
