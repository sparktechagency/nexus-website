"use client"

import { Button } from '@/components/ui/button'
import { Dispatch, SetStateAction, useState } from 'react';

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast';
import { useAddGamerApiMutation } from '@/redux/website/booking/bookingApi';
import CustomButtonLoader from '@/components/loader/CustomButtonLoader';

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(1, "Please enter a name"),
  phone: z.string().min(1, "Contact number is required"),
  booking_date: z.string().min(1, "Date is required"),
  starting_time: z.string().min(1, "Starting time is required"),
  pc_no: z.string().min(1, "Please select a PC number"),
  duration: z.string().min(1, "Please select a duration"),
})

type FormData = z.infer<typeof formSchema>

interface AddGamerProps {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  roomId: number | string;
}

interface ApiError {
  data: {
    message: string;
  };
}

const AddGamer = ({ open, setIsOpen, roomId }: AddGamerProps) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());


  const [addGamerApi, { isLoading }] = useAddGamerApiMutation()


  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      booking_date: "",
      starting_time: "",
      pc_no: "",
      duration: "",
    },
  })

  const onSubmit = async (values: FormData) => {
   
    console.log('clck')

    // const dateStr = startDate || new Date()
    // const date = new Date(dateStr);
    // const formattedDate = date.toISOString().split('T')[0];
    // console.log(formattedDate)

    // const formData = new FormData();
    // formData.append("room_id", roomId.toString());
    // formData.append("email", data.email);
    // formData.append("name", data.name);
    // formData.append("phone", data.phone);
    // formData.append("booking_date", data.booking_date);
    // formData.append("starting_time", data.starting_time);
    // formData.append("pc_no", data.pc_no);
    // formData.append("duration", data.duration);


    // formData.forEach((value, key) => {
    //   console.log(key, value);
    // });




    // try {
    //   const res = await addGamerApi(formData).unwrap();
    //   console.log(res)
    //   if (res?.status === 'success') {
    //     toast.success(res?.message)
    //     setIsOpen(!open)
    //   } else {
    //     toast.error(res?.messages)
    //   }
    // } catch (errors) {
    //   const errorValue = errors as ApiError;
    //   if (errorValue?.data?.message) {
    //     toast.error(errorValue?.data?.message); // Now you can safely access error.data.message
    //   }
    // }



    // setIsOpen(!open)
    // reset()
  }

  const handleCancel = () => {
    reset()
    setIsOpen(!open)
  }

  return (
    <div className='xl:p-6'>
      <h1 className="text-center text-[24px]">Add Gamer</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white text-sm">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter the name of the room"
            {...register("email")}
            className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6  text-white placeholder:text-gray-500 "
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>


        <div className="space-y-2">
          <Label htmlFor="name" className="text-white text-sm">
            Name
          </Label>
          <Input
            id="name"
            type="name"
            placeholder="Enter the name of the room"
            {...register("name")}
            className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6  text-white placeholder:text-gray-500 "
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-white text-sm">
            Contact Number
          </Label>
          <Input
            id="phone"
            type="number"
            placeholder="Enter the contact number"
            maxLength={11}
            onInput={(e) => {
              const target = e.target as HTMLInputElement
              if (target.value.length > 11) {
                target.value = target.value.slice(0, 11)
              }
            }}
            {...register("phone")}
            className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6 text-white placeholder:text-gray-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
        </div>




        <div className="space-y-2 w-full">
          <Label htmlFor="booking_date" className="text-base font-medium">Validate Date</Label>
          <DatePicker

            selected={startDate} onChange={(date) => setStartDate(date)} className="bg-[#5E5E5E33]/80 p-3 w-full block rounded-lg  focus:outline-none focus:border-none"
            wrapperClassName="w-full"
          />
        </div>



        <div className="space-y-2">
          <Label htmlFor="starting_time" className="text-white text-sm">
            Starting time
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
            {isLoading ? <CustomButtonLoader /> : "Add"}
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

export default AddGamer