import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type LucideIcon } from "lucide-react"
import { AverageRatingIcon, BookingIcon, ReferralIcon, RoomIcon } from "./custom-icons"



interface SummaryCardProps {
  title: string
  value: string
  icon: "Room" | "Booking" | "Revenue" | "AverageRating"
  iconBgColor: string
}

const IconMap: { [key: string]: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>} = {

  Room:RoomIcon,
  Booking:BookingIcon,
  Revenue:ReferralIcon,
  AverageRating:AverageRatingIcon,
}

export default function SummaryCard({ title, value, icon, iconBgColor }: SummaryCardProps) {
  const IconComponent = IconMap[icon]

  return (
    <Card className="bg-[#1e1829] text-white border-none rounded-xl shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-300">{title}</CardTitle>
        <div className={`p-2 rounded-full ${iconBgColor}`}>
          {IconComponent && <IconComponent className="h-5 w-5 text-white" />}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}
