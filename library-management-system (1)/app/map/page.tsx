"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, BookOpen, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LibraryMap from "@/components/library-map"

export default function MapPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Library Map</h1>
          <p className="text-muted-foreground">Locate books and resources within the library</p>
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
          <Button>Find</Button>
        </div>
      </div>

      <div className="grid gap-6 mt-8 md:grid-cols-[300px_1fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Narrow down your search</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="mb-2 text-sm font-medium">Departments</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                    CSE
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                    ECE
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                    ME
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                    CV
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                    BT
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                    UG
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                    PG
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                    ST
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                    TS
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium">Floor</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                    Ground
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                    First
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                    Second
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recently Viewed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "Programming in ANSI C", location: "Shelf A-12" },
                { title: "Data Structures", location: "Shelf B-05" },
                { title: "Machine Learning", location: "Shelf C-23" },
              ].map((book, index) => (
                <div key={index} className="flex items-start gap-2">
                  <BookOpen className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{book.title}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {book.location}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-0">
            <Tabs defaultValue="map" className="w-full">
              <TabsList className="grid w-[400px] grid-cols-2">
                <TabsTrigger value="map">Map View</TabsTrigger>
                <TabsTrigger value="heatmap">Heat Map</TabsTrigger>
              </TabsList>
              <CardDescription className="mt-2">
                Interactive map of the library showing book locations and popular areas
              </CardDescription>
            </Tabs>
          </CardHeader>
          <CardContent className="p-0 pt-6">
            <TabsContent value="map" className="m-0">
              <div className="h-[600px] w-full">
                <LibraryMap view="standard" />
              </div>
            </TabsContent>
            <TabsContent value="heatmap" className="m-0">
              <div className="h-[600px] w-full">
                <LibraryMap view="heatmap" />
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

