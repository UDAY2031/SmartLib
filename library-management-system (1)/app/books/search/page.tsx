"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, SortAsc, Download, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Sample book data
const books = [
  {
    id: 1,
    title: "Programming in ANSI C",
    author: "Balagurusamy E",
    department: "CSE",
    category: "UG",
    available: true,
    barcode: "92776",
    ebook: true,
  },
  {
    id: 2,
    title: "Higher Engineering Mathematics",
    author: "Grewal B S",
    department: "CSE",
    category: "UG",
    available: true,
    barcode: "93331",
    ebook: true,
  },
  {
    id: 3,
    title: "Data Communications and Networking",
    author: "Forouzan",
    department: "CSE",
    category: "UG",
    available: false,
    barcode: "87609",
    ebook: false,
  },
  {
    id: 4,
    title: "Artificial Intelligence",
    author: "Russell Stuart",
    department: "CSE",
    category: "PG",
    available: true,
    barcode: "59228",
    ebook: true,
  },
  {
    id: 5,
    title: "Machine Learning",
    author: "Mitchell, Tom M.",
    department: "CSE",
    category: "PG",
    available: false,
    barcode: "91402",
    ebook: true,
  },
  {
    id: 6,
    title: "Programming in C",
    author: "Thareja Reema",
    department: "CSE",
    category: "UG",
    available: true,
    barcode: "92921",
    ebook: false,
  },
  {
    id: 7,
    title: "Basic Electronics",
    author: "Kothari, D P",
    department: "ECE",
    category: "UG",
    available: true,
    barcode: "71419",
    ebook: false,
  },
  {
    id: 8,
    title: "Signals and Systems",
    author: "Haykin Simon",
    department: "ECE",
    category: "ST",
    available: true,
    barcode: "BB3769",
    ebook: true,
  },
  {
    id: 9,
    title: "Database Systems",
    author: "Elmasri and Navathe",
    department: "CSE",
    category: "ST",
    available: false,
    barcode: "99545",
    ebook: true,
  },
  {
    id: 10,
    title: "Computer Organization",
    author: "Hamacher, V Carl",
    department: "CSE",
    category: "ST",
    available: true,
    barcode: "BB388",
    ebook: false,
  },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredBooks, setFilteredBooks] = useState(books)
  const [sortOrder, setSortOrder] = useState("asc")
  const [filterAvailable, setFilterAvailable] = useState(false)
  const [filterEbook, setFilterEbook] = useState(false)

  const handleSearch = () => {
    let results = books

    if (searchQuery) {
      results = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.barcode.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (filterAvailable) {
      results = results.filter((book) => book.available)
    }

    if (filterEbook) {
      results = results.filter((book) => book.ebook)
    }

    // Sort results
    results = results.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title)
      } else {
        return b.title.localeCompare(a.title)
      }
    })

    setFilteredBooks(results)
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Book Search</h1>
          <p className="text-muted-foreground">Find books by title, author, department, or category</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for a book..."
              className="w-full pl-8 md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={handleSearch}>Search</Button>
        </div>
      </div>

      <div className="grid gap-6 mt-8 md:grid-cols-[250px_1fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="mb-2 text-sm font-medium">Departments</h3>
                <div className="space-y-2">
                  {["CSE", "ECE", "ME", "CV", "BT"].map((dept) => (
                    <div key={dept} className="flex items-center space-x-2">
                      <Checkbox id={`dept-${dept}`} />
                      <Label htmlFor={`dept-${dept}`}>{dept}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium">Categories</h3>
                <div className="space-y-2">
                  {["UG", "PG", "ST", "TS"].map((cat) => (
                    <div key={cat} className="flex items-center space-x-2">
                      <Checkbox id={`cat-${cat}`} />
                      <Label htmlFor={`cat-${cat}`}>{cat}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="available"
                  checked={filterAvailable}
                  onCheckedChange={(checked) => {
                    setFilterAvailable(checked === true)
                    handleSearch()
                  }}
                />
                <Label htmlFor="available">Available books only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="ebook"
                  checked={filterEbook}
                  onCheckedChange={(checked) => {
                    setFilterEbook(checked === true)
                  }}
                />
                <Label htmlFor="ebook">E-books only</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={handleSearch}>
                Apply Filters
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SortAsc className="h-4 w-4" />
                Sort
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                defaultValue="asc"
                onValueChange={(value) => {
                  setSortOrder(value)
                  handleSearch()
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Title (A-Z)</SelectItem>
                  <SelectItem value="desc">Title (Z-A)</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{filteredBooks.length} books found</p>
            <Tabs defaultValue="grid" className="w-[200px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <TabsContent value="grid" className="m-0">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBooks.map((book) => (
                <Card key={book.id} className="overflow-hidden">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">{book.title}</CardTitle>
                    <CardDescription>{book.author}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 flex-1">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{book.department}</Badge>
                      <Badge variant="outline">{book.category}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Barcode: {book.barcode}</p>
                    {book.ebook && (
                      <div className="mt-2 flex items-center text-xs text-primary">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        E-book available
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="p-4 border-t flex justify-between">
                    <Badge variant={book.available ? "success" : "destructive"}>
                      {book.available ? "Available" : "Checked Out"}
                    </Badge>
                    <div className="flex gap-2">
                      {book.ebook && (
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="h-3 w-3" />
                          E-book
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list" className="m-0">
            <div className="space-y-2">
              {filteredBooks.map((book) => (
                <Card key={book.id} className="overflow-hidden">
                  <div className="p-4 flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium">{book.title}</h3>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{book.department}</Badge>
                        <Badge variant="outline">{book.category}</Badge>
                        <Badge variant={book.available ? "success" : "destructive"}>
                          {book.available ? "Available" : "Checked Out"}
                        </Badge>
                        {book.ebook && (
                          <div className="flex items-center text-xs text-primary">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            E-book
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {book.ebook && (
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="h-3 w-3" />
                          E-book
                        </Button>
                      )}
                      <Button size="sm">Details</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </div>
      </div>
    </div>
  )
}

