"use client"

import CustomPagination from "@/components/customPagination/CustomPagination"
import DashboardLoader from "@/components/DashboardLoader"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import WebEmptyData from "@/components/WebEmptyData"
import { useGetGamerListApiQuery } from "@/redux/dashboard/manageUsers/manageUserApi"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"


interface GamerProps {
  id: string;
  user: {
    avatar: string;
    name: string;
    email: string;
  };
  order_id: string;
  total: string;
}


function SuspendManageProviderList(){
  const searchParams = useSearchParams()
  const id = searchParams.get('id') || ""
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8


  const { data: getGamerList, isLoading, refetch } = useGetGamerListApiQuery({ id: id, per_page: perPage, page: currentPage })
  const gamerListData: GamerProps[] = getGamerList?.data?.data
  const totalItems = getGamerList?.data?.total
  const totalPages = Math.ceil(totalItems / perPage)

  useEffect(() => {
    refetch();
  }, [currentPage, perPage, refetch]);

  if (isLoading) {
    return <DashboardLoader />
  }


  return (
    <>
      {
        gamerListData?.length > 0 ? <div className="bg-gradient-to-r from-[#0f0829] via-black to-[#0f0829] rounded-xl p-4 my-4">
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
              {gamerListData?.map((item) => (
                <TableRow key={item.id} className="text-[#ffff] border-none hover:bg-transparent cursor-pointer">
                  <TableCell className="flex items-center space-x-3">
                    <Image src={item?.user?.avatar} alt="user photo" width={50} height={50} className="object-cover w-[50px] h-[50px] rounded-full" />
                    <span className="text-white">{item?.user?.name}</span>
                  </TableCell>
                  <TableCell className="text-slate-300">{item?.order_id}</TableCell>
                  <TableCell className="text-slate-300">{item?.user?.email}</TableCell>
                  <TableCell className="text-white text-right font-semibold">{item.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
          :
          <WebEmptyData
            customStyle="border-2 border-gray-500"
          />
      }


      {/* PAGINATION COMPONENT */}
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </>
  )
}


const ManageProviderList = () => {
    return (
        <Suspense fallback={<div className="h-[50vh] flex justify-center items-center"><DashboardLoader /></div>}>
            <SuspendManageProviderList />
        </Suspense>
    )
}

export default ManageProviderList;