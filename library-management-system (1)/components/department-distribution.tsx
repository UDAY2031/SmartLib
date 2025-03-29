"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// Data based on the dataset departments
const data = [
  { name: "CSE", value: 35 },
  { name: "ECE", value: 15 },
  { name: "ME", value: 20 },
  { name: "CV", value: 10 },
  { name: "BT", value: 8 },
  { name: "CHEM", value: 5 },
  { name: "MATH", value: 7 },
]

const COLORS = [
  "var(--color-pie-1)",
  "var(--color-pie-2)",
  "var(--color-pie-3)",
  "var(--color-pie-4)",
  "var(--color-pie-5)",
  "var(--color-pie-6)",
  "var(--color-pie-7)",
]

export default function DepartmentDistribution() {
  return (
    <ChartContainer
      config={{
        "pie-1": {
          label: "CSE",
          color: "hsl(var(--chart-1))",
        },
        "pie-2": {
          label: "ECE",
          color: "hsl(var(--chart-2))",
        },
        "pie-3": {
          label: "ME",
          color: "hsl(var(--chart-3))",
        },
        "pie-4": {
          label: "CV",
          color: "hsl(var(--chart-4))",
        },
        "pie-5": {
          label: "BT",
          color: "hsl(var(--chart-5))",
        },
        "pie-6": {
          label: "CHEM",
          color: "hsl(var(--chart-6))",
        },
        "pie-7": {
          label: "MATH",
          color: "hsl(var(--chart-7))",
        },
      }}
      className="h-[200px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={30} outerRadius={60} paddingAngle={5} dataKey="value">
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

