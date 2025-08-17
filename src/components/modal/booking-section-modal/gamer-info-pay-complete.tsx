
import { Button } from "@/components/ui/button"
import Image from "next/image"



const GamerInfoPayComplete = () => {


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
          <div className="space-y-6 col-span-6">
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

      <Button
        type="submit"
        className="w-full mt-8 mb-4 py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
        style={{
          background:
            "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
        }}
      >
        Payment Complete
      </Button>
    </div>
  )
}
export default GamerInfoPayComplete;