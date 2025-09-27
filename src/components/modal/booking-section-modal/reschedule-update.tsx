"use client"
import { Button } from '@/components/ui/button'
import { Dispatch, SetStateAction, useState } from 'react';

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import DatePicker from 'react-datepicker';
import toast from 'react-hot-toast';
import { useRescheduleBookingApiMutation } from '@/redux/website/booking/bookingApi';
import CustomButtonLoader from '@/components/loader/CustomButtonLoader';

const formSchema = z.object({
  booking_date: z.string().min(1, "Date is required"),
  starting_time: z.string().min(1, "Starting time is required"),
  pc_no: z.string().min(1, "Please select a PC number"),
  duration: z.string().min(1, "Please select a duration"),
})

type FormData = z.infer<typeof formSchema>

interface AddGamerProps {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  bookingId: string | number;
}

interface ApiError {
  data: {
    message: string;
  };
}

const RescheduleUpdate = ({ open, setIsOpen, bookingId }: AddGamerProps) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());


  const [rescheduleBookingApi] = useRescheduleBookingApiMutation()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      booking_date: "",
      starting_time: "",
      pc_no: "",
      duration: "",
    },
  })
  const [selectedValue, setSelectedValue] = useState("vip")


  const onSubmit = async (data: FormData) => {

    const formData = new FormData();
    formData.append("room_id", "2");
    formData.append("booking_date", "2025-08-19");
    formData.append("starting_time", "07:00 PM");
    formData.append("pc_no", "2");
    formData.append("duration", "2");
    formData.append("_method", "PUT");



    try {
      const res = await rescheduleBookingApi(formData).unwrap();
      console.log(res)
      if (res?.status === 'success') {
        toast.success(res?.message)

      } else {
        toast.error(res?.messages)
      }
    } catch (errors) {
      const errorValue = errors as ApiError;
      if (errorValue?.data?.message) {
        toast.error(errorValue?.data?.message);
      }
    }
  }

  const handleCancel = () => {
    reset()
    setIsOpen(!open)
  }


  return (
    <div className='xl:p-8'>
      <h1 className="text-center text-[24px] py-4">Reschedule</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <p>Room of your gaming center:</p>


        <RadioGroup
          value={selectedValue}
          onValueChange={setSelectedValue}
          className="flex items-center  space-x-16"
        >
          <div className="flex items-center space-x-3">
            <RadioGroupItem
              value="vip"
              id="vip"
              className={`w-6 h-6 border-2 ${selectedValue === "vip"
                ? "border-transparent bg-gradient-to-r from-[#6523E7] via-[#023CE3] to-[#6523E7]"
                : "border-gray-400"
                }`}
            />
            <Label
              htmlFor="vip"
              className={`text-lg cursor-pointer ${selectedValue === "vip" ? "bg-gradient-to-r from-[#6523E7] via-[#023CE3] to-[#6523E7] bg-clip-text text-transparent" : "text-gray-300"}`}
            >
              VIP
            </Label>
          </div>

          <div className="flex items-center space-x-3">
            <RadioGroupItem
              value="bootcamp"
              id="bootcamp"
              className={`w-6 h-6 border-2 ${selectedValue === "bootcamp"
                ? "border-transparent bg-gradient-to-r from-[#6523E7] via-[#023CE3] to-[#6523E7]"
                : "border-gray-400"
                }`}
            />
            <Label
              htmlFor="bootcamp"
              className={`text-lg cursor-pointer ${selectedValue === "bootcamp" ? "bg-gradient-to-r from-[#6523E7] via-[#023CE3] to-[#6523E7] bg-clip-text text-transparent" : "text-gray-300"}`}
            >
              Bootcamp
            </Label>
          </div>

          <div className="flex items-center space-x-3">
            <RadioGroupItem
              value="ps5"
              id="ps5"
              className={`w-6 h-6 border-2 ${selectedValue === "ps5"
                ? "border-transparent bg-gradient-to-r from-[#6523E7] via-[#023CE3] to-[#6523E7]"
                : "border-gray-400"
                }`}
            />
            <Label
              htmlFor="ps5"
              className={`text-lg cursor-pointer ${selectedValue === "ps5" ? "bg-gradient-to-r from-[#6523E7] via-[#023CE3] to-[#6523E7] bg-clip-text text-transparent" : "text-gray-300"}`}
            >
              PS5
            </Label>
          </div>
        </RadioGroup>



        <div className="space-y-2">
          <Label htmlFor="date" className="text-white text-sm">
            Date
          </Label>
          <div className="space-y-2 w-full">
            <Label htmlFor="validate_date" className="text-base font-medium">Validate Date</Label>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="bg-[#5E5E5E33] p-3 w-full block rounded-lg  focus:outline-none focus:border-none"
              wrapperClassName="w-full"
            />
          </div>
          {errors.booking_date && <p className="text-red-400 text-xs mt-1">{errors.booking_date.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="starting_time" className="text-white text-sm">
            Opening Time
          </Label>
          <div className="relative">
            <Input
              id="starting_time"
              type="tex"
              placeholder="Enter the opening time(10.00 AM)"
              {...register("starting_time")}
              className=" border-gray-700 text-white rounded-lg border-none bg-[#5E5E5E33]/80 py-6 [&::-webkit-calendar-picker-indicator]:invert"
            />
          </div>
          {errors.starting_time && <p className="text-red-400 text-xs mt-1">{errors.starting_time.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="pc_no" className="text-white text-sm">
            PC Number
          </Label>
          <Controller
            name="pc_no"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full rounded-lg border-none bg-[#5E5E5E33]/80 py-6  text-white placeholder:text-gray-500 ">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="pc1" className="text-white hover:bg-gray-700">
                    PC 1
                  </SelectItem>
                  <SelectItem value="pc2" className="text-white hover:bg-gray-700">
                    PC 2
                  </SelectItem>
                  <SelectItem value="pc3" className="text-white hover:bg-gray-700">
                    PC 3
                  </SelectItem>
                  <SelectItem value="pc4" className="text-white hover:bg-gray-700">
                    PC 4
                  </SelectItem>
                  <SelectItem value="pc5" className="text-white hover:bg-gray-700">
                    PC 5
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.pc_no && <p className="text-red-400 text-xs mt-1">{errors.pc_no.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration" className="text-white text-sm">
            Duration
          </Label>
          <Controller
            name="duration"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full rounded-lg border-none bg-[#5E5E5E33]/80 py-6  text-white placeholder:text-gray-500">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="1h" className="text-white hover:bg-gray-700">
                    1 Hour
                  </SelectItem>
                  <SelectItem value="2h" className="text-white hover:bg-gray-700">
                    2 Hours
                  </SelectItem>
                  <SelectItem value="3h" className="text-white hover:bg-gray-700">
                    3 Hours
                  </SelectItem>
                  <SelectItem value="4h" className="text-white hover:bg-gray-700">
                    4 Hours
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.duration && <p className="text-red-400 text-xs mt-1">{errors.duration.message}</p>}
        </div>

        <div className=' mt-8'>
          <Button
            type="submit"
            className="w-full py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
            style={{
              background:
                "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
            }}
          >
            Update
          </Button>
          <Button
            type="button"
            onClick={handleCancel}
            className="w-full mt-4 py-6 rounded-full cursor-pointer text-[#EB4335] font-semibold transition-all duration-200"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

export default RescheduleUpdate