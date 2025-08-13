"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps } from "recharts"

const data = [
  { name: "Sat\n12 Oct", bookings: 170 },
  { name: "Sun\n12 Oct", bookings: 280 },
  { name: "Mon\n12 Oct", bookings: 130 },
  { name: "Tue\n12 Oct", bookings: 240 },
  { name: "Wed\n12 Oct", bookings: 60 },
  { name: "Thu\n12 Oct", bookings: 290 },
  { name: "Fri\n12 Oct", bookings: 150 },
]

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: {
    value: number;
    payload: string;
    dataKey: string;
    name: string;
    color: string;
  }[];
  label?: string;
}


const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1e1829] p-3 rounded-lg shadow-md text-white text-sm border border-gray-700">
        <p className="font-bold">{`${payload[0].value} Bookings`}</p>
        <p className="text-gray-400">{label?.replace("\n", " ")}</p>
      </div>
    )
  }
  return null
}

export default function WeeklyBookingGraph() {
  return (
    <Card className="bg-[#1e1829] text-white border-none rounded-xl shadow-lg h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Weekly Booking Summary Graph</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] md:h-[350px] lg:h-[400px] xl:h-[350px] pb-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8A2BE2" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FF1493" stopOpacity={0} />
              </linearGradient>
            </defs>
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
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#A0A0B0", fontSize: 12 }} domain={[0, 300]} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#3A3A5A", opacity: 0.7 }} />
            <Bar dataKey="bookings" fill="url(#colorBookings)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
