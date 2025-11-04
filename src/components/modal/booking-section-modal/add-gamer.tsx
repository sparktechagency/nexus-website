"use client"

import { Button } from '@/components/ui/button'
import { Dispatch, SetStateAction, } from 'react';

import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast';
import { useAddGamerApiMutation } from '@/redux/website/booking/bookingApi';
import CustomButtonLoader from '@/components/loader/CustomButtonLoader';

// Define the GamerInfo interface
interface GamerInfo {
  booking_date: string;
  starting_time: string;
  pc_no: number;
  duration: string;
  startRow: number; // Add this
  endRow: number; // Add this
}

interface AddGamerProps {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  roomId: number | string;
  gamerInfo: GamerInfo;
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
  pc_no: number
  duration: string
}



const AddGamer = ({ open, setIsOpen, roomId, gamerInfo }: AddGamerProps) => {


  const [addGamerApi, { isLoading }] = useAddGamerApiMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomFormValues>()








  const onSubmit = async (data: RoomFormValues) => {
    const formData = new FormData();
    formData.append("room_id", roomId.toString());
    formData.append("email", data.email);
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("booking_date", gamerInfo?.booking_date);
    formData.append("starting_time", (gamerInfo?.starting_time));
    formData.append("pc_no", gamerInfo?.pc_no.toString());
    formData.append("duration", data.duration);

    // formData.forEach((key, value)=> console.log(key, value))

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
        toast.error(errorValue?.data?.message);
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
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-8">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white text-sm">
                Full Name
              </Label>
              <Input
                id="name"
                type="name"
                placeholder="Write your full name"
                {...register("name")}
                className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6  text-white placeholder:text-gray-500 "
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>
            {/* phone number */}
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
              <Label htmlFor="duration" className="text-white text-sm">
                Duration
              </Label>

              <Input
                id="duration"
                type="text"
                readOnly
                value={gamerInfo?.duration}
                className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6 text-white placeholder:text-gray-500 readonly-input"
                {...register("duration")}
              />
            </div>

            <div className=' mt-8 pb-6'>
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