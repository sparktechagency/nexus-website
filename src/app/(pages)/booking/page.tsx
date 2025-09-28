"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAllRoomGetRoomApiQuery } from "@/redux/website/rooms/roomApi";
import { useGetBookingDetailsApiQuery, useGetProviderBookingListApiQuery } from "@/redux/website/booking/bookingApi";



interface BookingProps {
  id: number | string;
  name: string;
   no_of_pc?: number;
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
import CustomModal from "@/components/modal/customModal"
import AddGamer from "@/components/modal/booking-section-modal/add-gamer"
import GamerInfoPayComplete from "@/components/modal/booking-section-modal/gamer-info-pay-complete"
import GamerInfoConBooking from "@/components/modal/booking-section-modal/gamer-info-con-booking"
import GamerInfoConReschedule from "@/components/modal/booking-section-modal/gamer-info-con-reschedule"
import GamerInfoReviewRating from "@/components/modal/booking-section-modal/gamer-info-review-rating"
import CancelTabModal from "@/components/modal/booking-section-modal/cancel-tab-modal"
import DatePicker from "react-datepicker";
import CustomModalTwo from "@/components/modal/customModalTwo";
import CommonSubscription from "@/components/commonSubscription/CommonSubscription";



const BookingPage = () => {
  const [isAddRoom, setIsAddRoom] = useState(false)
  const [gamerInfoPayCompleteModalOpen, setGamerInfoPayCompleteModalOpen] = useState(false)
  const [gamerInfoConBookingModalOpen, setGamerInfoConBookingModalOpen] = useState(false)
  const [gamerInfoRescheduleModalOpen, setGamerInfoRescheduleModalOpen] = useState(false)
  const [gamerReviewRatingModalOpen, setGamerReviewRatingModalOpen] = useState(false)

  const [cancelTabModalModalOpen, setCancelTabModalModalOpen] = useState(false)
  const [selectedGameType, setSelectedGameType] = useState<string>("");
  const [roomId, setRoomId] = useState<string | number>("");
  const [selectedStatus, setSelectedStatus] = useState("Ongoing");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [bookingId, setBookingId] = useState<string | number>('')


  const [timeSlots, setTimeSlots] = useState<string[]>([])  // time data 
  const [pcs, setPcs] = useState<string[]>([])  // pc data
  const numberArray = pcs.map(Number);

  // Format to yyyy-mm-dd
  const dateStr = startDate || new Date()
  const date = new Date(dateStr);
  const formattedDate = date.toISOString().split('T')[0];


  // get room api
  const { data: getAllRoom } = useAllRoomGetRoomApiQuery({ skip: true });
  const allRoomData: BookingProps[] = getAllRoom?.data?.data;



  const { data: getProviderList, isLoading } = useGetProviderBookingListApiQuery({
    room_id: roomId,
    status: selectedStatus,
    date: formattedDate,
  });
  const providerListData: ProviderBookingProps[] = getProviderList?.data;


  // BOOKING DETAILS API
  const { data: getBookingDetails } = useGetBookingDetailsApiQuery(bookingId);
  const bookingDetails = getBookingDetails?.data



const pcNumber = allRoomData?.find(item => item.id === roomId)


  useEffect(() => {
    if (allRoomData && allRoomData.length > 0) {
      setSelectedGameType(allRoomData[0]?.name);
      setRoomId(allRoomData[0]?.id);
    }
  }, [allRoomData]);



  useEffect(() => {
    if (providerListData && providerListData.length > 0) {
      const newPcs = providerListData.map((_, index) => ` ${index + 1}`);
      setPcs(newPcs);

      const timeData = providerListData?.map((item) => item.starting_time)
      setTimeSlots(timeData)
    }
  }, [providerListData]);

  const handleModalOpen = (bookingSelectId: string | number, statusType: string) => {
    setBookingId(bookingSelectId)
    if (statusType === 'Ongoing') {
      setGamerInfoPayCompleteModalOpen(true)
    }
    else if (statusType === 'Upcoming') {
      setGamerInfoConBookingModalOpen(true)
    }
    else if (statusType === 'Completed') {
      setGamerReviewRatingModalOpen(true)
    }
    else if (statusType === 'Canceled') {
      setCancelTabModalModalOpen(true)
    }
  }





  if (isLoading) {
    return <div className="h-[50vh] flex justify-center items-center"><CustomButtonLoader /></div>
  }

  return (
    <>
      <div className="px-4 md:px-6 lg:px-8 mb-6 text-white h-full bg-gradient-to-r from-[#0f0829] via-black to-[#0f0829] rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-6 xl:items-center justify-between mb-6">
          <div>
            <h1 className="xl:text-2xl font-bold text-white mb-2">Ongoing Bookings of Your Gaming Zone</h1>
            <p className="text-gray-400 text-sm">You can update your room information from here & also can add a new room.</p>
          </div>
          <Button
            onClick={() => setIsAddRoom(!isAddRoom)}
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
            {(["Ongoing", "Upcoming", "Completed", "Canceled"]).map((status) => (
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


            {/* DATE PICKER (SELECT DATA) */}
            {
              selectedStatus && (selectedStatus === "Upcoming" || selectedStatus === "Completed" || selectedStatus === "Canceled") ? <div className="">
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}
                  className="bg-[#5E5E5E33] p-3 w-full block rounded-lg  focus:outline-none focus:border-none"
                  wrapperClassName="w-full"
                />
              </div> : ""
            }
          </div>
        </div>


        {/* TABLE COMPONENT */}
        <div className="overflow-x-auto w-full">
          {
            providerListData?.length > 0 ? <table className="min-w-full">
              <thead>
                <tr >
                  <th className="text-[14px] md:text-[16px] px-2 md:px-4 py-2 border border-gray-800">Time</th>
                  {pcNumber && Array.from({ length: pcNumber.no_of_pc ?? 0}, (_, index) => (
                    <th key={index} className="text-[14px] md:text-[16px] px-2 md:px-4 md:py-2 border border-gray-800 ">
                    PC {index + 1}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {timeSlots.map((slot, slotIndex) => (
                  <tr key={slotIndex}>
                    <td className=" text-[10px] md:text-[14px] xl:text-[16px] px-1 xl:px-4 py-2 text-center border border-gray-800">{slot}</td>
                    {numberArray.map((pc, pcIndex) => {
                      const bookingData = providerListData?.find(b => {
                        return (
                          b.starting_time === slot && b.pc_no === pc
                        )
                      });

                      return (
                        <td
                          key={pcIndex}
                          className={` px-1 xl:px-4 py-2 md:py-6  border border-gray-800 text-center ${bookingData ? 'bg-[#b9c8ff] text-black' : ""}`}
                        >
                          {bookingData && <div
                            onClick={() => handleModalOpen(bookingData?.id, selectedStatus)}
                            className="flex flex-col cursor-pointer">
                            <p className="text-[10px] md:text-[14px] xl:text-[16px] font-bold">{bookingData?.user.name}</p>
                            <p className="flex flex-col md:flex-row  justify-center text-[10px] md:text-[12px] xl:text-[16px] text-gray-500"><span className="mr-[2px]">{bookingData?.starting_time}</span> - <span className="ml-[2px]">{bookingData?.ending_time}</span></p>
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
      </div>



      {/* modal component(ADD_Gamer) */}
      <CustomModalTwo
        open={isAddRoom}
        setIsOpen={setIsAddRoom}
        className={"p-4 max-h-[0vh]"}
        maxWidth={"md:!max-w-[50vw]"}
      >
        <AddGamer
          open={isAddRoom}
          setIsOpen={setIsAddRoom}
          roomId={roomId}
        />
      </CustomModalTwo>




      {/* modal component(Gamer_Info_Pay_Complete) */}
      <CustomModal
        open={gamerInfoPayCompleteModalOpen}
        setIsOpen={setGamerInfoPayCompleteModalOpen}
        className={"p-4 max-h-[0vh]"}
        maxWidth={"md:!max-w-[40vw]"}
      >
        <GamerInfoPayComplete
          open={gamerInfoPayCompleteModalOpen}
          setIsOpen={setGamerInfoPayCompleteModalOpen}
          bookingId={bookingId}
        />
      </CustomModal>



      {/* modal component(Gamer_Info_con-booking ===== Details [STATUS----> UP_Coming ]) */}
      <CustomModal
        open={gamerInfoConBookingModalOpen}
        setIsOpen={setGamerInfoConBookingModalOpen}
        className={"p-4 max-h-[0vh]"}
        maxWidth={"md:!max-w-[40vw]"}
      >
        <GamerInfoConBooking
          bookingDetails={bookingDetails}
          bookingId={bookingId}
          roomId={roomId}
        />
      </CustomModal>


      {/* modal component(gamer-info-con-reschedule) */}
      <CustomModal
        open={gamerInfoRescheduleModalOpen}
        setIsOpen={setGamerInfoRescheduleModalOpen}
        className={"p-4 max-h-[0vh]"}
        maxWidth={"md:!max-w-[40vw]"}
      >
        <GamerInfoConReschedule />
      </CustomModal>



      {/* modal component(REVIEW_RATING) */}
      <CustomModal
        open={gamerReviewRatingModalOpen}
        setIsOpen={setGamerReviewRatingModalOpen}
        className={"p-4 max-h-[0vh]"}
        maxWidth={"!max-w-[45vw]"}>

        <GamerInfoReviewRating
          open={gamerReviewRatingModalOpen}
          setIsOpen={setGamerReviewRatingModalOpen}
          bookingDetails={bookingDetails}
        />
      </CustomModal>




      {/* modal component(CancelTab_Modal) */}
      <CustomModal
        open={cancelTabModalModalOpen}
        setIsOpen={setCancelTabModalModalOpen}
        className={"p-4 max-h-[0vh]"}
        maxWidth={"!max-w-[45vw]"}>

        <CancelTabModal
          open={cancelTabModalModalOpen}
          setIsOpen={setCancelTabModalModalOpen}
          bookingId={bookingId}
        />
      </CustomModal>



      {/* SUBSCRIPTION COMPONENT MODAL */}
      <CommonSubscription />
    </>
  );
};

export default BookingPage;
