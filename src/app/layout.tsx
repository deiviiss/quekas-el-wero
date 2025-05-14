import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Footer from "@/components/footer"
import { Toaster } from "sonner"
import SidebarCart from "@/components/sidebar-cart"
import Navbar from "@/components/ui/navbar"
import SidebarCategories from "@/components/sidebar-categories"
import { getCategories } from "@/lib/data"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Menú Digital",
  description: "Sistema de menú digital con integración de WhatsApp",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={inter.className}>

        <Navbar />
        <SidebarCart />
        {children}
        <Footer />
        <Toaster position="bottom-right" richColors />

      </body>
    </html>
  )
}
