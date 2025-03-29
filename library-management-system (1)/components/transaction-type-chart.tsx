"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// Data based on the dataset transaction types
const data = [
  { name: "Check in", value: 68 },
  { name: "Check out", value: 4 },
  { name: "Renew", value: 28 },
]

const COLORS = ["var(--color-pie-1)", "var(--color-pie-2)", "var(--color-pie-3)"]

export default function TransactionTypeChart() {
  return (
    <ChartContainer
      config={{
        "pie-1": {
          label: "Check in",
          color: "hsl(var(--chart-1))",
        },
        "pie-2": {
          label: "Check out",
          color: "hsl(var(--chart-2))",
        },
        "pie-3": {
          label: "Renew",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

