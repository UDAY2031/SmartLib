"use client"

import { useRef, useEffect, useState } from "react"
import { MapPin, BookOpen } from "lucide-react"

// Sample data for book locations with department information
const bookLocations = [
  {
    id: 1,
    title: "Programming in ANSI C",
    author: "Balagurusamy E",
    department: "CSE",
    x: 120,
    y: 150,
    popularity: 42,
    barcode: "92776",
  },
  {
    id: 2,
    title: "Higher Engineering Mathematics",
    author: "Grewal B S",
    department: "MATHEMATICS",
    x: 220,
    y: 180,
    popularity: 38,
    barcode: "93331",
  },
  {
    id: 3,
    title: "Data Communications and Networking",
    author: "Forouzan",
    department: "CSE",
    x: 350,
    y: 120,
    popularity: 31,
    barcode: "87609",
  },
  {
    id: 4,
    title: "Artificial Intelligence",
    author: "Russell Stuart",
    department: "CSE",
    x: 450,
    y: 250,
    popularity: 28,
    barcode: "59228",
  },
  {
    id: 5,
    title: "Machine Learning",
    author: "Mitchell, Tom M.",
    department: "CSE",
    x: 180,
    y: 320,
    popularity: 25,
    barcode: "91402",
  },
  {
    id: 6,
    title: "Programming in C",
    author: "Thareja Reema",
    department: "CSE",
    x: 280,
    y: 380,
    popularity: 22,
    barcode: "92921",
  },
  {
    id: 7,
    title: "Basic Electronics",
    author: "Kothari, D P",
    department: "ECE",
    x: 400,
    y: 420,
    popularity: 20,
    barcode: "71419",
  },
  {
    id: 8,
    title: "Signals and Systems",
    author: "Haykin Simon",
    department: "ECE",
    x: 520,
    y: 350,
    popularity: 18,
    barcode: "BB3769",
  },
  {
    id: 9,
    title: "Database Systems",
    author: "Elmasri and Navathe",
    department: "CSE",
    x: 150,
    y: 450,
    popularity: 15,
    barcode: "99545",
  },
  {
    id: 10,
    title: "Computer Organization",
    author: "Hamacher, V Carl",
    department: "CSE",
    x: 320,
    y: 200,
    popularity: 12,
    barcode: "BB388",
  },
  {
    id: 11,
    title: "DYNAMICS OF MACHINERY",
    author: "DAS J B K",
    department: "MECHANICAL",
    x: 480,
    y: 180,
    popularity: 30,
    barcode: "DB3168",
  },
  {
    id: 12,
    title: "AIR POLLUTION",
    author: "RAO M N",
    department: "ENVIRONMENTAL",
    x: 380,
    y: 280,
    popularity: 22,
    barcode: "DL301419",
  },
  {
    id: 13,
    title: "MEDICAL BIOTECHNOLOGY",
    author: "JOGDAND",
    department: "BT",
    x: 250,
    y: 450,
    popularity: 18,
    barcode: "86781",
  },
  {
    id: 14,
    title: "CHEMISTRY FOR ENGINEERING STUDENTS",
    author: "JAI PRAKASH, B S",
    department: "CHEMISTRY",
    x: 150,
    y: 250,
    popularity: 24,
    barcode: "66423",
  },
  {
    id: 15,
    title: "COMPUTER AIDED ENGINEERING DRAWING",
    author: "ANNAIAH M H",
    department: "MECHANICAL",
    x: 520,
    y: 150,
    popularity: 19,
    barcode: "60109",
  },
]

// Library sections based on departments from the dataset
const librarySections = [
  { id: 1, name: "Computer Science", x: 150, y: 200, width: 200, height: 150 },
  { id: 2, name: "Electronics", x: 400, y: 150, width: 180, height: 120 },
  { id: 3, name: "Mechanical", x: 450, y: 150, width: 220, height: 130 },
  { id: 4, name: "Environmental", x: 350, y: 300, width: 150, height: 150 },
  { id: 5, name: "Biotechnology", x: 200, y: 400, width: 120, height: 100 },
  { id: 6, name: "Mathematics", x: 200, y: 150, width: 150, height: 100 },
  { id: 7, name: "Chemistry", x: 100, y: 250, width: 120, height: 100 },
]

