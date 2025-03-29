"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", checkouts: 124, returns: 95, renewals: 45 },
  { month: "Feb", checkouts: 145, returns: 132, renewals: 52 },
  { month: "Mar", checkouts: 187, returns: 167, renewals: 68 },
  { month: "Apr", checkouts: 210, returns: 192, renewals: 75 },
  { month: "May", checkouts: 163, returns: 175, renewals: 62 },
  { month: "Jun", checkouts: 198, returns: 188, renewals: 78 },
]

export default function MonthlyTrendsChart() {
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
        renewals: {
          label: "Renewals",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
          <Line type="monotone" dataKey="checkouts" stroke="var(--color-checkouts)" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="returns" stroke="var(--color-returns)" />
          <Line type="monotone" dataKey="renewals" stroke="var(--color-renewals)" />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

