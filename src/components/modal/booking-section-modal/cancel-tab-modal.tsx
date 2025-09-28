"use client"

import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button"
import { useGetBookingDetailsApiQuery } from "@/redux/website/booking/bookingApi";

import Image from "next/image"

interface cancelModelProps {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  bookingId: string | number
}

const CancelTabModal = ({ open, setIsOpen, bookingId }: cancelModelProps) => {


  // BOOKING DETAILS API
  const { data: getBookingDetails } = useGetBookingDetailsApiQuery(bookingId);
  const bookingDetails = getBookingDetails?.data


  return (
    <div className="">
      <h1 className="text-center text-[24px] py-4">Gamer Information</h1>

      {/* Profile Image */}
      <div className="flex justify-center mb-8 mt-6">
        <Image
          src="https://randomuser.me/api/portraits/women/2.jpg"
          alt="photo"
          className="object-cover rounded-full"
          width={150}
          height={150}
        />
      </div>

      {/* Information Grid */}
      <div className="mb-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="space-y-6 col-span-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Booking ID</span>
              <span className="text-white font-medium">{bookingDetails?.id}</span>
            </div>




            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Name</span>
              <span className="text-white font-medium">{bookingDetails?.user?.name}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Date</span>
              <span className="text-white font-medium">{bookingDetails?.booking_date}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Payment</span>
              <span className="text-white font-medium">${bookingDetails?.total}</span>
            </div>
          </div>



          {/* Right Column */}
          <div className="space-y-6 col-span-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Room Name</span>
              <span className="text-white font-medium">{bookingDetails?.room?.name}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">PC Number</span>
              <span className="text-white font-medium">PC {bookingDetails?.pc_no}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Starting Time</span>
              <span className="text-white font-medium">{bookingDetails?.starting_time}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Duration</span>
              <span className="text-white font-medium">{bookingDetails?.duration}</span>
            </div>
          </div>

        </div>
      </div>


      <div className='mb-4'>
        <Button
          onClick={() => setIsOpen(!open)}
          className="w-full mt-4 py-6 rounded-full cursor-pointer text-[#EB4335] font-semibold transition-all duration-200"
        >
          Close
        </Button>
      </div>
    </div>
  )
}

export default CancelTabModal
