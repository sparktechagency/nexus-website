"use client"

import type React from "react"

import { useState, useMemo, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useAllRoomGetRoomApiQuery } from "@/redux/website/rooms/roomApi"
import { useGetProviderBookingListApiQuery } from "@/redux/website/booking/bookingApi"
import { Button } from "@/components/ui/button"


type BookingStatus = "Ongoing" | "Upcoming" | "Completed" | "Canceled"
type GameType = "vip" | "bootcamp" | "ps5"

interface BookingProps {
    id: number | string
    name: string
}
interface providerListDataProps {
    id: number | string
    pc_no:number
}


interface Booking {
    id: string
    playerName: string
    startTime: string
    endTime: string
    pcId: string
    color?: "blue" | "pink" | "green" | "orange"
}

interface BookingGridProps {
    pcs?: string[]
    timeSlots?: string[]
    bookings?: Booking[]
    className?: string
}

const defaultTimeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
]




const defaultPCs = ["PC 1", "PC 2", "PC 3", "PC 4", "PC 5"]

const defaultBookings: Booking[] = [
    {
        id: "1",
        playerName: "Lionel Messi",
        startTime: "10:00 AM",
        endTime: "11:00 PM",
        pcId: "PC 1",
        color: "pink",
    },
    {
        id: "2",
        playerName: "Lionel Messi",
        startTime: "11:00 AM",
        endTime: "12:00 PM",
        pcId: "PC 2",
        color: "pink",
    },
    {
        id: "3",
        playerName: "Lionel Messi",
        startTime: "11:00 AM",
        endTime: "02:00 PM",
        pcId: "PC 3",
        color: "blue",
    },
    {
        id: "4",
        playerName: "Lionel Messi",
        startTime: "12:00 PM",
        endTime: "01:00 PM",
        pcId: "PC 4",
        color: "pink",
    },
    {
        id: "5",
        playerName: "Neymar",
        startTime: "01:00 PM",
        endTime: "04:00 PM",
        pcId: "PC 2",
        color: "blue",
    },
    {
        id: "6",
        playerName: "Lionel Messi",
        startTime: "04:00 PM",
        endTime: "05:00 PM",
        pcId: "PC 3",
        color: "pink",
    },
    {
        id: "7",
        playerName: "Lionel Messi",
        startTime: "02:00 PM",
        endTime: "04:00 PM",
        pcId: "PC 1",
        color: "blue",
    },
    {
        id: "8",
        playerName: "Lionel Messi",
        startTime: "02:00 PM",
        endTime: "05:00 PM",
        pcId: "PC 4",
        color: "blue",
    },
    {
        id: "9",
        playerName: "Lionel Messi",
        startTime: "01:00 PM",
        endTime: "04:00 PM",
        pcId: "PC 5",
        color: "blue",
    },
    {
        id: "10",
        playerName: "Lionel Messi",
        startTime: "10:00 AM",
        endTime: "11:00 PM",
        pcId: "PC 5",
        color: "pink",
    },
]

const colorVariants = {
    blue: "bg-blue-500/80 border-blue-400 text-white",
    pink: "bg-pink-500/80 border-pink-400 text-white",
    green: "bg-green-500/80 border-green-400 text-white",
    orange: "bg-orange-500/80 border-orange-400 text-white",
}





