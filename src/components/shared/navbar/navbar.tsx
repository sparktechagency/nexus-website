
import { Bell, ChevronDown } from "lucide-react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import DashboardSummaryCard from "@/components/summary-card"
import WeeklyBookingGraph from "@/components/weekly-booking-graph"
import WeeklyRevenueGraph from "@/components/weekly-revenue-graph"


export default function Navbar() {
    return (
        <div className="  text-white px-4 md:px-6 lg:px-8 mb-6 pt-6 ">
            {/* Navbar */}
            <nav className="bg-[#1e1829] flex items-center justify-between bg-card-bg rounded-full p-4 mb-6 shadow-lg">
                <div className="flex items-center space-x-4">
                    <Image
                        src="/web_pic/logo.png"
                        alt="Nexus Logo"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <span className="text-2xl font-bold tracking-wider">NEXUS</span>
                </div>
                <div className="hidden md:flex items-center space-x-6">
                    <a href="#" className="px-4 py-2 rounded-lg bg-purple-gradient-start text-white font-medium">
                        Home
                    </a>
                    <a href="#" className="px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors">
                        Rooms
                    </a>
                    <a href="#" className="px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors">
                        Bookings
                    </a>
                    <a href="#" className="px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors">
                        Profile
                    </a>
                </div>
                <div className="flex items-center space-x-4">
                    <Bell className="w-6 h-6 text-gray-300 cursor-pointer hover:text-white transition-colors" />
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center space-x-2 cursor-pointer focus:outline-none">
                            <Avatar>
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Md. Jusef" />
                                <AvatarFallback>MJ</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">Md. Jusef</span>
                            <ChevronDown className="w-4 h-4 text-gray-300" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-card-bg border-none text-white">
                            <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">Profile</DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">Settings</DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>

            {/* Main Content Grid */}
            <main className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 ">
                {/* Summary Cards */}
                <DashboardSummaryCard title="Total Room" value="26" icon="Bed" iconBgColor="bg-icon-blue" />
                <DashboardSummaryCard title="Upcoming Bookings" value="26" icon="Calendar" iconBgColor="bg-icon-orange" />
                <DashboardSummaryCard title="Revenue" value="$5642.00" icon="BarChart" iconBgColor="bg-icon-green" />
                <DashboardSummaryCard title="Average Rating" value="4.5" icon="ThumbsUp" iconBgColor="bg-icon-purple" />

                {/* Graphs */}
                <div className="lg:col-span-2 xl:col-span-2 ">
                    <WeeklyRevenueGraph />
                </div>
                <div className="lg:col-span-2 xl:col-span-2">
                    <WeeklyBookingGraph />
                </div>
            </main>
        </div>
    )
}
