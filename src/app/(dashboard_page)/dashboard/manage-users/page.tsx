
"use client"

import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

import Image from "next/image"
import CustomModal from "@/components/modal/customModal"
import DeleteManageUser from "@/components/modal/delete-manage-user"
import { useRouter } from "next/navigation"
import { useGetUserApiQuery } from "@/redux/dashboard/manageUsers/manageUserApi"

import DashboardLoader from "@/components/DashboardLoader"
import CustomPagination from "@/components/customPagination/CustomPagination"



interface User {
  id: string | number
  name: string
  email: string
  role: "User" | "Provider"
  avatar: string
}



const ManageUserPage = () => {
  const [searchText, setSearchText] = useState("")
  const [isDelete, setIsDelete] = useState(false)
  const router = useRouter()
  const [deleteId, setDeleteId] = useState<string | number>('')

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6)





  const { data: getUser, isLoading, refetch } = useGetUserApiQuery({ per_page: perPage, role: searchText,search:searchText, page: currentPage })
  const userData: User[] = getUser?.data?.data
  const totalItems = getUser?.data?.total
  const totalPages = Math.ceil(totalItems / perPage)




  const handleNavigate = (value: string) => {
    if (value === 'USER') {
      router.push('/dashboard/manage-user')
    } else if (value === 'PROVIDER') {
      router.push('/dashboard/manage-provider')
    }
  }

  const handleDeleteUser = (id: string | number) => {
    setDeleteId(id)
  }


  useEffect(() => {
    refetch();
  }, [searchText, currentPage, perPage, refetch]);


  if (isLoading) {
    return <DashboardLoader />
  }


  return (
    <>
      <div className="text-[#fff] mb-6 pt-4 ">
sfdf
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



          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-4 py-3 text-sm font-medium text-slate-300 ">
            <div className="col-span-5 text-[#ffff] font-bold text-lg">User</div>
            <div className="col-span-3 text-[#ffff] font-bold text-lg">Role</div>
            <div className="col-span-4 text-[#ffff] font-bold text-lg text-right">Actions</div>
          </div>

          {/* User List */}
          <div className="space-y-2">
            {userData?.map((user) => (
              <div
                key={user.id}
                className="grid grid-cols-12 gap-4 items-center px-4 py-4 "
              >
                {/* User Info */}
                <div className="col-span-5 flex items-center gap-3">
                  <Image src={user.avatar} alt="user photo" width={50} height={50} className="object-cover rounded-full" />
                  <div>
                    <div
                      className="font-medium text-slate-100">{user.name}</div>
                    <div className="text-sm text-slate-400">{user.email}</div>
                  </div>
                </div>

                {/* Role */}
                <div className="col-span-3">
                  <div className="bg-[#fff] w-fit text-black px-3 py-1 rounded-xl">
                    {user.role}
                  </div>
                </div>

                {/* Actions */}
                <div className="col-span-4 flex justify-end gap-2">
                  {/* delete */}
                  <svg
                    onClick={() => {
                      setIsDelete(!isDelete),
                        handleDeleteUser(user?.id)
                    }}
                    className="cursor-pointer"
                    width="43" height="44" viewBox="0 0 43 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.5" width="43" height="43" rx="12" fill="white" />
                    <path d="M18.5 17.5V16C18.5 15.4477 18.9477 15 19.5 15H23.5C24.0523 15 24.5 15.4477 24.5 16V17.5M14 18H29M15.5 18V28C15.5 28.5523 15.9477 29 16.5 29H26.5C27.0523 29 27.5 28.5523 27.5 28V18M21.5 21.5V26.5M18.5 23.5V26.5M24.5 23.5V26.5" stroke="#EC474F" />
                  </svg>


                  {/* view */}
                  <svg
                    onClick={() => handleNavigate(user?.role)}
                    className="cursor-pointer"
                    width="43" height="44" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="46" height="46" rx="12" fill="white" />
                    <path d="M30.158 22.2838C30.386 22.6033 30.5 22.7638 30.5 23C30.5 23.237 30.386 23.3968 30.158 23.7163C29.1335 25.1533 26.5168 28.25 23 28.25C19.4825 28.25 16.8665 25.1525 15.842 23.7163C15.614 23.3968 15.5 23.2363 15.5 23C15.5 22.763 15.614 22.6033 15.842 22.2838C16.8665 20.8468 19.4832 17.75 23 17.75C26.5175 17.75 29.1335 20.8475 30.158 22.2838Z" stroke="#49ADF4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M25.25 23C25.25 22.4033 25.0129 21.831 24.591 21.409C24.169 20.9871 23.5967 20.75 23 20.75C22.4033 20.75 21.831 20.9871 21.409 21.409C20.9871 21.831 20.75 22.4033 20.75 23C20.75 23.5967 20.9871 24.169 21.409 24.591C21.831 25.0129 22.4033 25.25 23 25.25C23.5967 25.25 24.169 25.0129 24.591 24.591C25.0129 24.169 25.25 23.5967 25.25 23Z" stroke="#49ADF4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>

                </div>
              </div>
            ))}
          </div>
        </div>



        {/* PAGINATION COMPONENT */}
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />


        {/* modal component(DELETE_USER) */}
        <CustomModal
          open={isDelete}
          setIsOpen={setIsDelete}
          className={"p-0 max-h-[0vh]"}
          maxWidth={"md:!max-w-[30vw]"}
        >
          <DeleteManageUser
            open={isDelete}
            setIsOpen={setIsDelete}
            deleteId={deleteId}
          />
        </CustomModal>
      </div>
    </>
  )
}

export default ManageUserPage


