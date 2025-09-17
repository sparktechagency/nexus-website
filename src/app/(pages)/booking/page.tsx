// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { cn } from "@/lib/utils"
// import { useAllRoomGetRoomApiQuery } from "@/redux/website/rooms/roomApi"
// import { useGetProviderBookingListApiQuery } from "@/redux/website/booking/bookingApi"
// import { Button } from "@/components/ui/button"


// type BookingStatus = "Ongoing" | "Upcoming" | "Completed" | "Canceled"
// type GameType = "vip" | "bootcamp" | "ps5"

// interface BookingProps {
//     id: number | string
//     name: string
// }
// interface providerListDataProps {
//     id: number | string
//     pc_no: number
//     starting_time: string
// }



// const BookingPage = () => {

//     const [selectedGameType, setSelectedGameType] = useState<GameType | string>('');
//     const [roomId, setRoomId] = useState<string | number>('');
//     const [selectedStatus, setSelectedStatus] = useState<BookingStatus>("Ongoing")
//     const [selectedDate, setSelectedDate] = useState("2025-09-17")
//     const [providerTime, setProviderTime] = useState<string[]>([])















//     // get room api
//     const { data: getAllRoom, } = useAllRoomGetRoomApiQuery({ skip: true })
//     const allRoomData: BookingProps[] = getAllRoom?.data?.data
//     // console.log(allRoomData)

//     const { data: getProviderList, isLoading } = useGetProviderBookingListApiQuery({
//         room_id: 2,
//         status: "Upcoming",
//         date: "2025-09-17"
//     })

//     const providerListData: providerListDataProps[] = getProviderList?.data





//     useEffect(() => {
//         if (allRoomData && allRoomData.length > 0) {
//             setSelectedGameType(allRoomData[0]?.name);
//         }
//         if (allRoomData && allRoomData.length > 0) {
//             setRoomId(allRoomData[0]?.id);
//         }
//     }, [allRoomData]);


//     useEffect(() => {
//         if (providerListData && providerListData.length > 0) {
//             const time = providerListData?.map((i) => i.starting_time)
//             setProviderTime(time)
//         }

//     }, [providerListData]);



//     return (
//         <div className="px-4 md:px-6 lg:px-8 mb-6 text-white h-full bg-gradient-to-r from-[#0f0829] via-black to-[#0f0829] rounded-lg p-6 ">

//             {/* Header */}
//             <div className="flex flex-col md:flex-row gap-6 xl:items-center justify-between mb-6">
//                 <div>
//                     <h1 className="xl:text-2xl font-bold text-white mb-2">Ongoing Bookings of Your Gaming Zone</h1>
//                     <p className="text-gray-400 text-sm">
//                         You can update your room information from here & also can add a new room.
//                     </p>
//                 </div>
//                 <Button
//                     // onClick={() => setIsAddRoom(!isAddRoom)}
//                     className="w-fit px-6 py-2 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
//                     style={{
//                         background:
//                             "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
//                     }}
//                 >Add Gamer</Button>
//             </div>

//             <div className="flex flex-col xl:flex-row xl:justify-between pt-8 xl:pt-0">
//                 {/* Game Type Filters */}
//                 <div className="flex flex-wrap gap-3 mb-6 w-full xl:w-[50%] ">
//                     {
//                         allRoomData?.map((item) => {
//                             return (
//                                 <Button
//                                     key={item.id}
//                                     onClick={() => {
//                                         setSelectedGameType(item?.name);
//                                         setRoomId(item?.id);
//                                     }}
//                                     className={` ${selectedGameType === item?.name
//                                         ? "bg-white font-bold border border-gray-600 rounded-full cursor-pointer py-4 px-6 "
//                                         : "bg-transparent border border-gray-600 text-gray-400 rounded-full cursor-pointer py-4 px-6 "
//                                         }`}
//                                 >
//                                     <span
//                                         className={`${selectedGameType === item?.name
//                                             ? "bg-gradient-to-r from-[#6523E7] via-[#023CE3] to-[#6523E7] bg-clip-text text-transparent"
//                                             : ""
//                                             }`}
//                                     >
//                                         {item?.name?.toUpperCase()}
//                                     </span>
//                                 </Button>
//                             )
//                         })
//                     }
//                 </div>

