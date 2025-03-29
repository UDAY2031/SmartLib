import Link from "next/link"
import { BookOpen, BarChart2, Map, Users, Search, BookMarked, Brain } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import BookStatsChart from "@/components/book-stats-chart"
import CirculationChart from "@/components/circulation-chart"
import PopularBooksChart from "@/components/popular-books-chart"
import DepartmentDistribution from "@/components/department-distribution"
import RecentActivity from "@/components/recent-activity"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl font-bold">SmartLib</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Dashboard
            </Link>
            <Link
              href="/books"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Books
            </Link>
            <Link
              href="/visualizations"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Visualizations
            </Link>
            <Link
              href="/map"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Location Map
            </Link>
            <Link
              href="/recommendations"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Recommendations
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <form className="hidden md:flex">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search books..." className="w-64 pl-8 bg-background" />
              </div>
            </form>
            <Button variant="default">Sign In</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-6 md:py-12 bg-gradient-to-b from-primary/10 to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Welcome to SmartLib Management System
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Explore our comprehensive collection of books, track circulation, and discover personalized
                    recommendations.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/books/search">
                    <Button size="lg" className="gap-1">
                      <Search className="h-4 w-4" />
                      Search Books
                    </Button>
                  </Link>
                  <Link href="/books/catalog">
                    <Button size="lg" variant="outline" className="gap-1">
                      <BookMarked className="h-4 w-4" />
                      Browse Catalog
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Library Statistics</CardTitle>
                    <CardDescription>Current status of library resources</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col items-center justify-center rounded-lg border p-4 text-center">
                        <div className="text-2xl font-bold">12,458</div>
                        <div className="text-xs text-muted-foreground">Total Books</div>
                      </div>
                      <div className="flex flex-col items-center justify-center rounded-lg border p-4 text-center">
                        <div className="text-2xl font-bold">1,245</div>
                        <div className="text-xs text-muted-foreground">Active Users</div>
                      </div>
                      <div className="flex flex-col items-center justify-center rounded-lg border p-4 text-center">
                        <div className="text-2xl font-bold">342</div>
                        <div className="text-xs text-muted-foreground">Books Checked Out</div>
                      </div>
                      <div className="flex flex-col items-center justify-center rounded-lg border p-4 text-center">
                        <div className="text-2xl font-bold">87</div>
                        <div className="text-xs text-muted-foreground">New Arrivals</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="container px-4 py-8 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Circulation Trends</CardTitle>
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <CirculationChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Popular Books</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <PopularBooksChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Department Distribution</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <DepartmentDistribution />
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container px-4 py-8 md:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Book Statistics</CardTitle>
                <CardDescription>Monthly check-outs and returns</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <BookStatsChart />
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest transactions in the library</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivity />
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container px-4 py-8 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Featured Services</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/visualizations">
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-center gap-2">
                  <BarChart2 className="h-5 w-5" />
                  <CardTitle className="text-lg">Data Visualizations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Explore interactive 2D and 3D visualizations of library data.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/map">
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-center gap-2">
                  <Map className="h-5 w-5" />
                  <CardTitle className="text-lg">Geographic Heatmap</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Locate books within the library using our interactive map.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/recommendations">
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-center gap-2">
                  <Brain className="h-5 w-5" />
                  <CardTitle className="text-lg">AI Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get personalized book recommendations based on your reading history.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/books/search">
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-center gap-2">
                  <Search className="h-5 w-5" />
                  <CardTitle className="text-lg">Advanced Search</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Find books by title, author, department, or category.</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted/40">
        <div className="container flex flex-col gap-2 py-4 md:h-16 md:flex-row md:items-center md:py-0">
          <p className="text-xs text-muted-foreground md:text-sm">
            &copy; {new Date().getFullYear()} SmartLib Management System. All rights reserved.
          </p>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="#" className="text-xs text-muted-foreground underline-offset-4 hover:underline md:text-sm">
              Terms
            </Link>
            <Link href="#" className="text-xs text-muted-foreground underline-offset-4 hover:underline md:text-sm">
              Privacy
            </Link>
            <Link href="#" className="text-xs text-muted-foreground underline-offset-4 hover:underline md:text-sm">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

