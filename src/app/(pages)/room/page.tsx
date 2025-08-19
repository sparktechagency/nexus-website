
"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CardHeader } from "@/components/ui/card"
import CustomModal from "@/components/modal/customModal"
import DeleteRoom from "@/components/modal/delete-room"
import AddNewRoom from "@/components/modal/add-new-room"
import EditRoom from "@/components/modal/edit-room"

interface GamingRoom {
  id: number
  avatar: string
  name: string
  pcCount: number
  pricePerHour: number
}

const mockRooms: GamingRoom[] = [
  {
    id: 1,
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "VIP",
    pcCount: 12,
    pricePerHour: 564,
  },
  {
    id: 2,
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "Bootcamp",
    pcCount: 30,
    pricePerHour: 564,
  },
  {
    id: 3,
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "PS5",
    pcCount: 24,
    pricePerHour: 564,
  },
  {
    id: 4,
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "VIP",
    pcCount: 5,
    pricePerHour: 564,
  },
  {
    id: 5,
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "VIP",
    pcCount: 5,
    pricePerHour: 564,
  },
  {
    id: 6,
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "VIP",
    pcCount: 5,
    pricePerHour: 564,
  },
]

const RoomPage = () => {
  const [isAddRoom, setIsAddRoom] = useState(false)
  const [isEditRoom, setIsEditRoom] = useState(false)
  const [isDeleteRoom, setIsDeleteRoom] = useState(false)




  return (
    <div className="px-4 md:px-6 lg:px-8 mb-6 ">
      <div className=" rounded-2xl">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="md:text-2xl font-bold text-white mb-2">Rooms of Your Gaming Zone</h1>
              <p className="text-slate-400 text-sm">
                You can update your room information from here & also can add a new room.
              </p>
            </div>
            <Button
              onClick={() => setIsAddRoom(!isAddRoom)}
              className="w-[170px] md:w-[200px] mt-4 md:mt-0 md:py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
              style={{
                background:
                  "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
              }}>

              Add Room
            </Button>
          </div>
        </CardHeader>





        <div className="px-4 border rounded-2xl border-gray-800">
          <Table>
            <TableHeader className="border-none ">
              <TableRow className="border-none hover:bg-transparent cursor-pointer">
                <TableHead className="text-lg font-semibold text-[#fff]">Room Image</TableHead>
                <TableHead className="text-lg font-semibold text-[#fff]">Room Name</TableHead>
                <TableHead className="text-lg font-semibold text-[#fff]">Number of PC</TableHead>
                <TableHead className="text-lg font-semibold text-[#fff]">Pricing per Hour</TableHead>
                <TableHead className="text-lg font-semibold text-[#fff] text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="">
              {mockRooms.map((item) => (
                <TableRow key={item.id} className="text-[#ffff] border-none hover:bg-transparent cursor-pointer">
                  <TableCell>
                    <Image src={item.avatar} alt="photo" width={60} height={60} className="object-cover rounded-lg" />
                  </TableCell>

                  <TableCell>
                    {item.name}
                  </TableCell>

                  <TableCell>
                    {item.pcCount}
                  </TableCell>

                  <TableCell>
                    {item.pricePerHour}
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => setIsDeleteRoom(!isDeleteRoom)}
                        className="cursor-pointer">
                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 18C2.45 18 1.97933 17.8043 1.588 17.413C1.19667 17.0217 1.00067 16.5507 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8043 17.021 14.413 17.413C14.0217 17.805 13.5507 18.0007 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z" fill="#EB4335" />
                        </svg>

                      </button>

                      <button
                        onClick={() => setIsEditRoom(!isEditRoom)}
                        className="cursor-pointer">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.414 15.8902L16.556 5.74822L15.142 4.33422L5 14.4762V15.8902H6.414ZM7.243 17.8902H3V13.6472L14.435 2.21222C14.6225 2.02475 14.8768 1.91943 15.142 1.91943C15.4072 1.91943 15.6615 2.02475 15.849 2.21222L18.678 5.04122C18.8655 5.22875 18.9708 5.48306 18.9708 5.74822C18.9708 6.01338 18.8655 6.26769 18.678 6.45522L7.243 17.8902ZM3 19.8902H21V21.8902H3V19.8902Z" fill="#20BF55" />
                        </svg>

                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>


      {/* modal component(Add_ROOM) */}
      <CustomModal
        open={isAddRoom}
        setIsOpen={setIsAddRoom}
        className={"p-4 max-h-[0vh]"}
        maxWidth={" md:!max-w-[60vw] xl:!max-w-[40vw]"}
      >
        <AddNewRoom />
      </CustomModal>


      {/* modal component(EDIT_ROOM) */}
      <CustomModal
        open={isEditRoom}
        setIsOpen={setIsEditRoom}
        className={"p-4 max-h-[0vh]"}
        maxWidth={"md:!max-w-[60vw] xl:!max-w-[40vw]"}
      >
        <EditRoom />
      </CustomModal>




      {/* modal component(DELETE_ROOM) */}
      <CustomModal
        open={isDeleteRoom}
        setIsOpen={setIsDeleteRoom}
        className={"p-4 max-h-[0vh]"}
        maxWidth={"md:!max-w-[60vw] xl:!max-w-[30vw]"}
      >
        <DeleteRoom
          open={isDeleteRoom}
          setIsOpen={setIsDeleteRoom}
        />
      </CustomModal>
    </div>
  )
}


export default RoomPage