//                 {/* Status Tabs */}
//                 <div className="flex flex-wrap gap-8 mb-6 ">
//                     {(["Ongoing", "Upcoming", "Completed", "Canceled"] as BookingStatus[]).map((status) => (
//                         <button
//                             key={status}
//                             onClick={() => setSelectedStatus(status)}
//                             className={cn(
//                                 "pb-3 px-1 text-sm font-medium transition-colors cursor-pointer relative",
//                                 selectedStatus === status
//                                     ? "cursor-pointer  bg-gradient-to-r from-[#6523E7] via-[#023CE3] to-[#6523E7] inline-block text-transparent bg-clip-text underline underline-offset-8 decoration-[#6523E7]"
//                                     : "text-[##C2C2C2]",
//                             )}
//                         >
//                             {status.charAt(0).toUpperCase() + status.slice(1)}
//                         </button>
//                     ))}
//                 </div>
//             </div>



//             {/* BOOKING TABLE */}
//             <div className={cn("w-full overflow-x-auto",)}>
//                 <div className="min-w-[800px] xl:min-h-[600px] bg-gray-100 border border-pink-500 ">
//                     {/* Header */}
//                     <div
//                         className="grid grid-cols-[120px_repeat(var(--pc-count),1fr)] border-b border-pink-200"
//                         style={{ "--pc-count": providerListData?.length } as React.CSSProperties}
//                     >
//                         <div className="p-4 border-r border-pink-200 bg-card">
//                             <h3 className="font-semibold text-card-foreground">Time</h3>
//                         </div>

//                         {providerListData?.map((item, index: number) => (
//                             <div key={item.id} className="p-4 border-r border-pink-200 last:border-r-0 bg-card text-center">
//                                 <h3 className="font-semibold text-card-foreground">PC {index + 1}</h3>
//                             </div>
//                         ))}

//                     </div>





//                     {/* Time slots grid */}
//                     <div className="relative">
//                         {providerTime?.map((time, index) => (
//                             <div
//                                 key={index}
//                                 className="grid grid-cols-[120px_repeat(var(--pc-count),1fr)] border-b border-pink-200 last:border-b-0 min-h-[60px]"
//                                 style={{ "--pc-count": providerTime?.length } as React.CSSProperties}
//                             >
//                                 {/* Time column */}
//                                 <div className="p-4 border-r border-pink-200 bg-muted/20 flex items-center">
//                                     <span className="text-sm font-medium text-muted-foreground">{time}</span>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>


//         </div>
//     )
// }


// export default BookingPage




"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAllRoomGetRoomApiQuery } from "@/redux/website/rooms/roomApi";
import { useGetProviderBookingListApiQuery } from "@/redux/website/booking/bookingApi";
import { Button } from "@/components/ui/button";

type BookingStatus = "Ongoing" | "Upcoming" | "Completed" | "Canceled";
type GameType = "vip" | "bootcamp" | "ps5";

interface BookingProps {
  id: number | string;
  name: string;
}

interface ProviderBookingProps {
  id: number | string;
  pc_no: number;
  starting_time: string;
  ending_time: string;
  user: { id: number; name: string };
}

