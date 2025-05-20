import Link from "next/link"
import { Facebook } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa";

export function Footer() {
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER // Business phone number
  return (
    <footer className="bg-gray-800 dark:bg-gray-950 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Quekas El Wero</h3>
            <p className="text-gray-300">Lo bueno se comparte... y se pide por WhatsApp. </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-card transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/conditions" className="text-gray-300 hover:text-white transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/profile.php?id=100076219748466&sk=photos_by"
                target="_blank"
                className="bg-gray-700 hover:bg-blue-600 p-2 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href={`https://wa.me/${phoneNumber}`}
                target="_blank"
                className="bg-gray-700 hover:bg-green-600 p-2 rounded-full transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="h-5 w-5" />
              </Link>
            </div>
            <div className="mt-4">
              <p className="text-gray-300">Contáctanos:</p>
              <p className="text-gray-300">jorgesnz97@gmail.com</p>
              <p className="text-gray-300">981 171 8512</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-300">
          <p>© {new Date().getFullYear()} Quekas El Wero. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
