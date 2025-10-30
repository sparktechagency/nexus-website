
"use client"
import { Button } from '@/components/ui/button'
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import DatePicker from 'react-datepicker';
import toast from 'react-hot-toast';
import { useRescheduleBookingApiMutation } from '@/redux/website/booking/bookingApi';
import { useGetAllRoomApiQuery } from '@/redux/website/rooms/roomApi';

type RoomFormValues = {
  room_id: string | number
  booking_date: string
  starting_time: string
  pc_no: string
  duration: string

}

interface AddGamerProps {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  bookingId: string | number;
  roomId: string | number;
  durationValue: number;
}

interface ApiError {
  data: {
    message: string;
  };
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

const RescheduleUpdate = ({ open, setIsOpen, bookingId, roomId, durationValue }: AddGamerProps) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [selectedRoom, setSelectedRoom] = useState<string>("");

  const { data: getAllRoom } = useGetAllRoomApiQuery({ skip: true })
  const roomData: RoomProps[] = getAllRoom?.data?.data

  const pcNumber = roomData?.find(item => item.id === roomId)

  const [rescheduleBookingApi] = useRescheduleBookingApiMutation()

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

  // Set initial room selection when roomData loads
  useEffect(() => {
    if (roomData && roomData.length > 0) {
      setSelectedRoom(roomData[0].id.toString());
    }
  }, [roomData]);



  // TIME FORMAT (---AM/PM---) with leading zeros
  function convertTo12HourFormat(time: string): string {
    const [hours, minutes] = time.split(':');
    let hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'

    // Format hour and minutes with leading zeros
    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinutes = minutes.padStart(2, '0');

    return `${formattedHour}:${formattedMinutes} ${ampm}`;
  }


  const onSubmit = async (data: RoomFormValues) => {

    const formData = new FormData();
    formData.append("room_id", roomId.toString());
    formData.append("booking_date", data.booking_date);
    formData.append("starting_time", convertTo12HourFormat(data.starting_time));
    formData.append("pc_no", data.pc_no);
    formData.append("duration", data.duration);
    formData.append("_method", "PUT");

    try {
      const res = await rescheduleBookingApi({
        rescheduleInfo: formData,
        id: bookingId
      }).unwrap();

      console.log(res)
      if (res?.status === 'success') {
        toast.success(res?.message)
        setIsOpen(false);
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
    <div className='xl:p-8'>
      <h1 className="text-center text-[24px] py-4">Reschedule</h1>
      {/* <p>Duration: {gamerInfo.duration}</p> */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <p>Room of your gaming center:</p>
        <RadioGroup
          value={selectedRoom}
          onValueChange={(value) => setSelectedRoom(value)}
          className="flex flex-wrap"
        >
          {roomData?.map((room) => (
            <div key={room.id} className="flex items-center space-x-3">
              <RadioGroupItem
                value={room.id.toString()}
                id={room.id.toString()}
                className={`w-6 h-6 border-2 ${selectedRoom === room.id.toString()
                  ? "border-transparent bg-gradient-to-r from-[#6523E7] via-[#023CE3] to-[#6523E7]"
                  : "border-gray-400"
                  }`}
              />
              <Label
                htmlFor={room.id.toString()}
                className={`text-lg cursor-pointer ${selectedRoom === room.id.toString() ? "bg-gradient-to-r from-[#6523E7] via-[#023CE3] to-[#6523E7] bg-clip-text text-transparent" : "text-gray-300"}`}
              >
                {room.name}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="space-y-2">
          <Label htmlFor="date" className="text-white text-sm">
            Date
          </Label>
          <div className="space-y-2 w-full">

            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="bg-[#5E5E5E33] p-3 w-full block rounded-lg  focus:outline-none focus:border-none"
              wrapperClassName="w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="starting_time" className="text-white text-sm">
            Opening Time
          </Label>
          <div className="relative">
            <Input
              id="starting_time"
              type="time"
              placeholder="Enter the opening time(10.00 AM)"
              {...register("starting_time")}
              className="border-gray-700 text-white rounded-lg border-none bg-[#5E5E5E33]/80 py-6"
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
                  {Array.from({ length: durationValue }, (_, i) => {
                    const value = (i + 1).toString();
                    return (
                      <SelectItem
                        key={value}
                        value={value}
                        className="text-white hover:bg-gray-700"
                      >
                        {value} Hour{value !== "1" ? "s" : ""}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            )}
          />
          {errors.duration && <p className="text-red-400 text-xs mt-1">{errors.duration.message}</p>}
        </div>

        <div className='mt-8'>
          <Button
            type="submit"
            className="w-full py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
            style={{
              background: "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
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