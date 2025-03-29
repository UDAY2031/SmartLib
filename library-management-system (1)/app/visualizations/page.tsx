"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, BarChart2, PieChart, LineChart, Activity, Calendar, BookMarked, Users } from "lucide-react"
import BookStatsChart from "@/components/book-stats-chart"
import CirculationChart from "@/components/circulation-chart"
import PopularBooksChart from "@/components/popular-books-chart"
import DepartmentDistribution from "@/components/department-distribution"
import TransactionTypeChart from "@/components/transaction-type-chart"
import MonthlyTrendsChart from "@/components/monthly-trends-chart"
import AuthorNetworkGalaxy from "@/components/author-network-galaxy"
import CategoryDistributionChart from "@/components/category-distribution-chart"
import DailyTransactionsChart from "@/components/daily-transactions-chart"

export default function VisualizationsPage() {
  const [view, setView] = useState<"2d" | "3d">("2d")

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data Visualizations</h1>
          <p className="text-muted-foreground">Explore library data through interactive visualizations</p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs defaultValue="2d" className="w-[200px]" onValueChange={(value) => setView(value as "2d" | "3d")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="2d">2D Charts</TabsTrigger>
              <TabsTrigger value="3d">3D Visualization</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {view === "2d" ? (
        <>
          <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Book Statistics</CardTitle>
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="h-[300px] pt-6">
                <BookStatsChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Circulation Trends</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="h-[300px] pt-6">
                <CirculationChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Popular Books</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="h-[300px] pt-6">
                <PopularBooksChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Department Distribution</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="h-[300px] pt-6">
                <DepartmentDistribution />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Transaction Types</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="h-[300px] pt-6">
                <TransactionTypeChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Trends</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="h-[300px] pt-6">
                <MonthlyTrendsChart />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 mt-8 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Category Distribution</CardTitle>
                <BookMarked className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="h-[400px] pt-6">
                <CategoryDistributionChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Daily Transactions</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="h-[400px] pt-6">
                <DailyTransactionsChart />
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>3D Author Network Galaxy</CardTitle>
            <CardDescription>
              Visualize connections between authors based on co-authorships, genre similarities, and user preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[600px] p-0">
            <AuthorNetworkGalaxy />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

