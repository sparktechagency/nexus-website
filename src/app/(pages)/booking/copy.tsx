"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import CustomModal from "@/components/modal/customModal"
import AddGamer from "@/components/modal/booking-section-modal/add-gamer"
import GamerInfoPayComplete from "@/components/modal/booking-section-modal/gamer-info-pay-complete"
import GamerInfoConBooking from "@/components/modal/booking-section-modal/gamer-info-con-booking"
import GamerInfoConReschedule from "@/components/modal/booking-section-modal/gamer-info-con-reschedule"
import RescheduleUpdate from "@/components/modal/booking-section-modal/reschedule-update"
import BookingConfirmation from "@/components/modal/booking-section-modal/booking-confirmation"
import GamerInfoReviewRating from "@/components/modal/booking-section-modal/gamer-info-review-rating"
import CancelTabModal from "@/components/modal/booking-section-modal/cancel-tab-modal"
import { useAllRoomGetRoomApiQuery } from "@/redux/website/rooms/roomApi"
import { useGetProviderBookingListApiQuery } from "@/redux/website/booking/bookingApi"

type BookingStatus = "Ongoing" | "Upcoming" | "Completed" | "Canceled"
type GameType = "vip" | "bootcamp" | "ps5"


interface Booking {
    id: string
    playerName: string
    startTime: string
    endTime: string
    pc: number
    status: BookingStatus
    gameType: GameType
}

interface BookingProps {
    id: string
    name: string
}

const timeSlots = ["10:00 AM", "11:00 AM", "12:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"]

const pcColumns = ["PC 1", "PC 2", "PC 3", "PC 4", "PC 5"]

// Sample booking data
const sampleBookings: Booking[] = [
    {
        id: "1",
        playerName: "Lionel Messi",
        startTime: "10:00 AM",
        endTime: "11:00 PM",
        pc: 1,
        status: "ongoing",
        gameType: "vip",
    },
    {
        id: "2",
        playerName: "Lionel Messi",
        startTime: "10:00 AM",
        endTime: "11:00 PM",
        pc: 5,
        status: "upcoming",
        gameType: "bootcamp",
    },
    {
        id: "3",
        playerName: "Lionel Messi",
        startTime: "11:00 AM",
        endTime: "12:00 PM",
        pc: 2,
        status: "ongoing",
        gameType: "vip",
    },
    {
        id: "4",
        playerName: "Lionel Messi",
        startTime: "11:00 AM",
        endTime: "02:00 PM",
        pc: 3,
        status: "ongoing",
        gameType: "vip",
    },
    {
        id: "5",
        playerName: "Lionel Messi",
        startTime: "12:00 AM",
        endTime: "06:00 PM",
        pc: 4,
        status: "ongoing",
        gameType: "vip",
    },
    {
        id: "6",
        playerName: "Lionel Messi",
        startTime: "02:00 PM",
        endTime: "03:00 PM",
        pc: 1,
        status: "ongoing",
        gameType: "vip",
    },
    {
        id: "7",
        playerName: "Neymar",
        startTime: "01:00 PM",
        endTime: "04:00 PM",
        pc: 2,
        status: "ongoing",
        gameType: "vip",
    },
    {
        id: "8",
        playerName: "Lionel Messi",
        startTime: "03:00 PM",
        endTime: "05:00 PM",
        pc: 4,
        status: "ongoing",
        gameType: "vip",
    },
    {
        id: "9",
        playerName: "Lionel Messi",
        startTime: "01:00 PM",
        endTime: "04:00 PM",
        pc: 5,
        status: "ongoing",
        gameType: "vip",
    },
    {
        id: "10",
        playerName: "Lionel Messi",
        startTime: "04:00 PM",
        endTime: "05:00 PM",
        pc: 3,
        status: "ongoing",
        gameType: "vip",
    },
]

// Time convert to Minute
function convertTimeToMinutes(time: string): number {
    const [timeStr, period] = time.split(" ")
    const [hours, minutes] = timeStr.split(":").map(Number)

    let adjustedHours = hours
    if (period === "PM" && hours !== 12) adjustedHours += 12
    if (period === "AM" && hours === 12) adjustedHours = 0

    return adjustedHours * 60 + minutes
}

