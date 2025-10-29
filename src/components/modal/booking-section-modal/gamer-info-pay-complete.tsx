"use client"

import { Dispatch, SetStateAction } from "react";
import CustomButtonLoader from "@/components/loader/CustomButtonLoader";
import { Button } from "@/components/ui/button"
import { useGetBookingDetailsApiQuery, useMarkAsPaymentApiMutation } from "@/redux/website/booking/bookingApi";
import Image from "next/image"
import toast from "react-hot-toast";

interface GamerInfoPayCompleteProps {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  bookingId: string | number
}
interface ApiError {
  data: {
    message: string;
  };
}


const GamerInfoPayComplete = ({ open, setIsOpen, bookingId }: GamerInfoPayCompleteProps) => {


  // BOOKING DETAILS API
  const { data: getBookingDetails, isLoading } = useGetBookingDetailsApiQuery(bookingId);
  const bookingDetails = getBookingDetails?.data

  const [markAsPaymentApi] = useMarkAsPaymentApiMutation()



  const handleBookingComplete = async () => {
    try {
      const res = await markAsPaymentApi(bookingId).unwrap();

      if (res?.status === 'success') {
        toast.success(res?.message)
        setIsOpen(!open)

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




  return (

    <div className="">
      <h1 className="text-center text-[24px] py-4">Gamer Information</h1>

      {/* Profile Image */}
      {
        bookingDetails?.user?.avatar && <div className="flex justify-center mb-8 mt-6">
        <Image
          src={bookingDetails?.user?.avatar}
          alt="photo"
          className="object-cover rounded-full"
          width={150}
          height={150}
        />
      </div>
      }
      

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

      <Button
        type="submit"
        onClick={handleBookingComplete}
        className="w-full mt-8 mb-4 py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
        style={{
          background:
            "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
        }}
      >
        {
          isLoading ? <CustomButtonLoader /> : "Payment Complete"
        }
      </Button>
    </div>
  )
}
export default GamerInfoPayComplete;