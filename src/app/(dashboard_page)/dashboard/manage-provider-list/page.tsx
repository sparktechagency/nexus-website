
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"

const ManageProviderList = () => {

  const allProvider = [
    {
      "name": "Abir",
      "id": "A56854",
      "contact": "abir32@gmail.com",
      "price": "$1928",
      "avatar": "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      "name": "Maksud",
      "id": "385236",
      "contact": "user123@example.com",
      "price": "$2045",
      "avatar": "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      "name": "Arjun",
      "id": "123456",
      "contact": "hello@creativeoutlook.com",
      "price": "$4123",
      "avatar": "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      "name": "Sita",
      "id": "654321",
      "contact": "info@innovativedesigns.com",
      "price": "$2849",
      "avatar": "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      "name": "Kiran",
      "id": "789012",
      "contact": "support@techsolutions.com",
      "price": "$3567",
      "avatar": "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      "name": "Ravi",
      "id": "345678",
      "contact": "contact@brightfuture.com",
      "price": "$4780",
      "avatar": "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      "name": "Anita",
      "id": "901234",
      "contact": "admin@yourdomain.com",
      "price": "$3250",
      "avatar": "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      "name": "Vikram",
      "id": "567890",
      "contact": "team@enterpriseops.com",
      "price": "$3999",
      "avatar": "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      "name": "Priya",
      "id": "234567",
      "contact": "service@dynamicservices.com",
      "price": "$2676",
      "avatar": "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      "name": "Nisha",
      "id": "890123",
      "contact": "connect@globalnetwork.com",
      "price": "$4500",
      "avatar": "https://randomuser.me/api/portraits/men/1.jpg",
    },
  ]


  return (
    <div className="bg-gradient-to-r from-[#0f0829] via-black to-[#0f0829] rounded-xl p-4 my-4">
      <Table className="border-none">
        <TableHeader>
          <TableRow className="border-none hover:bg-transparent cursor-pointer">
            <TableHead className="text-[#ffff] font-bold text-lg">User</TableHead>
            <TableHead className="text-[#ffff] font-bold text-lg">Booking ID</TableHead>
            <TableHead className="text-[#ffff] font-bold text-lg">Contact</TableHead>
            <TableHead className="text-[#ffff] font-bold text-lg text-right">Price</TableHead>
          </TableRow>
        </TableHeader>


        <TableBody>
          {allProvider.map((item) => (
            <TableRow key={item.id} className="text-[#ffff] border-none hover:bg-transparent cursor-pointer">
              <TableCell className="flex items-center space-x-3">
                <Image src={item.avatar} alt="user photo" width={50} height={50} className="object-cover rounded-full" />
                <span className="text-white">{item.name}</span>
              </TableCell>
              <TableCell className="text-slate-300">{item.id}</TableCell>
              <TableCell className="text-slate-300">{item.contact}</TableCell>
              <TableCell className="text-white text-right font-semibold">{item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ManageProviderList