function calculateBookingSpan(startTime: string, endTime: string): { startRow: number; span: number } {
    const startMinutes = convertTimeToMinutes(startTime)
    const endMinutes = convertTimeToMinutes(endTime)

    const startRow = timeSlots.findIndex((slot) => convertTimeToMinutes(slot) === startMinutes)
    const duration = endMinutes - startMinutes
    const span = Math.ceil(duration / 60) // Each slot is 1 hour

    return { startRow: startRow >= 0 ? startRow : 0, span }
}

const BookingPage = () => {

    const [selectedGameType, setSelectedGameType] = useState<GameType | null>(null);
    const [roomId, setRoomId] = useState<GameType | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<BookingStatus>("Ongoing")
    const [selectedDate, setSelectedDate] = useState("2025-09-17")


    const [isAddRoom, setIsAddRoom] = useState(false)
    const [gamerInfoPayCompleteModalOpen, setGamerInfoPayCompleteModalOpen] = useState(false)
    const [gamerInfoConBookingModalOpen, setGamerInfoConBookingModalOpen] = useState(false)
    const [gamerInfoRescheduleModalOpen, setGamerInfoRescheduleModalOpen] = useState(false)
    const [gamerReviewRatingModalOpen, setGamerReviewRatingModalOpen] = useState(false)
    const [rescheduleUpdateModalOpen, setRescheduleUpdateModalOpen] = useState(false)
    const [bookingConfirmationModalOpen, setBookingConfirmationModalOpen] = useState(false)
    const [cancelTabModalModalOpen, setCancelTabModalModalOpen] = useState(false)


    // get room api
    const { data: getAllRoom, } = useAllRoomGetRoomApiQuery({ skip: true })
    const allRoomData: BookingProps[] = getAllRoom?.data?.data
    // console.log(allRoomData)

    const { data: getProviderList, isLoading } = useGetProviderBookingListApiQuery({
        room_id: 2,
        status: "Upcoming",
        date: "2025-09-17"
    })

    const providerListData = getProviderList?.data





    useEffect(() => {
        if (allRoomData && allRoomData.length > 0) {
            setSelectedGameType(allRoomData[0]?.name);
        }
        if (allRoomData && allRoomData.length > 0) {
            setRoomId(allRoomData[0]?.id);
        }
    }, [allRoomData]);







    return (
        <div className="px-4 md:px-6 lg:px-8 mb-6 text-white h-full bg-gradient-to-r from-[#0f0829] via-black to-[#0f0829] rounded-lg p-6 ">
            {/* Header */}
            <div className="flex flex-col md:flex-row gap-6 xl:items-center justify-between mb-6">
                <div>
                    <h1 className="xl:text-2xl font-bold text-white mb-2">Ongoing Bookings of Your Gaming Zone</h1>
                    <p className="text-gray-400 text-sm">
                        You can update your room information from here & also can add a new room.
                    </p>
                </div>
                <Button
                    onClick={() => setIsAddRoom(!isAddRoom)}
                    className="w-fit px-6 py-2 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
                    style={{
                        background:
                            "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
                    }}
                >Add Gamer</Button>
            </div>

            <div className="flex flex-col xl:flex-row xl:justify-between pt-8 xl:pt-0">
                {/* Game Type Filters */}
                <div className="flex flex-wrap gap-3 mb-6 w-full xl:w-[50%] ">
                    {
                        allRoomData?.map((item) => {
                            return (
                                <Button
                                    key={item.id}
                                    onClick={() => {
                                        setSelectedGameType(item?.name);
                                        setRoomId(item?.id);
                                    }}
                                    className={` ${selectedGameType === item?.name
                                        ? "bg-white font-bold border border-gray-600 rounded-full cursor-pointer py-4 px-6 "
                                        : "bg-transparent border border-gray-600 text-gray-400 rounded-full cursor-pointer py-4 px-6 "
                                        }`}
                                >
                                    <span
                                        className={`${selectedGameType === item?.name
                                            ? "bg-gradient-to-r from-[#6523E7] via-[#023CE3] to-[#6523E7] bg-clip-text text-transparent"
                                            : ""
                                            }`}
                                    >
                                        {item?.name?.toUpperCase()}
                                    </span>
                                </Button>
                            )
                        })
                    }
                </div>

                {/* Status Tabs */}
                <div className="flex flex-wrap gap-8 mb-6 ">
                    {(["Ongoing", "Upcoming", "Completed", "Canceled"] as BookingStatus[]).map((status) => (
                        <button
                            key={status}
                            onClick={() => setSelectedStatus(status)}
                            className={cn(
                                "pb-3 px-1 text-sm font-medium transition-colors cursor-pointer relative",
                                selectedStatus === status
                                    ? "cursor-pointer  bg-gradient-to-r from-[#6523E7] via-[#023CE3] to-[#6523E7] inline-block text-transparent bg-clip-text underline underline-offset-8 decoration-[#6523E7]"
                                    : "text-[##C2C2C2]",
                            )}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>
            </div>











            {/* modal component(ADD_ROOM) */}
            {/* <CustomModal
                open={isAddRoom}
                setIsOpen={setIsAddRoom}
                className={"p-4 max-h-[0vh]"}
                maxWidth={"md:!max-w-[40vw]"}
            >
                <AddGamer
                    open={isAddRoom}
                    setIsOpen={setIsAddRoom}
                />
            </CustomModal> */}

            {/* modal component(Gamer_Info_Pay_Complete) */}
            {/* <CustomModal
                open={gamerInfoPayCompleteModalOpen}
                setIsOpen={setGamerInfoPayCompleteModalOpen}
                className={"p-4 max-h-[0vh]"}
                maxWidth={"md:!max-w-[40vw]"}
            >
                <GamerInfoPayComplete />
            </CustomModal> */}

            {/* modal component(Gamer_Info_con-booking) */}
            {/* <CustomModal
                open={gamerInfoConBookingModalOpen}
                setIsOpen={setGamerInfoConBookingModalOpen}
                className={"p-4 max-h-[0vh]"}
                maxWidth={"md:!max-w-[40vw]"}
            >
                <GamerInfoConBooking />
            </CustomModal> */}

            {/* modal component(gamer-info-con-reschedule) */}
            {/* <CustomModal
                open={gamerInfoRescheduleModalOpen}
                setIsOpen={setGamerInfoRescheduleModalOpen}
                className={"p-4 max-h-[0vh]"}
                maxWidth={"md:!max-w-[40vw]"}
            >
                <GamerInfoConReschedule />
            </CustomModal> */}

            {/* modal component(reschedule-update) */}
            {/* <CustomModal
                open={rescheduleUpdateModalOpen}
                setIsOpen={setRescheduleUpdateModalOpen}
                className={"p-4 max-h-[0vh]"}
                maxWidth={"md:!max-w-[40vw]"}
            >
                <RescheduleUpdate
                    open={rescheduleUpdateModalOpen}
                    setIsOpen={setRescheduleUpdateModalOpen}
                />
            </CustomModal> */}

            {/* modal component(reschedule-update) */}
            {/* <CustomModal
                open={bookingConfirmationModalOpen}
                setIsOpen={setBookingConfirmationModalOpen}
                className={"p-4 max-h-[0vh]"}
                maxWidth={"md:!max-w-[30vw]"}
            >
                <BookingConfirmation
                    open={bookingConfirmationModalOpen}
                    setIsOpen={setBookingConfirmationModalOpen}
                />
            </CustomModal> */}

            {/* modal component(reschedule-update) */}
            {/* <CustomModal
                open={gamerReviewRatingModalOpen}
                setIsOpen={setGamerReviewRatingModalOpen}
                className={"p-4 max-h-[0vh]"}
                maxWidth={"!max-w-[45vw]"}>

                <GamerInfoReviewRating
                    open={gamerReviewRatingModalOpen}
                    setIsOpen={setGamerReviewRatingModalOpen}
                />
            </CustomModal> */}

            {/* modal component(CancelTab_Modal) */}
            {/* <CustomModal
                open={cancelTabModalModalOpen}
                setIsOpen={setCancelTabModalModalOpen}
                className={"p-4 max-h-[0vh]"}
                maxWidth={"!max-w-[45vw]"}>

                <CancelTabModal />
            </CustomModal> */}
        </div>
    )
}

export default BookingPage