
"use client"

import { useEffect, useState } from "react"
import { Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useGetUserListApiQuery } from "@/redux/website/userList/userListApi"
import WebEmptyData from "@/components/WebEmptyData"
import DashboardLoader from "@/components/DashboardLoader"
import CustomPagination from "@/components/customPagination/CustomPagination"

interface UserListProps {
    id: string
    name: string
    email: string
    avatar: string
    room: string
    days_of_playing: number
    duration: string
    payment: string
    added_by: string
}



const UserList = () => {
    const router = useRouter()
    const [searchText, setSearchText] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(8)


    const { data: getUserList, isLoading, refetch } = useGetUserListApiQuery({ per_page: perPage, search: searchText, page: currentPage })
    const userListData: UserListProps[] = getUserList?.data?.data
    const totalItems = getUserList?.data?.total
    const totalPages = Math.ceil(totalItems / perPage)


    const getStatusColor = (status: string) => {
        return status === "Yourself" ? "bg-green-600 text-white" : "bg-purple-600 text-white"
    }

    const handleBackClick = () => {
        router.push("/home")
    }

    useEffect(() => {
        refetch();
    }, [currentPage, perPage, refetch]);

    if (isLoading) {
        return <DashboardLoader />
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



                {
                    (userListData?.length > 0 || searchText.trim() !== "") && <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4  bg-transparent" />
                        <Input
                            placeholder="Search by name or email"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="pl-10 bg-[#28242f]  py-6 rounded-full  border-none focus:border-none focus:outline-none focus:ring-0 focus:ring-offset-0"
                        />
                    </div>
                }



                {
                    userListData?.length > 0 ? <div className="px-4 border rounded-2xl border-gray-800">
                        <Table>
                            <TableHeader className="border-none">
                                <TableRow className="border-none hover:bg-transparent cursor-pointer">
                                    <TableHead className="text-[#ffff] font-bold text-lg">User</TableHead>
                                    <TableHead className="text-[#ffff] font-bold text-lg">Contact</TableHead>
                                    <TableHead className="text-[#ffff] font-bold text-lg">Number of Days</TableHead>
                                    <TableHead className="text-[#ffff] font-bold text-lg">Duration</TableHead>
                                    <TableHead className="text-[#ffff] font-bold text-lg">Payment</TableHead>
                                    <TableHead className="text-[#ffff] font-bold text-lg">Added By</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody className="">
                                {userListData?.map((item) => (
                                    <TableRow key={item.id} className="text-[#ffff] border-none hover:bg-transparent cursor-pointer">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Image src={item.avatar} alt="item photo" width={50} height={50} className="object-cover rounded-full" />
                                                <span className=" font-medium">{item.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="">{item.email}</TableCell>
                                        <TableCell className="">{item.days_of_playing}</TableCell>
                                        <TableCell className="">{item.duration}</TableCell>
                                        <TableCell className=" font-medium">{item.payment}</TableCell>
                                        <TableCell>
                                            <Badge className={`${getStatusColor(item.added_by)} rounded-full text-xs px-2 `}>{item.added_by}</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* PAGINATION COMPONENT */}
                        <CustomPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                        : searchText.trim() !== "" ?
                            <div className="text-center py-10 text-white text-lg">
                                Search data not available
                            </div>
                            :
                            < WebEmptyData
                                customStyle={`bg-red-500 text-white `}
                                style={{
                                    background: "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
                                }}
                            />
                }
            </div>
        </div>
    )
}


export default UserList