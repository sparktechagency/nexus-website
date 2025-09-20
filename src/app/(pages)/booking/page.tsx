"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAllRoomGetRoomApiQuery } from "@/redux/website/rooms/roomApi";
import { useGetProviderBookingListApiQuery } from "@/redux/website/booking/bookingApi";



interface BookingProps {
  id: number | string;
  name: string;
}

interface ProviderBookingProps {
  id: number | string;
  pc_no: string | number;
  starting_time: string;
  ending_time: string;
  color: "blue" | "pink" | "green" | "orange" | undefined;
  user: { id: number | string; name: string };
}


import { useMemo } from "react"
import { Button } from "@/components/ui/button";

interface Booking {
  id: number | string;
  user: {
    id: number | string;
    name: string
  }
  starting_time: string
  ending_time: string
  pc_no: string | number;
  color?: "blue" | "pink" | "green" | "orange"
}

const colorVariants = {
  blue: "bg-blue-500/80 border-blue-400 text-white",
  pink: "bg-pink-500/80 border-pink-400 text-white",
  green: "bg-green-500/80 border-green-400 text-white",
  orange: "bg-orange-500/80 border-orange-400 text-white",
}


const BookingPage = () => {
  const [selectedGameType, setSelectedGameType] = useState<string>("");
  const [roomId, setRoomId] = useState<string | number>("");
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus>("Upcoming");
  const [providerBookings, setProviderBookings] = useState<ProviderBookingProps[]>([]);


  const [timeSlots, setTimeSlots] = useState([])


  const [bookings, setBookings] = useState<ProviderBookingProps[]>([])
  const [pcs, setPcs] = useState([])
  const numberArray = pcs.map(Number);



  // get room api
  const { data: getAllRoom } = useAllRoomGetRoomApiQuery({ skip: true });
  const allRoomData: BookingProps[] = getAllRoom?.data?.data;

  const { data: getProviderList, isLoading } = useGetProviderBookingListApiQuery({
    room_id: 3,
    status: selectedStatus,
    date: "2025-09-20",
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
      setBookings(providerListData);

      const newPcs = providerListData.map((item, index) => ` ${index + 1}`);
      setPcs(newPcs);

      const timeData = providerListData?.map((item) => item.starting_time)
      setTimeSlots(timeData)
    }
  }, [providerListData]);



  return (
    <div className="px-4 md:px-6 lg:px-8 mb-6 text-white h-full bg-gradient-to-r from-[#0f0829] via-black to-[#0f0829] rounded-lg p-6">

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
              className={`${selectedGameType === item?.name
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






      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">


            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 border-r border-gray-200">Time</th>
                {
                  pcs.map((item, index) => {
                    return (
                      <th key={index} className="px-6 py-4 text-left text-sm font-medium text-gray-600 border-r border-gray-200">
                        {item}
                      </th>
                    )
                  })
                }
              </tr>
            </thead>



            {/* TABLE BODY */}
            <tbody>
              {providerListData?.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-25"
                    }`}
                >
                  <td className="px-6 py-4 border-r border-gray-200 ">
                    <span className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">{item.starting_time}</span>
                  </td>
                  <td className="flex flex-col bg-gray-400 m-1  text-center px-6 py-4 border border-gray-200">
                    <span className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">PC : {item?.pc_no}</span>
                    <span className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">{item?.user?.name}</span>
                    <span className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">Duration : {item?.duration}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


    </div>
  );
};

export default BookingPage;
