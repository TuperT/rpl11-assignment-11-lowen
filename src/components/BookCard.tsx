import { useState } from "react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from "./ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import { Separator } from "./ui/separator"
import type { BookDataProps } from "../types/API"
import { BookOpen, Pen, Save, Trash, Trash2 } from "lucide-react"
import axios from "axios"

const BookCard = ({ id, author, description, genre, image, title, year }: BookDataProps) => {
    const [formData, setFormData] = useState({
        title,
        author,
        description,
        genre: genre.join(", "),
        year: String(year),
        image,
    })

    const api = axios.create({
        baseURL: import.meta.env.VITE_BASE_URL,
    })

    const handleChange = (field: keyof typeof formData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleUpdate = async () => {
        try {
            const payload = {
                ...formData,
                genre: formData.genre
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),
                year: Number(formData.year),
            }

            await api.put(`/books/${id}`, payload)
            location.reload()
        } catch (error) {
            console.error(error)
        }
    }

    const handleDelete = async () => {
        try {
            await api.delete(`/books/${id}`)
            location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Card className="group gap-0 overflow-hidden py-0 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative">
                <img
                src={image}
                alt={title}
                loading="lazy"
                className="aspect-square w-full object-cover"
                />
                
                <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/70 to-transparent" />

                <span className="absolute top-2 left-2 flex flex-row gap-1">
                    {genre.slice(0, 2).map((genre) => (
                        <Badge key={genre} variant="secondary" className="bg-card/95 shadow-sm">
                            {genre}
                        </Badge>
                    ))}
                </span>

                <CardTitle className="absolute right-2 bottom-2 left-2 line-clamp-2 text-sm text-white">
                    {title}
                </CardTitle>
            </div>

            <CardContent className="flex flex-col gap-2 p-4">   
                <CardDescription className="line-clamp-2 text-xs">
                    {description}
                </CardDescription>

                <p className="text-muted-foreground text-[11px]">
                    {author} &middot; {year}
                </p>
            </CardContent>

            <Separator />

            <CardFooter className="flex flex-row justify-end gap-1 border-0 bg-transparent">
                <Dialog>
                    <DialogTrigger
                    render={<Button variant="outline" size="sm" className="text-primary" />}
                    >
                        <BookOpen />
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <img
                                src={image}
                                alt={title}
                                className="aspect-square w-full rounded-lg object-cover object-center"
                            />

                            <div className="flex flex-wrap gap-1.5 pt-2">
                                {genre.map((genre) => (
                                <Badge key={genre}>
                                    {genre}
                                </Badge>
                                ))}
                                <Badge variant="outline">{year}</Badge>
                            </div>

                            <DialogTitle className="pt-1 text-lg">{title}</DialogTitle>

                            <DialogDescription className="max-h-50 overflow-scroll">
                                <span className="text-muted-foreground text-sm leading-tight">by {author}</span>
                                <p>{description}</p>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                <Dialog>
                    <DialogTrigger
                    render={<Button variant="outline" size="sm" className="text-primary" />}
                    >
                        <Pen />
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Edit book</DialogTitle>
                            <DialogDescription>Update the details for this book.</DialogDescription>
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
                            <Button onClick={handleUpdate}>
                                <Save /> Save
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog>
                    <DialogTrigger
                    render={<Button variant="destructive" size="sm" />}
                    >
                        <Trash />
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <img
                                src={image}
                                alt={title}
                                className="aspect-square w-full rounded-lg object-cover object-center"
                            />

                            <div className="flex flex-wrap gap-1.5 pt-2">
                                {genre.map((genre) => (
                                <Badge key={genre}>
                                    {genre}
                                </Badge>
                                ))}
                                <Badge variant="outline">{year}</Badge>
                            </div>

                            <DialogTitle className="pt-1 text-lg">{title}</DialogTitle>

                            <DialogDescription className="max-h-50 overflow-scroll">
                                <span className="text-muted-foreground text-sm leading-tight">by {author}</span>
                                <p>{description}</p>
                            </DialogDescription>

                            <div className="flex flex-row items-center">
                                "{title}" book will be <span className="text-red-600">(deleted)</span>, are you sure?
                            </div>
                        </DialogHeader>

                        <DialogFooter showCloseButton>
                            <Button variant="destructive" onClick={handleDelete}>
                                <Trash2 /> Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    )
}

export default BookCard
