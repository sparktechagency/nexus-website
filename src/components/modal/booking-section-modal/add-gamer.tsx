"use client"

import { Button } from '@/components/ui/button'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { useForm, Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast';
import { useAddGamerApiMutation } from '@/redux/website/booking/bookingApi';
import CustomButtonLoader from '@/components/loader/CustomButtonLoader';
import { useGetAllRoomApiQuery } from '@/redux/website/rooms/roomApi';


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

type RoomFormValues = {
  room_id: string | number
  email: string
  name: string
  phone: string
  booking_date: string
  starting_time: string
  pc_no: string
  duration: string
}
interface RoomProps {
  id: number;
  provider_id: number;
  name: string;
  photo: string;
  no_of_pc: number;
  price: number;
  created_at: string;
  updated_at: string;
}



const AddGamer = ({ open, setIsOpen, roomId }: AddGamerProps) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  const { data: getAllRoom } = useGetAllRoomApiQuery({ skip: true })
  const roomData: RoomProps[] = getAllRoom?.data?.data

  const [addGamerApi, { isLoading }] = useAddGamerApiMutation()


  const pcNumber = roomData?.find(item => item.id === roomId)



  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<RoomFormValues>()


  // Update form value when date changes
  useEffect(() => {
    if (startDate) {
      const formattedDate = startDate.toISOString().split('T')[0]; // YYYY-MM-DD format
      setValue("booking_date", formattedDate);
    }
  }, [startDate, setValue]);


  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const MAX = 420;

    const check = () => setIsScrollable(el.scrollHeight > MAX);
    check(); // initial

    // update on content resize (works for dynamic content)
    const ro = new ResizeObserver(check);
    ro.observe(el);

    // also update on window resize
    window.addEventListener("resize", check);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", check);
    };
  }, []);


  // TIME FORMATE (---AM/PM---)
  function convertTo12HourFormat(time: string): string {
    const [hours, minutes] = time.split(':');
    let hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    return `${hour}:${minutes} ${ampm}`;
  }

  const onSubmit = async (data: RoomFormValues) => {

    const formData = new FormData();
    formData.append("room_id", roomId.toString());
    formData.append("email", data.email);
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("booking_date", data.booking_date);
    formData.append("starting_time", convertTo12HourFormat(data.starting_time));
    formData.append("pc_no", data.pc_no);
    formData.append("duration", data.duration);

    try {
      const res = await addGamerApi(formData).unwrap();
      console.log(res)
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

  const handleCancel = () => {
    setIsOpen(!open)
  }



  return (
    <>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #6523E7, #023CE3, #6523E7);
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #5a20cc, #022fb8, #5a20cc);
        }
        /* Firefox fallback */
        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #6523E7 transparent; }
      `}</style>

      <div className='xl:p-6'>
        <h1 className="text-center text-[24px]">Add Gamer</h1>

        <div ref={contentRef}
          className={`${isScrollable ? "max-h-[620px] custom-scrollbar" : ""}`}>
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
            </div>



            <div className="space-y-2">
              <Label htmlFor="starting_time" className="text-white text-sm">
                Starting time
              </Label>
              <div className="relative">
                <Input
                  id="starting_time"
                  type="time"
                  placeholder="Enter the opening time(10.00 AM)"
                  {...register("starting_time")}
                  className=" border-gray-700 text-white rounded-lg border-none bg-[#5E5E5E33]/80 py-6 [&::-webkit-calendar-picker-indicator]:invert"
                />
              </div>
              {errors.starting_time && <p className="text-red-400 text-xs mt-1">{errors.starting_time.message}</p>}
            </div>

            {/* pc number */}
            <div className="space-y-2">
              <Label htmlFor="pc_no" className="text-white text-sm">
                PC Number
              </Label>
              <Controller
                name="pc_no"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full rounded-lg border-none bg-[#5E5E5E33]/80 py-6 text-white placeholder:text-gray-500">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {/* Dynamic array of PC numbers based on room data */}
                      {pcNumber && Array.from({ length: pcNumber.no_of_pc }, (_, index) => (
                        <SelectItem
                          key={index}
                          value={(index + 1).toString()}
                          className="text-white hover:bg-gray-700"
                        >
                          PC {index + 1}
                        </SelectItem>
                      ))}
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
                    <SelectTrigger className="w-full rounded-lg border-none bg-[#5E5E5E33]/80 py-6 text-white placeholder:text-gray-500">
                      <SelectValue placeholder="Select Duration" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="1" className="text-white hover:bg-gray-700">
                        1 Hour
                      </SelectItem>
                      <SelectItem value="2" className="text-white hover:bg-gray-700">
                        2 Hours
                      </SelectItem>
                      <SelectItem value="3" className="text-white hover:bg-gray-700">
                        3 Hours
                      </SelectItem>
                      <SelectItem value="4" className="text-white hover:bg-gray-700">
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
      </div>
    </>
  )
}

export default AddGamer