"use client"

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dispatch, SetStateAction, useState } from "react"


interface BookingConfirmProps {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const BookingConfirmation = ({ open, setIsOpen }: BookingConfirmProps) => {
  const [selectedValue, setSelectedValue] = useState("")


  return (
    <div>

      <p className="py-8 text-2xl font-semibold">Booking confirmation</p>
      <RadioGroup
        value={selectedValue}
        onValueChange={setSelectedValue}
        className="flex flex-col "
      >
        <div className="flex items-center space-x-3">
          <RadioGroupItem
            value="complete"
            id="complete"
            className={`w-6 h-6 border-2 ${selectedValue === "complete"
              ? "border-transparent bg-gradient-to-r from-[#6523E7] via-[#023CE3] to-[#6523E7]"
              : "border-gray-400"
              }`}
          />
          <Label
            htmlFor="complete"
            className={`text-lg cursor-pointer ${selectedValue === "complete" ? "bg-gradient-to-r from-[#6523E7] via-[#023CE3] to-[#6523E7] bg-clip-text text-transparent" : "text-gray-300"}`}
          >
            Complete
          </Label>
        </div>

        <div className="flex items-center space-x-3">
          <RadioGroupItem
            value="cancelled"
            id="cancelled"
            className={`w-6 h-6 border-2 ${selectedValue === "cancelled"
              ? "border-transparent bg-gradient-to-r from-[#6523E7] via-[#023CE3] to-[#6523E7]"
              : "border-gray-400"
              }`}
          />
          <Label
            htmlFor="cancelled"
            className={`text-lg cursor-pointer ${selectedValue === "cancelled" ? "bg-gradient-to-r from-[#6523E7] via-[#023CE3] to-[#6523E7] bg-clip-text text-transparent" : "text-gray-300"}`}
          >
            Cancelled
          </Label>
        </div>




      </RadioGroup>

      <div className="flex justify-center items-center gap-4 mt-16">
        <Button
          onClick={() => setIsOpen(!open)}
          className="w-[40%] bg-[#151515] hover:bg-[#151515] hover:opacity-90  text-red-500 flex justify-center items-center rounded-full text-center py-6 text-[16px] cursor-pointer">
          Cancel
        </Button>

        <Button
          onClick={() => setIsOpen(!open)}
          className="w-[40%] py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
          style={{
            background:
              "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
          }}
        >
          Apply
        </Button>
      </div>
    </div>
  )
}

export default BookingConfirmation