const BookingPage = () => {
  const [selectedGameType, setSelectedGameType] = useState<GameType | string>("");
  const [roomId, setRoomId] = useState<string | number>("");
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus>("Upcoming");
  const [providerBookings, setProviderBookings] = useState<ProviderBookingProps[]>([]);

  // get room api
  const { data: getAllRoom } = useAllRoomGetRoomApiQuery({ skip: true });
  const allRoomData: BookingProps[] = getAllRoom?.data?.data;

  const { data: getProviderList, isLoading } = useGetProviderBookingListApiQuery({
    room_id: roomId,
    status: selectedStatus,
    date: "2025-09-17",
  });

  const providerListData: ProviderBookingProps[] = getProviderList?.data;

  useEffect(() => {
    if (allRoomData && allRoomData.length > 0) {
      setSelectedGameType(allRoomData[0]?.name);
      setRoomId(allRoomData[0]?.id);
    }
  }, [allRoomData]);

  useEffect(() => {
    if (providerListData && providerListData.length > 0) {
      setProviderBookings(providerListData);
    }
  }, [providerListData]);


  console.log("providerBookings----------> ",providerBookings)
  console.log("providerData----------> ",providerListData)

  

  return (
    <div className="px-4 md:px-6 lg:px-8 mb-6 text-white h-full bg-gradient-to-r from-[#0f0829] via-black to-[#0f0829] rounded-lg p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6 xl:items-center justify-between mb-6">
        <div>
          <h1 className="xl:text-2xl font-bold text-white mb-2">Ongoing Bookings of Your Gaming Zone</h1>
          <p className="text-gray-400 text-sm">You can update your room information from here & also can add a new room.</p>
        </div>
        <Button
          className="w-fit px-6 py-2 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
          style={{
            background: "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
          }}
        >
          Add Gamer
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col xl:flex-row xl:justify-between pt-8 xl:pt-0">
        {/* Game Type Filters */}
        <div className="flex flex-wrap gap-3 mb-6 w-full xl:w-[50%]">
          {allRoomData?.map((item) => (
            <Button
              key={item.id}
              onClick={() => {
                setSelectedGameType(item?.name);
                setRoomId(item?.id);
              }}
              className={`${
                selectedGameType === item?.name
                  ? "bg-white font-bold border border-gray-600 rounded-full cursor-pointer py-4 px-6 "
                  : "bg-transparent border border-gray-600 text-gray-400 rounded-full cursor-pointer py-4 px-6 "
              }`}
            >
              <span
                className={`${
                  selectedGameType === item?.name
                    ? "bg-gradient-to-r from-[#6523E7] via-[#023CE3] to-[#6523E7] bg-clip-text text-transparent"
                    : ""
                }`}
              >
                {item?.name?.toUpperCase()}
              </span>
            </Button>
          ))}
        </div>

        {/* Status Tabs */}
        <div className="flex flex-wrap gap-8 mb-6">
          {(["Ongoing", "Upcoming", "Completed", "Canceled"] as BookingStatus[]).map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={cn(
                "pb-3 px-1 text-sm font-medium transition-colors cursor-pointer relative",
                selectedStatus === status
                  ? "cursor-pointer bg-gradient-to-r from-[#6523E7] via-[#023CE3] to-[#6523E7] inline-block text-transparent bg-clip-text underline underline-offset-8 decoration-[#6523E7]"
                  : "text-[##C2C2C2]"
              )}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>









      {/* BOOKING TABLE */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[800px] xl:min-h-[600px] bg-gray-100 border border-pink-500">
          {/* Header */}
          <div
            className="grid grid-cols-[120px_repeat(var(--pc-count),1fr)] border-b border-pink-200"
            style={{ "--pc-count": providerBookings?.length } as React.CSSProperties}
          >
            <div className="p-4 border-r border-pink-200 bg-card">
              <h3 className="font-semibold text-card-foreground">Time</h3>
            </div>

            {providerBookings?.map((item, index: number) => (
              <div key={item.id} className="p-4 border-r border-pink-200 last:border-r-0 bg-card text-center">
                <h3 className="font-semibold text-card-foreground">PC {index + 1}</h3>
              </div>
            ))}
          </div>







          {/* Time slots grid */}
          <div className="relative">
            {providerBookings?.map((booking, index) => (
              <div
                key={index}
                className="grid grid-cols-[120px_repeat(var(--pc-count),1fr)] border-b border-pink-200 last:border-b-0 min-h-[60px]"
                style={{ "--pc-count": providerBookings?.length } as React.CSSProperties}
              >
                {/* Time column */}
                <div className="p-4 border-r border-pink-200 bg-muted/20 flex items-center">
                  <span className="text-sm font-medium text-muted-foreground">{`${booking.starting_time}`}</span>
                </div>

                {/* Booking Data */}
                {providerBookings.map((provider) => (
                  <div
                    key={provider.id}
                    className={`p-4 border-r border-pink-200 ${provider.pc_no === booking.pc_no ? "bg-blue-500" : ""}`}
                  >
                    {provider.pc_no === booking.pc_no ? (
                      <div className="flex flex-col text-center rounded-2xl p-2 m-2 text-white">
                        <span>{provider.user.name}</span>
                        <span>{`${booking.starting_time} - ${booking.ending_time}`}</span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
