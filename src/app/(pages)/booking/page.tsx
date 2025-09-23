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

import { Button } from "@/components/ui/button";
import CustomButtonLoader from "@/components/loader/CustomButtonLoader";
import WebEmptyData from "@/components/WebEmptyData";



const BookingPage = () => {
  const [selectedGameType, setSelectedGameType] = useState<string>("");
  const [roomId, setRoomId] = useState<string | number>("");
  const [selectedStatus, setSelectedStatus] = useState("Upcoming");

  const [timeSlots, setTimeSlots] = useState([]) // time data 
  const [pcs, setPcs] = useState([]) // pc data
  const numberArray = pcs.map(Number);



  // get room api
  const { data: getAllRoom } = useAllRoomGetRoomApiQuery({ skip: true });
  const allRoomData: BookingProps[] = getAllRoom?.data?.data;

  const { data: getProviderList, isLoading } = useGetProviderBookingListApiQuery({
    room_id: 2,
    status: "Upcoming",
    date: "2025-08-20",
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
      const newPcs = providerListData.map((item, index) => ` ${index + 1}`);
      setPcs(newPcs);

      const timeData = providerListData?.map((item) => item.starting_time)
      setTimeSlots(timeData)
    }
  }, [providerListData]);


  if (isLoading) {
    return <div className="h-[50vh] flex justify-center items-center"><CustomButtonLoader /></div>
  }

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




      {/* TABLE COMPONENT */}
      {
        providerListData?.length > 0 ? <table className="min-w-full overflow-x-auto table-auto  border border-gray-900">
          <thead>
            <tr className="">
              <th className="px-4 py-2 border">Time</th>
              {pcs.map((pc, index) => (
                <th key={index} className="px-4 py-2 border ">
                  PC {pc}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {timeSlots.map((slot, slotIndex) => (
              <tr key={slotIndex}>
                <td className="px-4 py-2 border">{slot}</td>
                {numberArray.map((pc, pcIndex) => {
                  const bookingData = providerListData?.find(b => {
                    return (
                      b.starting_time === slot && b.pc_no === pc
                    )
                  });
                  return (
                    <td
                      key={pcIndex}
                      className={` px-4 py-6  border text-center ${bookingData ? 'bg-[#b9c8ff] text-black' : ""}`}
                    >
                      {bookingData && <div className="flex flex-col">
                        <p className="font-bold">{bookingData?.user.name}</p>
                        <p className="text-gray-500">{bookingData?.starting_time} - {bookingData?.ending_time}</p>
                      </div>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
          :
          <WebEmptyData
            customStyle={`bg-red-500 text-white `}
            style={{
              background: "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
            }}
          />
      }
    </div>
  );
};

export default BookingPage;
