"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Upload, FileUp, LogOut } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function StudentDashboard() {
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      name: "Araştırma Makalesi Taslağı.docx",
      date: "2023-11-15",
      status: "evaluated",
      feedback: [
        {
          criterion: "Özet uzunluğu",
          status: "passed",
          message: "Özet 175 kelimedir, minimum 150 kelime gereksinimini karşılıyor.",
        },
        {
          criterion: "Anahtar kelimeler",
          status: "failed",
          message: "Anahtar kelimeler 4 kelimeden oluşuyor. Gereksinim tam olarak 3 kelimedir.",
        },
        { criterion: "Alıntı formatı", status: "passed", message: "Tüm alıntılar gerekli formatı takip ediyor." },
      ],
    },
    {
      id: 2,
      name: "Literatür Taraması.docx",
      date: "2023-12-01",
      status: "pending",
      feedback: [],
    },
  ])

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.name.endsWith(".docx")) {
      const newFile = {
        id: uploadedFiles.length + 1,
        name: file.name,
        date: new Date().toISOString().split("T")[0],
        status: "pending",
        feedback: [],
      }
      setUploadedFiles([...uploadedFiles, newFile])
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <FileText className="h-6 w-6" />
            <span>Makale Analizi</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@student" />
                <AvatarFallback>ÖĞ</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden md:inline-block">Ahmet Öğrenci</span>
            </div>
            <Link href="/login">
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Çıkış Yap</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6 px-4 md:px-6 md:py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Öğrenci Paneli</h1>
            <p className="text-muted-foreground">Akademik makalelerinizi yükleyin ve yönetin</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              <label htmlFor="file-upload" className="cursor-pointer">
                Makale Yükle
              </label>
              <input id="file-upload" type="file" accept=".docx" className="hidden" onChange={handleFileUpload} />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="manuscripts" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="manuscripts">Makalelerim</TabsTrigger>
            <TabsTrigger value="criteria">Değerlendirme Kriterleri</TabsTrigger>
          </TabsList>
          <TabsContent value="manuscripts">
            <div className="grid gap-4">
              {uploadedFiles.map((file) => (
                <Card key={file.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          {file.name}
                        </CardTitle>
                        <CardDescription>Yükleme tarihi: {file.date}</CardDescription>
                      </div>
                      <Badge variant={file.status === "evaluated" ? "default" : "secondary"}>
                        {file.status === "evaluated" ? "Değerlendirildi" : "Beklemede"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {file.status === "evaluated" ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Değerlendirme Sonuçları</span>
                          <span className="text-sm">
                            {file.feedback.filter((f) => f.status === "passed").length} / {file.feedback.length} kriter
                            geçildi
                          </span>
                        </div>
                        <Progress
                          value={
                            (file.feedback.filter((f) => f.status === "passed").length / file.feedback.length) * 100
                          }
                        />
                        <Separator />
                        <div className="space-y-2">
                          {file.feedback.map((item, index) => (
                            <Alert key={index} variant={item.status === "passed" ? "default" : "destructive"}>
                              <AlertTitle className="flex items-center gap-2">
                                {item.criterion}
                                <Badge variant={item.status === "passed" ? "outline" : "destructive"} className="ml-2">
                                  {item.status === "passed" ? "Geçti" : "Başarısız"}
                                </Badge>
                              </AlertTitle>
                              <AlertDescription>{item.message}</AlertDescription>
                            </Alert>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">
                        <p>Bu makale değerlendirme bekliyor.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              {uploadedFiles.length === 0 && (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <FileUp className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-center">
                      Henüz hiç makale yüklemediniz. Başlamak için Yükle butonuna tıklayın.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          <TabsContent value="criteria">
            <Card>
              <CardHeader>
                <CardTitle>Değerlendirme Kriterleri</CardTitle>
                <CardDescription>Makalelerinizin değerlendirileceği kriterler</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Özet Gereksinimleri</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Özet en az 150 kelime olmalıdır</li>
                      <li>Özet araştırma hedeflerini, metodolojisini ve temel bulgularını içermelidir</li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Anahtar Kelimeler</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Anahtar kelimeler tam olarak üç kelimeden oluşmalıdır</li>
                      <li>Anahtar kelimeler araştırma konusuyla ilgili olmalıdır</li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Alıntı Formatı</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Tüm alıntılar APA 7. baskı formatını takip etmelidir</li>
                      <li>Metin içi alıntılar yazar ve yıl içermelidir</li>
                      <li>Kaynakça alfabetik olarak sıralanmalıdır</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col gap-2 sm:flex-row py-6 w-full items-center justify-between px-4 md:px-6">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Makale Analizi. Tüm hakları saklıdır.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="/help" className="text-xs hover:underline underline-offset-4">
              Yardım
            </Link>
            <Link href="/support" className="text-xs hover:underline underline-offset-4">
              Destek
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