const BookingPage = ({
    pcs = defaultPCs,
    timeSlots = defaultTimeSlots,
    bookings = defaultBookings,
    className,
}: BookingGridProps) => {

    const [selectedGameType, setSelectedGameType] = useState<GameType | string>('');
    const [roomId, setRoomId] = useState<string | number>('');
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







    const [selectedSlot, setSelectedSlot] = useState<{ pc: string; time: string } | null>(null)

    // Calculate booking positions and spans
    const bookingLayout = useMemo(() => {
        const layout: Record<string, Record<string, { booking: Booking; rowSpan: number; isStart: boolean }>> = {}

        bookings.forEach((booking) => {
            const startIndex = timeSlots.indexOf(booking.startTime)
            const endIndex = timeSlots.indexOf(booking.endTime)

            if (startIndex !== -1 && endIndex !== -1) {
                const rowSpan = endIndex - startIndex + 1

                for (let i = startIndex; i <= endIndex; i++) {
                    const timeSlot = timeSlots[i]
                    if (!layout[booking.pcId]) layout[booking.pcId] = {}

                    layout[booking.pcId][timeSlot] = {
                        booking,
                        rowSpan,
                        isStart: i === startIndex,
                    }
                }
            }
        })

        return layout
    }, [bookings, timeSlots])

    const handleSlotClick = (pc: string, time: string) => {
        // Check if slot is already booked
        const isBooked = bookingLayout[pc]?.[time]
        if (!isBooked) {
            setSelectedSlot({ pc, time })
        }
    }

    // **************************


    // get room api
    const { data: getAllRoom, } = useAllRoomGetRoomApiQuery({ skip: true })
    const allRoomData: BookingProps[] = getAllRoom?.data?.data
    // console.log(allRoomData)

    const { data: getProviderList, isLoading } = useGetProviderBookingListApiQuery({
        room_id: 2,
        status: "Upcoming",
        date: "2025-09-17"
    })

    const providerListData:providerListDataProps[] = getProviderList?.data





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
                    // onClick={() => setIsAddRoom(!isAddRoom)}
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



            {/* BOOKING TABLE */}
            <div className={cn("w-full overflow-x-auto", className)}>
                <div className="min-w-[800px] h-screen bg-gray-100 border border-pink-500 rounded-lg">
                    {/* Header */}
                    <div
                        className="grid grid-cols-[120px_repeat(var(--pc-count),1fr)] border-b border-pink-200"
                        style={{ "--pc-count": pcs.length } as React.CSSProperties}
                    >
                        <div className="p-4 border-r border-pink-200 bg-card">
                            <h3 className="font-semibold text-card-foreground">Time</h3>
                        </div>
                        {providerListData?.map((item,index:number) => (
                            <div key={item.id} className="p-4 border-r border-pink-200 last:border-r-0 bg-card text-center">
                                <h3 className="font-semibold text-card-foreground">PC {index+1}</h3>
                            </div>
                        ))}
                    </div>

                    {/* Time slots grid */}
                    <div className="relative">
                        {timeSlots.map((time, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-[120px_repeat(var(--pc-count),1fr)] border-b border-pink-200 last:border-b-0 min-h-[60px]"
                                style={{ "--pc-count": pcs.length } as React.CSSProperties}
                            >
                                {/* Time column */}
                                <div className="p-4 border-r border-pink-200 bg-muted/20 flex items-center">
                                    <span className="text-sm font-medium text-muted-foreground">{time}</span>
                                </div>

                                {/* PC columns */}
                                {pcs.map((pc) => {
                                    const slotData = bookingLayout[pc]?.[time]
                                    const isBooked = !!slotData
                                    const isBookingStart = slotData?.isStart

                                    return (
                                        <div key={`${pc}-${time}`} className="border-r border-pink-200 last:border-r-0 relative min-h-[60px]">
                                            {isBooked && isBookingStart && (
                                                <div
                                                    className={cn(
                                                        "absolute inset-x-1 top-1 rounded-md border-2 p-3 z-10 flex flex-col justify-center",
                                                        colorVariants[slotData.booking.color || "blue"],
                                                    )}
                                                    style={{
                                                        height: `${slotData.rowSpan * 60 - 8}px`,
                                                    }}
                                                >
                                                    <div className="font-semibold text-sm mb-1">{slotData.booking.playerName}</div>
                                                    <div className="text-xs opacity-90">
                                                        {slotData.booking.startTime} - {slotData.booking.endTime}
                                                    </div>
                                                </div>
                                            )}

                                            {!isBooked && (
                                                <button
                                                    onClick={() => handleSlotClick(pc, time)}
                                                    className={cn(
                                                        "w-full h-full hover:bg-accent/10 transition-colors",
                                                        selectedSlot?.pc === pc && selectedSlot?.time === time && "bg-accent/20",
                                                    )}
                                                />
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                {selectedSlot && (
                    <div className="mt-4 p-4 bg-card border border-border rounded-lg">
                        <p className="text-card-foreground">
                            Selected: <span className="font-semibold">{selectedSlot.pc}</span> at{" "}
                            <span className="font-semibold">{selectedSlot.time}</span>
                        </p>
                        <button
                            onClick={() => setSelectedSlot(null)}
                            className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                        >
                            Book This Slot
                        </button>
                    </div>
                )}
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