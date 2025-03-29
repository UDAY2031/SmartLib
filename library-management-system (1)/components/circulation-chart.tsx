"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { date: "Jan 1", transactions: 12 },
  { date: "Jan 15", transactions: 18 },
  { date: "Feb 1", transactions: 23 },
  { date: "Feb 15", transactions: 25 },
  { date: "Mar 1", transactions: 30 },
  { date: "Mar 15", transactions: 28 },
  { date: "Apr 1", transactions: 32 },
  { date: "Apr 15", transactions: 34 },
  { date: "May 1", transactions: 36 },
  { date: "May 15", transactions: 38 },
  { date: "Jun 1", transactions: 42 },
  { date: "Jun 15", transactions: 45 },
]

export default function CirculationChart() {
  return (
    <ChartContainer
      config={{
        transactions: {
          label: "Transactions",
          color: "hsl(var(--primary))",
        },
      }}
      className="h-[200px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <Tooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="transactions"
            strokeWidth={2}
            activeDot={{
              r: 6,
              style: { fill: "var(--color-transactions)", opacity: 0.8 },
            }}
            style={{
              stroke: "var(--color-transactions)",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

