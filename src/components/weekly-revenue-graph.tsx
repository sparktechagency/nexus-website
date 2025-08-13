"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart, TooltipProps } from "recharts"

const data = [
  { name: "Sat\n19 Oct", revenue: 30000 },
  { name: "Sun\n20 Oct", revenue: 42000 },
  { name: "Mon\n21 Oct", revenue: 35000 },
  { name: "Tue\n22 Oct", revenue: 28000 },
  { name: "Wed\n23 Oct", revenue: 32000 },
  { name: "Thu\n24 Oct", revenue: 45000 },
  { name: "Fri\n25 Oct", revenue: 20000 },
]


type CustomTooltipProps = TooltipProps<number, string> & {
  active?: boolean
  payload?: {
    value: number
    payload: string // You might want to further specify this if needed
  }[]
  label?: string
}


const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const date = label.split("\n")[1] || label // Extract date from label
    return (
      <div className="bg-[#1e1829]p-3 rounded-lg shadow-md text-white text-sm border border-gray-700">
        <p className="font-bold">${payload[0].value / 1000}k</p>
        <p className="text-gray-400">{date}, 2025</p>
      </div>
    )
  }
  return null
}



export default function WeeklyRevenueGraph() {
  return (
    <Card className="bg-[#1e1829] text-white border-none rounded-xl shadow-lg h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Weekly Revenue Summary Graph</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] md:h-[350px] lg:h-[400px] xl:h-[350px] pb-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8A2BE2" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FF1493" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="lineRevenue" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8A2BE2" />
                <stop offset="100%" stopColor="#FF1493" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#4A4A6A" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#A0A0B0", fontSize: 12 }}
              interval={0}
              angle={0}
              textAnchor="middle"
              height={60} // Adjust height to accommodate multi-line labels
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value / 1000}k`}
              tick={{ fill: "#A0A0B0", fontSize: 12 }}
              domain={[0, 60000]}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#A0A0B0", strokeDasharray: "3 3" }} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="url(#lineRevenue)"
              fillOpacity={1}
              fill="url(#colorRevenue)"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="url(#lineRevenue)"
              strokeWidth={2}
              dot={{ r: 4, fill: "#FF1493", stroke: "#FF1493", strokeWidth: 2 }}
              activeDot={{ r: 6, fill: "#FF1493", stroke: "#FF1493", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
