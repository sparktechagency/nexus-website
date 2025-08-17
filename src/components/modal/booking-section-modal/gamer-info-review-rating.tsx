
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Dispatch, SetStateAction } from "react";

interface RatingProps {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}


const GamerInfoReviewRating = ({ open, setIsOpen }: RatingProps) => {
  return (
    <div className="">
      <h1 className="text-center text-[24px] py-4">Gamer Information</h1>

      {/* Profile Image */}
      <div className="flex justify-center mb-8 mt-6">
        <Image
          src="https://randomuser.me/api/portraits/men/23.jpg"
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
          <div className="space-y-4 col-span-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Booking ID</span>
              <span className="text-white font-medium">564235</span>
            </div>




            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Name</span>
              <span className="text-white font-medium">Undertaker Bruce</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Date</span>
              <span className="text-white font-medium">08/25/2025</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Payment</span>
              <span className="text-white font-medium">$532.00</span>
            </div>
          </div>



          {/* Right Column */}
          <div className="space-y-4 col-span-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Room Name</span>
              <span className="text-white font-medium">VIP</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">PC Number</span>
              <span className="text-white font-medium">PC 1</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Starting Time</span>
              <span className="text-white font-medium">09:00 AM</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Duration</span>
              <span className="text-white font-medium">2 Hours</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-bold text-xl">Rating</h2>
        <div className="flex items-center space-x-3 py-4">
          {[...Array(5)].map((_, index) => (
            <svg key={index} width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.625 4.4L8.425 0.775C8.625 0.508333 8.8625 0.3125 9.1375 0.1875C9.4125 0.0625 9.7 0 10 0C10.3 0 10.5875 0.0625 10.8625 0.1875C11.1375 0.3125 11.375 0.508333 11.575 0.775L14.375 4.4L18.625 5.825C19.0583 5.95833 19.4 6.20417 19.65 6.5625C19.9 6.92083 20.025 7.31667 20.025 7.75C20.025 7.95 19.9958 8.15 19.9375 8.35C19.8792 8.55 19.7833 8.74167 19.65 8.925L16.9 12.825L17 16.925C17.0167 17.5083 16.825 18 16.425 18.4C16.025 18.8 15.5583 19 15.025 19C14.9917 19 14.8083 18.975 14.475 18.925L10 17.675L5.525 18.925C5.44167 18.9583 5.35 18.9792 5.25 18.9875C5.15 18.9958 5.05833 19 4.975 19C4.44167 19 3.975 18.8 3.575 18.4C3.175 18 2.98333 17.5083 3 16.925L3.1 12.8L0.375 8.925C0.241667 8.74167 0.145833 8.55 0.0875 8.35C0.0291667 8.15 0 7.95 0 7.75C0 7.33333 0.120833 6.94583 0.3625 6.5875C0.604167 6.22917 0.941667 5.975 1.375 5.825L5.625 4.4Z" fill="#EF9D3A" />
            </svg>

          ))}
        </div>
      </div>



      <div className="mt-8">
        <h2 className="font-bold text-xl">Review</h2>
        <p className="text-sm text-gray-400">I recently visited this gaming zone and was really impressed! The PCs are high-performance, the chairs are super comfortable, and the ambiance is perfect for long sessions. They offer a great variety of games—from FPS to racing and strategy. The staff were friendly and helpful throughout.?Highly recommended for both casual and serious gamers!</p>
      </div>




      <div className='my-4'>
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

export default GamerInfoReviewRating
