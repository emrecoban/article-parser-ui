import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, Users, CheckCircle } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <FileText className="h-6 w-6" />
            <span>Makale Analizi</span>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
              Giriş Yap
            </Link>
            <Link href="/register" className="text-sm font-medium hover:underline underline-offset-4">
              Kayıt Ol
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Akademik Makale Geri Bildirimi Kolaylaştırıldı
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Makale Analizi, öğrencilerin akademik makalelerine öğretmen tarafından belirlenen kriterlere göre
                  yapılandırılmış geri bildirim almalarına yardımcı olur.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register">
                  <Button>Başlayın</Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline">Daha Fazla Bilgi</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 items-start">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <FileText className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Makaleleri Yükleyin</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Öğrenciler, değerlendirme için akademik makalelerini .docx formatında kolayca yükleyebilir.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Users className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Özel Kriterler</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Öğretmenler, gereksinimlerine göre özelleştirilmiş değerlendirme kriterleri oluşturabilir ve
                    yönetebilir.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Yapılandırılmış Geri Bildirim</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Akademik yazımı geliştirmek için belirli kriterlere dayalı ayrıntılı geri bildirim alın.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col gap-2 sm:flex-row py-6 w-full items-center justify-between px-4 md:px-6">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Makale Analizi. Tüm hakları saklıdır.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="/terms" className="text-xs hover:underline underline-offset-4">
              Kullanım Şartları
            </Link>
            <Link href="/privacy" className="text-xs hover:underline underline-offset-4">
              Gizlilik
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

