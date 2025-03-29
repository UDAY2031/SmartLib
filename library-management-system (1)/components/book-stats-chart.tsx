"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", checkouts: 124, returns: 95 },
  { month: "Feb", checkouts: 145, returns: 132 },
  { month: "Mar", checkouts: 187, returns: 167 },
  { month: "Apr", checkouts: 210, returns: 192 },
  { month: "May", checkouts: 163, returns: 175 },
  { month: "Jun", checkouts: 198, returns: 188 },
]

export default function BookStatsChart() {
  return (
    <ChartContainer
      config={{
        checkouts: {
          label: "Checkouts",
          color: "hsl(var(--chart-1))",
        },
        returns: {
          label: "Returns",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="checkouts" fill="var(--color-checkouts)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="returns" fill="var(--color-returns)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

