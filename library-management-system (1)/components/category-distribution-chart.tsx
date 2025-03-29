"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// Data based on the dataset categories
const data = [
  { category: "UG", count: 65, color: "hsl(var(--chart-1))" },
  { category: "ST", count: 25, color: "hsl(var(--chart-2))" },
  { category: "PG", count: 8, color: "hsl(var(--chart-3))" },
  { category: "TS", count: 5, color: "hsl(var(--chart-4))" },
  { category: "NT", count: 2, color: "hsl(var(--chart-5))" },
]

export default function CategoryDistributionChart() {
  return (
    <ChartContainer
      config={{
        count: {
          label: "Books",
          color: "hsl(var(--primary))",
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="count" name="Number of Books" radius={[4, 4, 0, 0]} fill="var(--color-count)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

