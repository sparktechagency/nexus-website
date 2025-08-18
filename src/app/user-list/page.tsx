
"use client"

import { useState } from "react"
import { Search} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface User {
    id: string
    name: string
    email: string
    avatar: string
    room: string
    days: number
    duration: string
    payment: string
    status: "User" | "Yourself"
}

const mockUsers: User[] = [
    {
        id: "1",
        name: "Abir",
        email: "abir39@gmail.com",
        room: "VIP",
        days: 2,
        duration: "5 Hours",
        payment: "$5642",
        status: "User",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
        id: "2",
        name: "Moksudul",
        email: "user123@example.com",
        room: "Console",
        days: 1,
        duration: "1 Hour",
        payment: "$1000",
        status: "User",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
        id: "3",
        name: "Moksudul",
        email: "user123@example.com",
        room: "Console",
        days: 1,
        duration: "1 Hour",
        payment: "$2000",
        status: "User",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
        id: "4",
        name: "Moksudul",
        email: "user123@example.com",
        room: "Console",
        days: 1,
        duration: "1 Hour",
        payment: "$3000",
        status: "Yourself",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
        id: "5",
        name: "Arjun",
        email: "hello@creativeoutlook.com",
        room: "Bootcamp",
        days: 3,
        duration: "10 Hours",
        payment: "$4000",
        status: "User",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
        id: "6",
        name: "Sito",
        email: "info@innovativevideos.com",
        room: "P95",
        days: 10,
        duration: "25 Hours",
        payment: "$5000",
        status: "User",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
        id: "7",
        name: "Sito",
        email: "info@innovativevideos.com",
        room: "P95",
        days: 10,
        duration: "26 Hours",
        payment: "$5000",
        status: "Yourself",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
        id: "8",
        name: "Kiran",
        email: "support@techsolutions.com",
        room: "Console",
        days: 8,
        duration: "18 Hours",
        payment: "$7000",
        status: "Yourself",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
        id: "9",
        name: "Kiran",
        email: "support@techsolutions.com",
        room: "P95",
        days: 6,
        duration: "12 Hours",
        payment: "$8000",
        status: "User",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },

]

const UserList = () => {
    const router = useRouter()
    const [searchText, setSearchText] = useState("")





    const getStatusColor = (status: string) => {
        return status === "Yourself" ? "bg-green-600 text-white" : "bg-purple-600 text-white"
    }

    const handleBackClick = () => {
        router.push("/home")
    }


    return (
        <div className="text-[#fff]  px-4 md:px-6 lg:px-8 mb-6 pt-4">
            <div className="flex items-center gap-3 mb-4">
                <svg
                    onClick={handleBackClick}
                    className="cursor-pointer"
                    width="18" height="30" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 30L0 15L15 0L17.6625 2.6625L5.325 15L17.6625 27.3375L15 30Z" fill="white" />
                </svg>
                <h1 className="text-xl font-medium">User List</h1>
            </div>

            <p className="text-sm pl-8 mb-6">
                You can update your room information from here & also can add a new room.
            </p>

            {/* Header */}
            <div className="h-full bg-gradient-to-r from-[#0f0829] via-black to-[#0f0829] rounded-lg p-6 ">




                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4  bg-transparent" />
                    <Input
                        placeholder="Search by name or email"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="pl-10 bg-[#28242f]  py-6 rounded-full  border-none focus:border-none focus:outline-none focus:ring-0 focus:ring-offset-0"
                    />
                </div>


                <div className="px-4 border rounded-2xl border-gray-800">
                    <Table>
                        <TableHeader className="border-none">
                            <TableRow className="border-none hover:bg-transparent cursor-pointer">
                                <TableHead className="text-[#ffff] font-bold text-lg">User</TableHead>
                                <TableHead className="text-[#ffff] font-bold text-lg">Contact</TableHead>
                                <TableHead className="text-[#ffff] font-bold text-lg">Room</TableHead>
                                <TableHead className="text-[#ffff] font-bold text-lg">Number of Days</TableHead>
                                <TableHead className="text-[#ffff] font-bold text-lg">Duration</TableHead>
                                <TableHead className="text-[#ffff] font-bold text-lg">Payment</TableHead>
                                <TableHead className="text-[#ffff] font-bold text-lg">Added By</TableHead>
                            </TableRow>
                        </TableHeader>
                        
                        <TableBody className="">
                            {mockUsers.map((user) => (
                                <TableRow key={user.id} className="text-[#ffff] border-none hover:bg-transparent cursor-pointer">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Image src={user.avatar} alt="user photo" width={50} height={50} className="object-cover rounded-full" />
                                            <span className=" font-medium">{user.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="">{user.email}</TableCell>
                                    <TableCell>
                                        {user.room}
                                    </TableCell>
                                    <TableCell className="">{user.days}</TableCell>
                                    <TableCell className="">{user.duration}</TableCell>
                                    <TableCell className=" font-medium">{user.payment}</TableCell>
                                    <TableCell>
                                        <Badge className={`${getStatusColor(user.status)} rounded-full text-xs px-2 `}>{user.status}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}


export default UserList