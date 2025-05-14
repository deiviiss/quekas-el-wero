"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductsTab from "./products-tab"
import CategoriesTab from "./categories-tab"
import PromotionsTab from "./promotions-tab"

export default function AdminTabs() {
  const [activeTab, setActiveTab] = useState("products")

  return (
    <Tabs defaultValue="products" onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-3 mb-6">
        <TabsTrigger value="products">Productos</TabsTrigger>
        <TabsTrigger value="categories">Categorías</TabsTrigger>
        <TabsTrigger value="promotions">Promociones</TabsTrigger>
      </TabsList>

      <TabsContent value="products">
        <ProductsTab />
      </TabsContent>

      <TabsContent value="categories">
        <CategoriesTab />
      </TabsContent>

      <TabsContent value="promotions">
        <PromotionsTab />
      </TabsContent>
    </Tabs>
  )
}
