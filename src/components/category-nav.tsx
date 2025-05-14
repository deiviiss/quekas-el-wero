"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Category } from "@/lib/types"
import { Menu } from "lucide-react"

interface CategoryNavProps {
  categories: Category[]
}

export default function CategoryNav({ categories }: CategoryNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(`category-${categoryId}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <motion.div
        className="p-4 flex justify-between items-center md:hidden cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ backgroundColor: "#f9fafb" }}
      >
        <h3 className="font-semibold">Categorías</h3>
        <Menu className="h-5 w-5" />
      </motion.div>

      <AnimatePresence>
        <div className={`md:block ${isOpen ? "block" : "hidden"}`}>
          <motion.ul
            className="divide-y"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {categories.map((category, index) => (
              <motion.li
                key={category.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <motion.button
                  onClick={() => scrollToCategory(category.id)}
                  className="w-full text-left px-4 py-3 hover:bg-orange-50 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  {category.name}
                </motion.button>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </AnimatePresence>
    </div>
  )
}
