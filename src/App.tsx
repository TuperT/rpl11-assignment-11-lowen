import axios from 'axios'
import { LibraryBig, PlusIcon, Save } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './components/ui/card'
import { Separator } from './components/ui/separator'
import BookCard from './components/BookCard'
import type { BookDataProps } from './types/API'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog'
import { Button } from './components/ui/button'

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})

function App() {
  const [data, setData] = useState<BookDataProps[]>([])
  const [formData, setFormData] = useState({
      title: "",
      author: "",
      description: "",
      genre: "",
      year: "",
      image: "",
  })

  const handleChange = (field: keyof typeof formData, value: string) => {
      setFormData((prev) => ({
          ...prev,
          [field]: value,
      }))
  }

  const handleCreate = async () => {
    try {
        const payload = {
            ...formData,
            genre: formData.genre
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
            year: Number(formData.year),
        }

        await api.post(`/books`, payload)
        location.reload()
    } catch (error) {
        console.error(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/books')
        setData(response.data)
      } catch (error) {
        console.error(error)
      } 
    }

    fetchData()
  }, [])

  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-background p-4 sm:p-8">
      <Card className="w-full max-w-6xl border-r-12 border-b-12 border-primary">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="bg-primary text-primary-foreground flex size-10 shrink-0 items-center justify-center rounded-lg">
                <LibraryBig className="size-5" />
              </div>

              <div>
                <CardTitle className="text-primary text-lg">
                  Book Collection Manager
                </CardTitle>

                <CardDescription className="flex w-full flex-row items-center justify-between gap-3">
                  <p className="flex-1">
                    Every book you&apos;ve read, borrowed or want to brag about —
                    kept on shelf
                  </p>
                </CardDescription>
              </div>
            </div>

            <Dialog>
              <DialogTrigger
                render={<Button variant="outline" size="sm" className="text-primary" />}
              >
                <PlusIcon /> Add Book
              </DialogTrigger>

              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Add book</DialogTitle>
                  <DialogDescription>add book to this website.</DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4 py-2">
                  <div className="flex items-center justify-between gap-3">
                    <img 
                      src={formData.image} 
                      alt="formdata book image"
                      className="size-15 rounded-md object-cover"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <label className="text-sm font-medium">Image</label>
                    <input
                      value={formData.image}
                      onChange={(event) => handleChange("image", event.target.value)}
                      className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring h-9 w-full max-w-[75%] rounded-md border px-3 py-1 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <label className="text-sm font-medium">Title</label>
                    <input
                      value={formData.title}
                      onChange={(event) => handleChange("title", event.target.value)}
                      className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring h-9 w-full max-w-[75%] rounded-md border px-3 py-1 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none"
                    />
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <label className="text-sm font-medium">Author</label>
                    <input
                      value={formData.author}
                      onChange={(event) => handleChange("author", event.target.value)}
                      className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring h-9 w-full max-w-[75%] rounded-md border px-3 py-1 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none"
                    />
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(event) => handleChange("description", event.target.value)}
                      className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring min-h-24 w-full max-w-[75%] rounded-md border px-3 py-2 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <label className="text-sm font-medium">Genre</label>
                    <input
                      value={formData.genre}
                      onChange={(event) => handleChange("genre", event.target.value)}
                      className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring h-9 w-full max-w-[75%] rounded-md border px-3 py-1 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <label className="text-sm font-medium">Year</label>
                    <input
                      type="number"
                      value={formData.year}
                      onChange={(event) => handleChange("year", event.target.value)}
                      className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring h-9 w-full max-w-[75%] rounded-md border px-3 py-1 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none"
                    />
                  </div>
                </div>

                <DialogFooter showCloseButton>
                  <Button onClick={handleCreate}>
                    <Save /> Create
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="p-4 sm:p-6">
          {
          data.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {data.map((book) => (
                <BookCard key={book.id} {...book} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-16 px-20 text-center">
              <LibraryBig className="text-muted-foreground size-8" />

              <p className="text-sm font-medium">
                No books found
              </p>

              <p className="text-muted-foreground text-sm">
                Your shelf is empty. Check back later.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default App
