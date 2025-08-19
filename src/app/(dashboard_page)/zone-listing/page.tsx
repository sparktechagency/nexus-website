
"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"
import CustomModal from "@/components/modal/customModal"
import ZoneListDetails from "@/components/modal/zone-list-details"

interface Provider {
  id: string
  name: string
  zoneName: string
  contact: string
  opening: string
  closing: string
  avatar: string
}

const providers: Provider[] = [
  {
    id: "1",
    name: "Abir",
    zoneName: "Dragon's Lair",
    contact: "abid32@gmail.com",
    opening: "09:00 AM",
    closing: "10:00 PM",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "2",
    name: "Maksud",
    zoneName: "Mystic Forest",
    contact: "user123@example.com",
    opening: "10:15 AM",
    closing: "10:15 PM",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "3",
    name: "Arjun",
    zoneName: "Shadow Realm",
    contact: "hello@creativeoutlook.com",
    opening: "11:30 AM",
    closing: "10:30 PM",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "4",
    name: "Sita",
    zoneName: "Galactic Arena",
    contact: "info@innovativeideas.com",
    opening: "12:45 PM",
    closing: "10:45 PM",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "5",
    name: "Kiran",
    zoneName: "Warrior's Haven",
    contact: "support@techsolutions.com",
    opening: "01:00 PM",
    closing: "11:00 PM",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "6",
    name: "Ravi",
    zoneName: "Enchanted Valley",
    contact: "contact@brightfuture.com",
    opening: "02:15 PM",
    closing: "11:15 PM",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "7",
    name: "Anita",
    zoneName: "Titan's Fortress",
    contact: "admin@yourdomain.com",
    opening: "03:30 PM",
    closing: "11:30 PM",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "8",
    name: "Deepak",
    zoneName: "Cursed Cavern",
    contact: "reachus@smartsolutions.com",
    opening: "05:00 PM",
    closing: "12:00 AM",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "9",
    name: "Deepak",
    zoneName: "Cursed Cavern",
    contact: "reachus@smartsolutions.com",
    opening: "06:15 PM",
    closing: "12:15 AM",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
]

const ZoneListingPage = () => {
  const [searchText, setSearchText] = useState("")
  const [isOpen, setIsOpen] = useState(false)


  return (
    <div className="text-[#fff] mb-6 pt-4">

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


        {/* Table */}

        <div className="px-4  rounded-2xl border-gray-800">
          <Table>
            <TableHeader>
              <TableRow className="border-none hover:bg-transparent cursor-pointer">
                <TableHead className="text-[#ffff] font-bold text-lg">Provider</TableHead>
                <TableHead className="text-[#ffff] font-bold text-lg">Zone name</TableHead>
                <TableHead className="text-[#ffff] font-bold text-lg">Contact</TableHead>
                <TableHead className="text-[#ffff] font-bold text-lg">Opening</TableHead>
                <TableHead className="text-[#ffff] font-bold text-lg">Closing</TableHead>
                <TableHead className="text-[#ffff] font-bold text-lg">Action</TableHead>
              </TableRow>
            </TableHeader>


            <TableBody>
              {providers.map((provider, index) => (
                <TableRow
                  key={`${provider.id}-${index}`}
                  className="text-[#ffff] border-none hover:bg-transparent cursor-pointer"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image src={provider.avatar} alt="user photo" width={50} height={50} className="object-cover rounded-full" />
                      <span className=" font-medium">{provider.name}</span>
                    </div>
                  </TableCell>

                  <TableCell className="text-foreground">{provider.zoneName}</TableCell>
                  <TableCell className="text-foreground">{provider.contact}</TableCell>
                  <TableCell className="text-foreground">{provider.opening}</TableCell>
                  <TableCell className="text-foreground">{provider.closing}</TableCell>
                  <TableCell>
                    <svg
                      onClick={() => setIsOpen(!isOpen)}
                      width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.544 11.045C21.848 11.471 22 11.685 22 12C22 12.316 21.848 12.529 21.544 12.955C20.178 14.871 16.689 19 12 19C7.31 19 3.822 14.87 2.456 12.955C2.152 12.529 2 12.315 2 12C2 11.684 2.152 11.471 2.456 11.045C3.822 9.129 7.311 5 12 5C16.69 5 20.178 9.13 21.544 11.045Z" stroke="#49ADF4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12Z" stroke="#49ADF4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>


      {/* modal component(VIEW_DETAILS) */}
      <CustomModal
        open={isOpen}
        setIsOpen={setIsOpen}
        className={"p-4 max-h-[0vh]"}
        maxWidth={"md:!max-w-[40vw]"}
      >
        <ZoneListDetails
          open={isOpen}
          setIsOpen={setIsOpen}
        />
      </CustomModal>
    </div>
  )
}

export default ZoneListingPage