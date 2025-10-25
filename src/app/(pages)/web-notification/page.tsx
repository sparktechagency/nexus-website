
"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useGetWebNotificationApiQuery, useMarkAllWebNotificationApiMutation, useSingleWebNotificationApiMutation } from "@/redux/website/notification/webNotificationApi"
import Image from "next/image"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import DashboardLoader from "@/components/DashboardLoader"
import CustomPagination from "@/components/customPagination/CustomPagination"
import WebEmptyData from "@/components/WebEmptyData"



interface NotificationItem {
    id: string
    image: string
    title: string
    message: string
    time: string
    is_read: boolean
    created_time: string
}

interface ApiError {
    data: {
        message: string;
    };
}


const WebNotificationPage = () => {
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(1);

    const perPage = 7


    const { data: getNotification, isLoading, refetch } = useGetWebNotificationApiQuery({ per_page: perPage ?? 5, page: currentPage ?? 1 })
    const notificationData: NotificationItem[] = getNotification?.data?.notifications?.data
    const totalItems = getNotification?.data?.notifications?.total
    const totalPages = Math.ceil(totalItems / perPage)


    const [singleNotification] = useSingleWebNotificationApiMutation()
    const [markAllWebNotificationApi] = useMarkAllWebNotificationApiMutation()




    // Handle single notification
    const handleNotificationId = async (id: string | number) => {
        try {
            const res = await singleNotification(id).unwrap();

            if (res?.status === true) {
                toast.success(res?.message)
            } else {
                toast.error(res?.messages)
            }
        } catch (errors) {
            const errorValue = errors as ApiError;
            if (errorValue?.data?.message) {
                toast.error(errorValue?.data?.message); // Now you can safely access error.data.message
            }
        }
    }


    const handleMarkAllNotification = async () => {

        try {
            const res = await markAllWebNotificationApi(null).unwrap();

            if (res?.status === true) {
                toast.success(res?.message)
            } else {
                toast.error(res?.messages)
            }
        } catch (errors) {
            const errorValue = errors as ApiError;
            if (errorValue?.data?.message) {
                toast.error(errorValue?.data?.message); // Now you can safely access error.data.message
            }
        }
    }


    const handleNotificationBack = () => {
        router.push('/home')
    }

    useEffect(() => {
        refetch();
    }, [currentPage, perPage, refetch]);

    if (isLoading) {
        return <DashboardLoader />
    }

    return (
        <div className="px-4 md:px-6 lg:px-8 mb-6  text-white">
            {/* Header */}
            <div className="flex items-center gap-4 ">
                <svg
                    onClick={handleNotificationBack}
                    className="cursor-pointer"
                    width="18" height="30" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 30L0 15L15 0L17.6625 2.6625L5.325 15L17.6625 27.3375L15 30Z" fill="white" />
                </svg>

                <h1 className="text-2xl font-semibold">Notifications</h1>
            </div>


            {/* Subtitle */}
            <div className="p-4 pb-2">
                <p className="text-slate-400 text-sm">
                    You can update your room information from here & also can add a new room.
                </p>
            </div>

            {
                notificationData?.length > 0 && <div className="flex justify-end">
                    <button
                        onClick={handleMarkAllNotification}
                        className="bg-gray-700 hover:bg-gray-800 cursor-pointer border border-gray-800 py-2 px-4 rounded-full  font-semibold xl:mx-5">Mark all as read</button>
                </div>
            }



            {/* Notifications List */}
            {
                notificationData?.length > 0 ? <div className="px-4 pt-4 space-y-4 ">
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
                                    className="w-[40px] h-[40px] rounded-full"
                                />
                            }


                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <p className="text-slate-200 text-sm leading-relaxed">{notification.title}</p>
                            </div>

                            {/* Time */}
                            <div className="flex-shrink-0">
                                <span className="text-slate-400 text-xs">{notification.created_time}</span>
                            </div>
                        </div>
                    ))}

                    {/* PAGINATION COMPONENT */}
                    <CustomPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                    />
                </div> : < WebEmptyData
                    customStyle={`bg-red-500 text-white `}
                    style={{
                        background: "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
                    }}
                />
            }

        </div>
    )
}
export default WebNotificationPage;