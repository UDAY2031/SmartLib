"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Brain, BookMarked, History, Sparkles } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Sample recommended books based on the dataset
const personalRecommendations = [
  {
    id: 1,
    title: "HANDS ON MACHINE LEARNING WITH SCIKIT LEARN KERAS AND TENSOR FLOW",
    author: "GERON, AURELIEN",
    match: 95,
    category: "AI/ML",
  },
  {
    id: 2,
    title: "INTRODUCTION TO AUTOMATA THEORY, LANGUAGES AND COMPUTATION",
    author: "HOPCROFT, JOHN.E. MOTWANI, RAJEEV ULLMAN, JEFFEREY D",
    match: 92,
    category: "Computer Science",
  },
  {
    id: 3,
    title: "COMPUTER NETWORKING A TOP DOWN APPROACH",
    author: "KUROSE,JAMES F ROSS,KEITH W",
    match: 88,
    category: "Networking",
  },
  {
    id: 4,
    title: "MATHEMATICS FOR MACHINE LEARNING",
    author: "DEISENROTH, MARC PETER; FAISAL, A. ALDO; ONG, CHENG SOON",
    match: 85,
    category: "Mathematics",
  },
  {
    id: 5,
    title: "LEARNING WEB DESIGN 5/ED A BEGINNER`S GUIDE TO HTML, CSS, JAVASCRIPT, AND WEB GRAPHICS",
    author: "ROBBINS",
    match: 82,
    category: "Web Development",
  },
  { id: 6, title: "JAVA SCRIPT", author: "GOSELIN, DON", match: 78, category: "Programming" },
]

const trendingBooks = [
  { id: 1, title: "PROGRAMMING IN ANSI C", author: "BALAGURUSAMY E", checkouts: 5, category: "Programming" },
  { id: 2, title: "HIGHER ENGINEERING MATHEMATICS", author: "GREWAL B S", checkouts: 4, category: "Mathematics" },
  { id: 3, title: "ENGINEERING CHEMISTRY", author: "GADAG, R V", checkouts: 4, category: "Chemistry" },
  { id: 4, title: "DATA COMMUNICATIONS AND NETWORKING", author: "FOROUZAN", checkouts: 3, category: "Networking" },
  { id: 5, title: "KANNADA KALI", author: "HALEMANE LINGADVARU", checkouts: 3, category: "Language" },
  { id: 6, title: "CONSTITUTION OF INDIA", author: "PHANEESH", checkouts: 2, category: "Law" },
]

const similarToHistory = [
  {
    id: 1,
    title: "FORMAL LANGUAGES AND AUTOMATA THEORY",
    author: "ANURADHA K",
    similarity: 90,
    category: "Computer Science",
  },
  {
    id: 2,
    title: "COMPUTER AIDED ENGINEERING DRAWING",
    author: "ANNAIAH M H",
    similarity: 87,
    category: "Engineering",
  },
  {
    id: 3,
    title: "FUNDAMENTALS OF DATABASE SYSTEMS",
    author: "ELMASRI AND NAVATHE",
    similarity: 85,
    category: "Databases",
  },
  {
    id: 4,
    title: "DESIGN OF MACHINE ELEMENTS-I (MECHANICAL ENGINEERING DESIGN-I)",
    author: "ANNAIAH M H",
    similarity: 82,
    category: "Mechanical",
  },
  { id: 5, title: "DYNAMICS OF MACHINERY", author: "DAS J B K", similarity: 78, category: "Mechanical" },
  { id: 6, title: "AIR POLLUTION", author: "RAO M N", similarity: 75, category: "Environmental" },
]

export default function RecommendationsPage() {
  const [activeTab, setActiveTab] = useState("personal")

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Book Recommendations</h1>
          <p className="text-muted-foreground">
            Personalized book suggestions based on your reading history and preferences
          </p>
        </div>
      </div>

      <Tabs defaultValue="personal" className="mt-8" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
          <TabsTrigger value="personal" className="flex items-center gap-1">
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">Personal</span>
          </TabsTrigger>
          <TabsTrigger value="trending" className="flex items-center gap-1">
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">Trending</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-1">
            <History className="h-4 w-4" />
            <span className="hidden sm:inline">Based on History</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {personalRecommendations.map((book) => (
              <Card key={book.id} className="overflow-hidden flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{book.title}</CardTitle>
                    <Badge>{book.category}</Badge>
                  </div>
                  <CardDescription>{book.author}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2 flex-1">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Match Score</span>
                      <span className="text-sm font-medium">{book.match}%</span>
                    </div>
                    <Progress value={book.match} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-4">
                      This book matches your reading preferences based on your borrowing history and interests.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <div className="flex justify-between w-full">
                    <Button variant="outline" size="sm" className="gap-1">
                      <BookOpen className="h-4 w-4" />
                      Details
                    </Button>
                    <Button size="sm" className="gap-1">
                      <BookMarked className="h-4 w-4" />
                      Reserve
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trendingBooks.map((book) => (
              <Card key={book.id} className="overflow-hidden flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{book.title}</CardTitle>
                    <Badge>{book.category}</Badge>
                  </div>
                  <CardDescription>{book.author}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2 flex-1">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Popularity</span>
                      <span className="text-sm font-medium">{book.checkouts} checkouts</span>
                    </div>
                    <Progress value={book.checkouts / 0.5} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-4">
                      This book is trending in the library with high checkout rates this month.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <div className="flex justify-between w-full">
                    <Button variant="outline" size="sm" className="gap-1">
                      <BookOpen className="h-4 w-4" />
                      Details
                    </Button>
                    <Button size="sm" className="gap-1">
                      <BookMarked className="h-4 w-4" />
                      Reserve
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {similarToHistory.map((book) => (
              <Card key={book.id} className="overflow-hidden flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{book.title}</CardTitle>
                    <Badge>{book.category}</Badge>
                  </div>
                  <CardDescription>{book.author}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2 flex-1">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Similarity</span>
                      <span className="text-sm font-medium">{book.similarity}%</span>
                    </div>
                    <Progress value={book.similarity} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-4">
                      This book is similar to titles you've previously borrowed or shown interest in.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <div className="flex justify-between w-full">
                    <Button variant="outline" size="sm" className="gap-1">
                      <BookOpen className="h-4 w-4" />
                      Details
                    </Button>
                    <Button size="sm" className="gap-1">
                      <BookMarked className="h-4 w-4" />
                      Reserve
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            How Recommendations Work
          </CardTitle>
          <CardDescription>
            Our AI-powered recommendation system analyzes various data points to suggest books
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <h3 className="font-medium">Personal Recommendations</h3>
              <p className="text-sm text-muted-foreground">
                Based on your borrowing history, reading preferences, and academic department, our AI predicts books
                you're likely to enjoy.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Trending Books</h3>
              <p className="text-sm text-muted-foreground">
                These recommendations highlight popular books across the library that are currently in high demand among
                your peers.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Based on History</h3>
              <p className="text-sm text-muted-foreground">
                Using content-based filtering, we analyze the books you've previously borrowed to find similar titles
                you might enjoy.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

