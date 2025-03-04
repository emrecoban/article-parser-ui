"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Plus, LogOut, Edit, Trash2, CheckCircle, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function TeacherDashboard() {
  const [criteria, setCriteria] = useState([
    {
      id: 1,
      name: "Özet Uzunluğu",
      description: "Özet en az 150 kelime olmalıdır",
      type: "word-count",
      parameters: { min: 150, section: "abstract" },
    },
    {
      id: 2,
      name: "Anahtar Kelime Sayısı",
      description: "Anahtar kelimeler tam olarak üç kelimeden oluşmalıdır",
      type: "keyword-count",
      parameters: { count: 3 },
    },
    {
      id: 3,
      name: "Alıntı Formatı",
      description: "Tüm alıntılar APA 7. baskı formatını takip etmelidir",
      type: "format-check",
      parameters: { format: "APA" },
    },
  ])

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Ahmet Yılmaz",
      email: "ahmet.yilmaz@example.com",
      manuscripts: 2,
      lastActive: "2023-12-05",
    },
    {
      id: 2,
      name: "Ayşe Kaya",
      email: "ayse.k@example.com",
      manuscripts: 1,
      lastActive: "2023-12-01",
    },
    {
      id: 3,
      name: "Mehmet Demir",
      email: "m.demir@example.com",
      manuscripts: 0,
      lastActive: "2023-11-28",
    },
  ])

  const [manuscripts, setManuscripts] = useState([
    {
      id: 1,
      title: "Araştırma Makalesi Taslağı.docx",
      student: "Ahmet Yılmaz",
      uploadDate: "2023-11-15",
      status: "evaluated",
      results: { passed: 2, failed: 1 },
    },
    {
      id: 2,
      title: "Literatür Taraması.docx",
      student: "Ahmet Yılmaz",
      uploadDate: "2023-12-01",
      status: "pending",
      results: null,
    },
    {
      id: 3,
      title: "Metodoloji Bölümü.docx",
      student: "Ayşe Kaya",
      uploadDate: "2023-11-30",
      status: "evaluated",
      results: { passed: 3, failed: 0 },
    },
  ])

  const [newCriterion, setNewCriterion] = useState({
    name: "",
    description: "",
    type: "word-count",
    parameters: {},
  })

  const handleAddCriterion = () => {
    setCriteria([...criteria, { ...newCriterion, id: criteria.length + 1 }])
    setNewCriterion({
      name: "",
      description: "",
      type: "word-count",
      parameters: {},
    })
  }

  const handleDeleteCriterion = (id) => {
    setCriteria(criteria.filter((c) => c.id !== id))
  }

  const handleEvaluateManuscript = (id) => {
    setManuscripts(
      manuscripts.map((m) => {
        if (m.id === id) {
          return {
            ...m,
            status: "evaluated",
            results: { passed: Math.floor(Math.random() * 3) + 1, failed: Math.floor(Math.random() * 2) },
          }
        }
        return m
      }),
    )
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
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@teacher" />
                <AvatarFallback>ÖĞ</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden md:inline-block">Dr. Ayşe Öğretmen</span>
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
            <h1 className="text-2xl font-bold tracking-tight">Öğretmen Paneli</h1>
            <p className="text-muted-foreground">
              Değerlendirme kriterlerini yönetin ve öğrenci makalelerini inceleyin
            </p>
          </div>
        </div>

        <Tabs defaultValue="criteria" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="criteria">Değerlendirme Kriterleri</TabsTrigger>
            <TabsTrigger value="manuscripts">Makaleler</TabsTrigger>
            <TabsTrigger value="students">Öğrenciler</TabsTrigger>
          </TabsList>

          <TabsContent value="criteria">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Değerlendirme Kriterlerini Yönet</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Yeni Kriter Ekle
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Değerlendirme Kriteri Ekle</DialogTitle>
                    <DialogDescription>
                      Öğrenci makalelerini değerlendirmek için yeni bir kriter oluşturun.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Kriter Adı</Label>
                      <Input
                        id="name"
                        value={newCriterion.name}
                        onChange={(e) => setNewCriterion({ ...newCriterion, name: e.target.value })}
                        placeholder="örn., Özet Uzunluğu"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Açıklama</Label>
                      <Textarea
                        id="description"
                        value={newCriterion.description}
                        onChange={(e) => setNewCriterion({ ...newCriterion, description: e.target.value })}
                        placeholder="örn., Özet en az 150 kelime olmalıdır"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="type">Kriter Tipi</Label>
                      <Select
                        value={newCriterion.type}
                        onValueChange={(value) => setNewCriterion({ ...newCriterion, type: value })}
                      >
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Tip seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="word-count">Kelime Sayısı</SelectItem>
                          <SelectItem value="keyword-count">Anahtar Kelime Sayısı</SelectItem>
                          <SelectItem value="format-check">Format Kontrolü</SelectItem>
                          <SelectItem value="custom">Özel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {newCriterion.type === "word-count" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="min-words">Minimum Kelime</Label>
                          <Input
                            id="min-words"
                            type="number"
                            placeholder="150"
                            onChange={(e) =>
                              setNewCriterion({
                                ...newCriterion,
                                parameters: { ...newCriterion.parameters, min: Number.parseInt(e.target.value) },
                              })
                            }
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="section">Bölüm</Label>
                          <Select
                            onValueChange={(value) =>
                              setNewCriterion({
                                ...newCriterion,
                                parameters: { ...newCriterion.parameters, section: value },
                              })
                            }
                          >
                            <SelectTrigger id="section">
                              <SelectValue placeholder="Bölüm seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="abstract">Özet</SelectItem>
                              <SelectItem value="introduction">Giriş</SelectItem>
                              <SelectItem value="conclusion">Sonuç</SelectItem>
                              <SelectItem value="full">Tüm Belge</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddCriterion}>Kriter Ekle</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {criteria.map((criterion) => (
                <Card key={criterion.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{criterion.name}</CardTitle>
                        <CardDescription>{criterion.description}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteCriterion(criterion.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{criterion.type}</Badge>
                      {criterion.type === "word-count" && (
                        <span className="text-sm text-muted-foreground">
                          Min: {criterion.parameters.min} kelime | Bölüm: {criterion.parameters.section}
                        </span>
                      )}
                      {criterion.type === "keyword-count" && (
                        <span className="text-sm text-muted-foreground">
                          Gerekli: {criterion.parameters.count} kelime
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
              {criteria.length === 0 && (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <CheckCircle className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-center">
                      Henüz hiç değerlendirme kriteri oluşturmadınız. Başlamak için Yeni Kriter Ekle butonuna tıklayın.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="manuscripts">
            <Card>
              <CardHeader>
                <CardTitle>Öğrenci Makaleleri</CardTitle>
                <CardDescription>Öğrencilerinizin gönderdiği makaleleri inceleyin ve değerlendirin</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Başlık</TableHead>
                      <TableHead>Öğrenci</TableHead>
                      <TableHead>Yükleme Tarihi</TableHead>
                      <TableHead>Durum</TableHead>
                      <TableHead>Sonuçlar</TableHead>
                      <TableHead className="text-right">İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {manuscripts.map((manuscript) => (
                      <TableRow key={manuscript.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            {manuscript.title}
                          </div>
                        </TableCell>
                        <TableCell>{manuscript.student}</TableCell>
                        <TableCell>{manuscript.uploadDate}</TableCell>
                        <TableCell>
                          <Badge variant={manuscript.status === "evaluated" ? "default" : "secondary"}>
                            {manuscript.status === "evaluated" ? "Değerlendirildi" : "Beklemede"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {manuscript.results ? (
                            <div className="flex items-center gap-2">
                              <span className="flex items-center text-green-600">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                {manuscript.results.passed}
                              </span>
                              <span className="flex items-center text-red-600">
                                <XCircle className="h-4 w-4 mr-1" />
                                {manuscript.results.failed}
                              </span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {manuscript.status === "pending" ? (
                            <Button size="sm" onClick={() => handleEvaluateManuscript(manuscript.id)}>
                              Değerlendir
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline">
                              Detayları Gör
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Öğrencileri Yönet</CardTitle>
                <CardDescription>Derslerinize atanmış öğrencileri görüntüleyin ve yönetin</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ad Soyad</TableHead>
                      <TableHead>E-posta</TableHead>
                      <TableHead>Makaleler</TableHead>
                      <TableHead>Son Aktif</TableHead>
                      <TableHead className="text-right">İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback>
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            {student.name}
                          </div>
                        </TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.manuscripts}</TableCell>
                        <TableCell>{student.lastActive}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline">
                            Yönet
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Öğrenci Ekle
                </Button>
              </CardFooter>
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

