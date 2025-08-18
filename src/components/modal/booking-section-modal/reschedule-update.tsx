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

const formSchema = z.object({
  date: z.string().min(1, "Date is required"),
  startingTime: z.string().min(1, "Starting time is required"),
  pcNumber: z.string().min(1, "Please select a PC number"),
  duration: z.string().min(1, "Please select a duration"),
})

type FormData = z.infer<typeof formSchema>

interface AddGamerProps {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const RescheduleUpdate = ({ open, setIsOpen }: AddGamerProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      startingTime: "",
      pcNumber: "",
      duration: "",
    },
  })
  const [selectedValue, setSelectedValue] = useState("vip")


  const onSubmit = async (data: FormData) => {
    console.log("Form submitted:", data)

    setIsOpen(!open)
    reset()
  }

  const handleCancel = () => {
    reset()
    setIsOpen(!open)
  }


  return (
    <div>
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
          <div className="relative">
            <Input
              id="date"
              type="date"
              {...register("date")}
              className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6 border-gray-700 text-white  [&::-webkit-calendar-picker-indicator]:invert"
            />
          </div>
          {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="startingTime" className="text-white text-sm">
            Starting time
          </Label>
          <div className="relative">
            <Input
              id="startingTime"
              type="time"
              {...register("startingTime")}
              className=" border-gray-700 text-white rounded-lg border-none bg-[#5E5E5E33]/80 py-6 [&::-webkit-calendar-picker-indicator]:invert"
            />
          </div>
          {errors.startingTime && <p className="text-red-400 text-xs mt-1">{errors.startingTime.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="pcNumber" className="text-white text-sm">
            PC Number
          </Label>
          <Controller
            name="pcNumber"
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
          {errors.pcNumber && <p className="text-red-400 text-xs mt-1">{errors.pcNumber.message}</p>}
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