export default function LibraryMap({ view = "standard" }) {
  const canvasRef = useRef(null)
  const [selectedBook, setSelectedBook] = useState(null)
  const [hoveredSection, setHoveredSection] = useState(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const dpr = window.devicePixelRatio || 1

    // Set canvas size with device pixel ratio for sharp rendering
    canvas.width = canvas.clientWidth * dpr
    canvas.height = canvas.clientHeight * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw library layout
    drawLibraryLayout(ctx)

    // Draw book locations or heatmap
    if (view === "standard") {
      drawBookLocations(ctx)
    } else {
      drawHeatmap(ctx)
    }

    // Add event listeners for interaction
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = (e.clientX - rect.left) * (canvas.width / rect.width / dpr)
      const y = (e.clientY - rect.top) * (canvas.height / rect.height / dpr)

      // Check if mouse is over a book
      let found = false
      for (const book of bookLocations) {
        const distance = Math.sqrt((x - book.x) ** 2 + (y - book.y) ** 2)
        if (distance < 10) {
          canvas.style.cursor = "pointer"
          found = true
          break
        }
      }

      // Check if mouse is over a section
      let foundSection = null
      for (const section of librarySections) {
        if (x >= section.x && x <= section.x + section.width && y >= section.y && y <= section.y + section.height) {
          foundSection = section
          canvas.style.cursor = "pointer"
          found = true
          break
        }
      }

      if (!found) {
        canvas.style.cursor = "default"
      }

      if (foundSection !== hoveredSection) {
        setHoveredSection(foundSection)
        drawLibraryLayout(ctx)
        if (view === "standard") {
          drawBookLocations(ctx)
        } else {
          drawHeatmap(ctx)
        }
      }
    }

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = (e.clientX - rect.left) * (canvas.width / rect.width / dpr)
      const y = (e.clientY - rect.top) * (canvas.height / rect.height / dpr)

      // Check if clicked on a book
      for (const book of bookLocations) {
        const distance = Math.sqrt((x - book.x) ** 2 + (y - book.y) ** 2)
        if (distance < 10) {
          setSelectedBook(book)
          return
        }
      }

      setSelectedBook(null)
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("click", handleClick)

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("click", handleClick)
    }
  }, [view, hoveredSection])

  // Draw the library layout
  const drawLibraryLayout = (ctx) => {
    // Draw background
    ctx.fillStyle = "#f8f9fa"
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // Draw sections
    librarySections.forEach((section) => {
      ctx.fillStyle = section === hoveredSection ? "rgba(99, 102, 241, 0.2)" : "rgba(229, 231, 235, 0.8)"
      ctx.strokeStyle = section === hoveredSection ? "#6366f1" : "#d1d5db"
      ctx.lineWidth = 2

      ctx.beginPath()
      ctx.rect(section.x, section.y, section.width, section.height)
      ctx.fill()
      ctx.stroke()

      // Draw section name
      ctx.fillStyle = "#1f2937"
      ctx.font = "14px 'Geist', sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(section.name, section.x + section.width / 2, section.y + section.height / 2)
    })

    // Draw walkways
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 15

    // Horizontal walkway
    ctx.beginPath()
    ctx.moveTo(50, 300)
    ctx.lineTo(650, 300)
    ctx.stroke()

    // Vertical walkway
    ctx.beginPath()
    ctx.moveTo(350, 50)
    ctx.lineTo(350, 550)
    ctx.stroke()

    // Draw entrance
    ctx.fillStyle = "#10b981"
    ctx.beginPath()
    ctx.rect(325, 550, 50, 20)
    ctx.fill()

    ctx.fillStyle = "#1f2937"
    ctx.font = "12px 'Geist', sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Entrance", 350, 565)
  }

  // Draw book locations
  const drawBookLocations = (ctx) => {
    bookLocations.forEach((book) => {
      // Draw pin
      ctx.fillStyle = "#6366f1"
      ctx.beginPath()
      ctx.arc(book.x, book.y, 6, 0, Math.PI * 2)
      ctx.fill()

      // Draw small dot in center
      ctx.fillStyle = "#ffffff"
      ctx.beginPath()
      ctx.arc(book.x, book.y, 2, 0, Math.PI * 2)
      ctx.fill()
    })
  }

  // Draw heatmap
  const drawHeatmap = (ctx) => {
    // First draw department-based heat zones
    librarySections.forEach((section) => {
      const gradient = ctx.createRadialGradient(
        section.x + section.width / 2,
        section.y + section.height / 2,
        0,
        section.x + section.width / 2,
        section.y + section.height / 2,
        Math.max(section.width, section.height),
      )

      // Count books in this section
      const booksInSection = bookLocations.filter(
        (book) =>
          book.x >= section.x &&
          book.x <= section.x + section.width &&
          book.y >= section.y &&
          book.y <= section.y + section.height,
      ).length

      const intensity = Math.min(0.5, booksInSection / 10)

      gradient.addColorStop(0, `rgba(59, 130, 246, ${intensity})`)
      gradient.addColorStop(0.7, `rgba(59, 130, 246, ${intensity * 0.3})`)
      gradient.addColorStop(1, "rgba(59, 130, 246, 0)")

      ctx.fillStyle = gradient
      ctx.fillRect(section.x, section.y, section.width, section.height)
    })

    // Then draw individual book heat points
    bookLocations.forEach((book) => {
      const radius = 20 + book.popularity
      const gradient = ctx.createRadialGradient(book.x, book.y, 0, book.x, book.y, radius)
      const alpha = Math.min(0.7, book.popularity / 50)

      gradient.addColorStop(0, `rgba(239, 68, 68, ${alpha})`)
      gradient.addColorStop(0.5, `rgba(239, 68, 68, ${alpha * 0.5})`)
      gradient.addColorStop(1, "rgba(239, 68, 68, 0)")

      ctx.fillStyle = gradient

      ctx.beginPath()
      ctx.arc(book.x, book.y, radius, 0, Math.PI * 2)
      ctx.fill()
    })
  }

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" style={{ width: "100%", height: "100%" }} />

      {selectedBook && (
        <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm p-4 rounded-lg border shadow-md max-w-xs">
          <div className="flex items-start gap-2">
            <BookOpen className="h-5 w-5 mt-0.5 text-primary" />
            <div>
              <h3 className="font-medium">{selectedBook.title}</h3>
              <p className="text-sm text-muted-foreground">by {selectedBook.author}</p>
              <div className="flex items-center gap-1 mt-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>
                  Shelf {String.fromCharCode(65 + Math.floor(selectedBook.id / 5))}-
                  {selectedBook.id.toString().padStart(2, "0")}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Department: {selectedBook.department}</p>
              <p className="text-xs text-muted-foreground">Barcode: {selectedBook.barcode}</p>
              <p className="text-xs text-muted-foreground">Popularity: {selectedBook.popularity} checkouts</p>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-background/95 backdrop-blur-sm p-2 rounded-lg border">
        <div className="text-xs font-medium">Legend:</div>
        {view === "standard" ? (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-xs">Book Location</span>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs">High Demand</span>
          </div>
        )}
      </div>
    </div>
  )
}

