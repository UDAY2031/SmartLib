"use client"

import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// Data based on the dataset transaction types by day
const data = [
  { date: "01-01-2023", checkin: 0, checkout: 0, renew: 3 },
  { date: "02-01-2023", checkin: 5, checkout: 1, renew: 1 },
  { date: "17-06-2023", checkin: 3, checkout: 0, renew: 1 },
  { date: "18-06-2023", checkin: 0, checkout: 0, renew: 1 },
  { date: "19-06-2023", checkin: 42, checkout: 1, renew: 15 },
  { date: "20-06-2023", checkin: 18, checkout: 2, renew: 8 },
]

export default function DailyTransactionsChart() {
  return (
    <ChartContainer
      config={{
        checkin: {
          label: "Check-ins",
          color: "hsl(var(--chart-1))",
        },
        checkout: {
          label: "Check-outs",
          color: "hsl(var(--chart-2))",
        },
        renew: {
          label: "Renewals",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="checkin"
            stackId="1"
            stroke="var(--color-checkin)"
            fill="var(--color-checkin)"
          />
          <Area
            type="monotone"
            dataKey="checkout"
            stackId="1"
            stroke="var(--color-checkout)"
            fill="var(--color-checkout)"
          />
          <Area type="monotone" dataKey="renew" stackId="1" stroke="var(--color-renew)" fill="var(--color-renew)" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

