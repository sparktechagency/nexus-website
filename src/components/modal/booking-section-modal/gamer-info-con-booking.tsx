import { Button } from "@/components/ui/button"
import Image from "next/image"
import CustomModal from "../customModal"
import { useState } from "react"
import BookingConfirmation from "./booking-confirmation"
import RescheduleUpdate from "./reschedule-update"

interface User {
  avatar: string;
  name: string;
}

interface Room {
  name: string;
}

interface BookingDetails {
  id: string;
  user: User;
  booking_date: string;
  total: number;
  room: Room;
  pc_no: string;
  starting_time: string;
  duration: number;
  status: string;
}

// Define the prop type for the component using the BookingDetails interface
interface GamerInfoConBookingProps {
  bookingDetails: BookingDetails;
  bookingId: string | number
  roomId: string | number
}


const GamerInfoConBooking = ({ bookingDetails, bookingId,roomId }: GamerInfoConBookingProps) => {
  const [bookingConfirmationModalOpen, setBookingConfirmationModalOpen] = useState(false)
  const [rescheduleUpdateModalOpen, setRescheduleUpdateModalOpen] = useState(false)



  // CONFIRM BOOKING
  const handleConfirm = () => {
    setBookingConfirmationModalOpen(true)
  }


  // RESCHEDULE 
  const handleReschedule = () => {
    setRescheduleUpdateModalOpen(true)
  }

  return (
    <div className="xl:p-8">
      <h1 className="text-center text-[24px] py-4">Gamer Information</h1>

      {/* Profile Image */}
      {bookingDetails?.user?.avatar &&  <div className="flex justify-center mb-8 mt-6">
        <Image
          src={bookingDetails?.user?.avatar}
          alt="photo"
          className="object-cover w-[100px] h-[100px] rounded-full"
          width={100}
          height={100}
        />
      </div>}
     

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

      <div className="flex justify-end mb-3">Booking Confirmation : <span className={`pl-1  ${bookingDetails?.status === 'Confirmed' ? 'text-green-500' : 'text-[#BF7D20]'}`}> {bookingDetails?.status}</span></div>
      <div className='mb-4'>
        <Button
          type="submit"
          onClick={handleConfirm}
          className="w-full py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
          style={{
            background:
              "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
          }}
        >
          Confirm Booking
        </Button>
        <Button
          onClick={handleReschedule}
          className="w-full mt-4 py-6 rounded-full cursor-pointer text-[#EB4335] font-semibold transition-all duration-200"
        >
          Reschedule
        </Button>
      </div>




      {/* modal component (up_COMING------> CONFIRM BOOKING) */}
      <CustomModal
        open={bookingConfirmationModalOpen}
        setIsOpen={setBookingConfirmationModalOpen}
        className={"p-4 max-h-[0vh]"}
        maxWidth={"md:!max-w-[30vw]"}
      >
        <BookingConfirmation
          open={bookingConfirmationModalOpen}
          setIsOpen={setBookingConfirmationModalOpen}
          bookingId={bookingId}
        />
      </CustomModal>



      {/* modal component(Details [STATUS----> UP_Coming ]) */}
      <CustomModal
        open={rescheduleUpdateModalOpen}
        setIsOpen={setRescheduleUpdateModalOpen}
        className={"p-4 max-h-[0vh]"}
        maxWidth={"md:!max-w-[50vw]"}
      >
        <RescheduleUpdate
          open={rescheduleUpdateModalOpen}
          setIsOpen={setRescheduleUpdateModalOpen}
          bookingId={bookingId}
          roomId={roomId}
          durationValue={bookingDetails?.duration}
        />
      </CustomModal>
    </div>
  )
}

export default GamerInfoConBooking
