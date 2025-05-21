import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Navbar } from "@/components/navbar"
import { SidebarCart } from "@/components/sidebar-cart"
import { Footer } from "@/components/footer"
import { Toaster } from "sonner"
import { Providers } from "@/components/providers/Providers"
import "./globals.css"
import { ToogleDarkMode } from "@/components/dark-mode/toogle-dark-mode/ToogleDarkMode"
import ScrollToTop from "@/components/scroll-to-top/ScrollToTop"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Quekas El Wero | Menú Digital",
  description: "Explora nuestro menú digital y haz tu pedido por WhatsApp. Birrias, trancas, promociones y más con el sabor de siempre.",
  generator: "Quekas El Wero · Menú digital"
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <SidebarCart />

          {children}

          {/* dark mode button */}
          <ToogleDarkMode />
          <ScrollToTop />

          <Toaster position="bottom-right" richColors />

          <Footer />
        </Providers>
      </body>
    </html>
  )
}
