import "@/app/globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Makale Analizi - Akademik Makale Geri Bildirimi",
  description: "Öğretmen tarafından belirlenen kriterlere göre akademik makaleleri yükleyin ve geri bildirim alın",
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

