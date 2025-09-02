



"use client"

import type React from "react"
import { Crown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface NotificationItem {
    id: string
    type: "booking" | "premium" | "cancellation" | "reschedule"
    user?: {
        name: string
        avatar: string
    }
    message: string
    time: string
    icon?: React.ReactNode
    read_at: string | null
}

const notifications: NotificationItem[] = [
    {
        id: "1",
        type: "booking",
        user: {
            name: "Sourav",
            avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        message: "Sourav booked a seat in your gaming zone.",
        time: "09:00 AM",
        read_at: null
    },
    {
        id: "2",
        type: "reschedule",
        user: {
            name: "Sazzat Hossain",
            avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        message: "Sazzat Hossain has rescheduled the seat booking at your Arena.",
        time: "09:00 AM",
        read_at: "2025-08-11T10:00:00Z"
    },
    {
        id: "3",
        type: "premium",
        message: "Successfully activate the premium subscription plan.",
        time: "09:00 AM",
        icon: <Crown className="w-8 h-8 text-yellow-400" />,
        read_at: null
    },
    {
        id: "4",
        type: "cancellation",
        user: {
            name: "Sazzat Hossain",
            avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        message: "Sazzat Hossain has cancelled the seat booking at your Arena.",
        time: "08:00 AM",
        read_at: "2025-08-11T09:30:00Z"
    },
]


const NotificationPage = () => {


    return (
        <div className=" mb-6  text-white">
            

            {/* Notifications List */}
            <div className=" pt-4 space-y-4 ">
                {notifications.map((notification) => (
                    <div key={notification.id} className={`flex items-center gap-3 py-3  rounded-2xl px-4 ${notification?.read_at === null ? '' : 'bg-[#1e182d]'}`}>
                        {/* Avatar or Icon */}
                        <div className="flex-shrink-0">
                            {notification.user ? (
                                <Avatar className="w-10 h-10">
                                    <AvatarImage src={notification.user.avatar || "/placeholder.svg"} alt={notification.user.name} />
                                    <AvatarFallback className="bg-slate-700 text-white">
                                        {notification.user.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                                    {notification.icon}
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <p className="text-slate-200 text-sm leading-relaxed">{notification.message}</p>
                        </div>

                        {/* Time */}
                        <div className="flex-shrink-0">
                            <span className="text-slate-400 text-xs">{notification.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default NotificationPage;