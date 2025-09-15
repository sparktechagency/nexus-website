
"use client"

import type React from "react"
import toast from "react-hot-toast"
import { useGetWebNotificationApiQuery, useMarkAllWebNotificationApiMutation, useSingleWebNotificationApiMutation } from "@/redux/website/notification/webNotificationApi"
import Image from "next/image"
import { useEffect, useState } from "react"
import DashboardLoader from "@/components/DashboardLoader"
import CustomPagination from "@/components/customPagination/CustomPagination"


interface NotificationItem {
    id: string
    image: string
    title: string
    message: string
    time: string
    is_read: boolean
    created_time: string
}


const NotificationPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(8)



    const { data: getNotification, isLoading, refetch } = useGetWebNotificationApiQuery({ per_page: perPage, page: currentPage })
    const notificationData: NotificationItem[] = getNotification?.data?.notifications?.data
    const totalItems = getNotification?.data?.notifications?.total
    const totalPages = Math.ceil(totalItems / perPage)


    const [singleNotification] = useSingleWebNotificationApiMutation()
    const [markAllWebNotificationApi] = useMarkAllWebNotificationApiMutation()




    // Handle single notification
    const handleNotificationId = async (id: string | any) => {
        try {
            const res = await singleNotification(id).unwrap();
            console.log(res)

            if (res?.status === true) {
                toast.success(res?.message)
            } else {
                toast.error(res?.messages)
            }
        } catch (errors: any) {
            if (errors) {
                toast.error(errors.data?.message)
            }
        }
    }


    const handleMarkAllNotification = async () => {
        console.log('click')

        try {
            const res = await markAllWebNotificationApi(null).unwrap();
            console.log(res)

            if (res?.status === true) {
                toast.success(res?.message)
            } else {
                toast.error(res?.messages)
            }
        } catch (errors: any) {
            if (errors) {
                toast.error(errors.data?.message)
            }
        }
    }

    useEffect(() => {
        refetch();
    }, [currentPage, perPage, refetch]);

    if (isLoading) {
        return <DashboardLoader />
    }


    return (
        <div className=" my-6  text-white">

            <div className="flex justify-end">
                <button
                    onClick={handleMarkAllNotification}
                    className="bg-gray-700 hover:bg-gray-800 cursor-pointer border border-gray-800 py-2 px-4 rounded-full  font-semibold xl:mx-5">Mark all as read</button>
            </div>



            {/* Notifications List */}
            <div className="px-4 pt-4 space-y-4 ">
                {notificationData?.map((notification) => (
                    <div key={notification.id}
                        onClick={() => !notification?.is_read && handleNotificationId(notification.id)}

                        className={` flex items-center gap-3 py-3  rounded-2xl px-4 ${notification?.is_read ? 'bg-transparent cursor-default' : 'bg-gray-900 cursor-pointer'}`}>
                        {
                            notification?.image && <Image
                                src={notification?.image}
                                alt="photo"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                        }


                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <p className="text-slate-200 text-sm leading-relaxed">{notification.title}</p>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-slate-200 text-sm leading-relaxed">{notification.id}</p>
                        </div>

                        {/* Time */}
                        <div className="flex-shrink-0">
                            <span className="text-slate-400 text-xs">{notification.created_time}</span>
                        </div>
                    </div>
                ))}
            </div>


            {/* PAGINATION COMPONENT */}
            <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
}
export default NotificationPage;