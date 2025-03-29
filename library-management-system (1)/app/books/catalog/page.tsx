"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, Download, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Sample book data from the dataset
const books = [
  {
    id: 1,
    title: "DYNAMICS OF MACHINERY",
    author: "DAS J B K",
    department: "MECHANICAL",
    category: "UG",
    available: true,
    barcode: "DB3168",
    ebook: true,
  },
  {
    id: 2,
    title: "DESIGN OF MACHINE ELEMENTS-I (MECHANICAL ENGINEERING DESIGN-I)",
    author: "ANNAIAH M H",
    department: "MECHANICAL",
    category: "UG",
    available: true,
    barcode: "49100",
    ebook: false,
  },
  {
    id: 3,
    title: "AIR POLLUTION",
    author: "RAO M N",
    department: "ENVIRONMENTAL",
    category: "UG",
    available: true,
    barcode: "DL301419",
    ebook: true,
  },
  {
    id: 4,
    title: "MEDICAL BIOTECHNOLOGY",
    author: "JOGDAND",
    department: "BT",
    category: "ST",
    available: true,
    barcode: "86781",
    ebook: false,
  },
  {
    id: 5,
    title: "PROGRAMMING IN ANSIC",
    author: "BALAGURUSAMY E",
    department: "CSE",
    category: "UG",
    available: true,
    barcode: "92776",
    ebook: true,
  },
  {
    id: 6,
    title: "HIGHER ENGINEERING MATHEMATICS",
    author: "GREWAL B S",
    department: "MATHEMATICS",
    category: "UG",
    available: true,
    barcode: "93331",
    ebook: true,
  },
  {
    id: 7,
    title: "KANNADA KALI",
    author: "HALEMANE LINGADVARU",
    department: "LANGUAGE",
    category: "UG",
    available: true,
    barcode: "66249",
    ebook: false,
  },
  {
    id: 8,
    title: "PHYSICS FOR ENGINEERS",
    author: "SRINIVASAN M R",
    department: "PHYSICS",
    category: "UG",
    available: true,
    barcode: "85472",
    ebook: true,
  },
  {
    id: 9,
    title: "CHEMISTRY FOR ENGINEERING STUDENTS",
    author: "JAI PRAKASH, B S",
    department: "CHEMISTRY",
    category: "UG",
    available: true,
    barcode: "66423",
    ebook: false,
  },
  {
    id: 10,
    title: "COMPUTER AIDED ENGINEERING DRAWING",
    author: "ANNAIAH M H",
    department: "MECHANICAL",
    category: "UG",
    available: true,
    barcode: "60109",
    ebook: true,
  },
  {
    id: 11,
    title: "PROGRAMMING IN C",
    author: "THAREJA, REEMA",
    department: "CSE",
    category: "UG",
    available: true,
    barcode: "67430",
    ebook: true,
  },
  {
    id: 12,
    title: "FORMAL LANGUAGES AND AUTOMATA THEORY",
    author: "ANURADHA K",
    department: "CSE",
    category: "ST",
    available: true,
    barcode: "DB4230",
    ebook: false,
  },
  {
    id: 13,
    title: "INTRODUCTION TO AUTOMATA THEORY, LANGUAGES AND COMPUTATION",
    author: "HOPCROFT, JOHN.E. MOTWANI, RAJEEV ULLMAN, JEFFEREY D",
    department: "CSE",
    category: "ST",
    available: true,
    barcode: "99849",
    ebook: true,
  },
  {
    id: 14,
    title: "COMPUTER NETWORKING A TOP DOWN APPROACH",
    author: "KUROSE,JAMES F ROSS,KEITH W",
    department: "CSE",
    category: "ST",
    available: true,
    barcode: "99367",
    ebook: true,
  },
  {
    id: 15,
    title: "DATA COMMUNICATIONS AND NETWORKING",
    author: "FOROUZAN",
    department: "CSE",
    category: "UG",
    available: true,
    barcode: "87609",
    ebook: true,
  },
  {
    id: 16,
    title: "LEARNING WEB DESIGN 5/ED A BEGINNER`S GUIDE TO HTML, CSS, JAVASCRIPT, AND WEB GRAPHICS",
    author: "ROBBINS",
    department: "CSE",
    category: "UG",
    available: true,
    barcode: "87709",
    ebook: true,
  },
  {
    id: 17,
    title: "MASS TRANSFER : CONCEPTS AND APPLICATIONS",
    author: "ASOKAN K",
    department: "CHEMICAL",
    category: "UG",
    available: true,
    barcode: "76370",
    ebook: false,
  },
  {
    id: 18,
    title: "HANDS ON MACHINE LEARNING WITH SCIKIT LEARN KERAS AND TENSOR FLOW",
    author: "GERON, AURELIEN",
    department: "CSE",
    category: "ST",
    available: true,
    barcode: "MC4580",
    ebook: true,
  },
  {
    id: 19,
    title: "JAVA SCRIPT",
    author: "GOSELIN, DON",
    department: "CSE",
    category: "UG",
    available: true,
    barcode: "56946",
    ebook: true,
  },
  {
    id: 20,
    title: "MATHEMATICS FOR MACHINE LEARNING",
    author: "DEISENROTH, MARC PETER; FAISAL, A. ALDO; ONG, CHENG SOON",
    department: "CSE",
    category: "ST",
    available: true,
    barcode: "97596",
    ebook: true,
  },
]

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredBooks, setFilteredBooks] = useState(books)
  const [sortOrder, setSortOrder] = useState("asc")
  const [filterDepartment, setFilterDepartment] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterEbook, setFilterEbook] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const booksPerPage = 10

  // Get unique departments and categories for filters
  const departments = ["all", ...new Set(books.map((book) => book.department))]
  const categories = ["all", ...new Set(books.map((book) => book.category))]

  useEffect(() => {
    handleSearch()
  }, [filterDepartment, filterCategory, filterEbook, sortOrder])

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

    if (filterDepartment !== "all") {
      results = results.filter((book) => book.department === filterDepartment)
    }

    if (filterCategory !== "all") {
      results = results.filter((book) => book.category === filterCategory)
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
    setCurrentPage(1)
  }

  // Get current books for pagination
  const indexOfLastBook = currentPage * booksPerPage
  const indexOfFirstBook = indexOfLastBook - booksPerPage
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook)
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage)

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Book Catalog</h1>
          <p className="text-muted-foreground">Browse our comprehensive collection of books</p>
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
                <h3 className="mb-2 text-sm font-medium">Department</h3>
                <Select defaultValue="all" onValueChange={(value) => setFilterDepartment(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept === "all" ? "All Departments" : dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium">Category</h3>
                <Select defaultValue="all" onValueChange={(value) => setFilterCategory(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat === "all" ? "All Categories" : cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="ebook"
                  className="rounded border-gray-300"
                  checked={filterEbook}
                  onChange={(e) => setFilterEbook(e.target.checked)}
                />
                <label htmlFor="ebook" className="text-sm">
                  E-books only
                </label>
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
              <CardTitle>Sort By</CardTitle>
            </CardHeader>
            <CardContent>
              <Select defaultValue="asc" onValueChange={(value) => setSortOrder(value)}>
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

          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Total Books:</span>
                <span className="font-medium">{books.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">E-books Available:</span>
                <span className="font-medium">{books.filter((book) => book.ebook).length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Departments:</span>
                <span className="font-medium">{departments.length - 1}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Categories:</span>
                <span className="font-medium">{categories.length - 1}</span>
              </div>
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
              {currentBooks.map((book) => (
                <Card key={book.id} className="overflow-hidden flex flex-col">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">{book.title}</CardTitle>
                    <CardDescription>{book.author}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 flex-1">
                    <div className="flex items-center justify-between mb-2">
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
                    <Badge variant="success">Available</Badge>
                    <div className="flex gap-2">
                      {book.ebook && (
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="h-3 w-3" />
                          E-book
                        </Button>
                      )}
                      <Button size="sm">Details</Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list" className="m-0">
            <div className="space-y-2">
              {currentBooks.map((book) => (
                <Card key={book.id} className="overflow-hidden">
                  <div className="p-4 flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium">{book.title}</h3>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{book.department}</Badge>
                        <Badge variant="outline">{book.category}</Badge>
                        <Badge variant="success">Available</Badge>
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

          {totalPages > 1 && (
            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage > 1) setCurrentPage(currentPage - 1)
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNumber = i + 1
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setCurrentPage(pageNumber)
                        }}
                        isActive={currentPage === pageNumber}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  )
                })}

                {totalPages > 5 && (
                  <>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setCurrentPage(totalPages)
                        }}
                        isActive={currentPage === totalPages}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  )
}

