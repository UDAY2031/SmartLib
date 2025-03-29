"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Data based on the most frequently appearing books in the dataset
const data = [
  { title: "Programming in ANSI C", count: 5 },
  { title: "Higher Engineering Mathematics", count: 4 },
  { title: "Engineering Chemistry", count: 4 },
  { title: "Data Communications and Networking", count: 3 },
  { title: "Kannada Kali", count: 3 },
]

export default function PopularBooksChart() {
  return (
    <ChartContainer
      config={{
        count: {
          label: "Checkouts",
          color: "hsl(var(--primary))",
        },
      }}
      className="h-[200px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis type="number" hide />
          <YAxis
            dataKey="title"
            type="category"
            width={100}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => (value.length > 15 ? `${value.substring(0, 15)}...` : value)}
          />
          <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
          <Bar dataKey="count" fill="var(--color-count)" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

