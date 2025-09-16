
"use client"

import type React from "react"

import { useForm } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UploadCloud, X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { useCreateRoomApiMutation } from "@/redux/website/rooms/roomApi"
import CustomButtonLoader from "../../loader/CustomButtonLoader"
import toast from "react-hot-toast"

type RoomFormValues = {
  photo: FileList
  name: string
  no_of_pc: number
  price: number
}

type RoomStateProps = {
  open : boolean,
  setIsOpen : (value:boolean)=>void
}

const AddNewRoom = ({open,setIsOpen}:RoomStateProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)


  const [createRoomApi, { isLoading }] = useCreateRoomApiMutation()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<RoomFormValues>()


  // image file get and preview show
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      const fileList = event.target.files;
      if (fileList) {
        setValue("photo", fileList);
      }
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    setSelectedFile(null)
    setValue("photo", {} as FileList)
  }

  const onSubmit = async (data: RoomFormValues) => {
    const formData = new FormData();
    if (selectedFile) {
      formData.append("photo", selectedFile)
    }
    formData.append("name", data.name)
    formData.append("no_of_pc", data.no_of_pc.toString())
    formData.append("price", data.price.toString())

    try {
      const res = await createRoomApi(formData).unwrap();
      console.log(res)
      if (res?.status === 'success') {
        toast.success(res?.message)
        setIsOpen(!open)
        reset()
        setImagePreview(null)
        setSelectedFile(null)
        setValue("photo", {} as FileList)
      } else {
        toast.error(res?.messages)
      }
    } catch (errors: any) {
      if (errors) {
        toast.error(errors.data?.message)
      }
    }
  }

  return (
    <div className="text-[#fff xl:p-8">
      <h1 className="text-center text-[24px] py-4">Add New Room</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-xl border-none shadow-lg space-y-6">
        {/* Room Image */}
        <div className="space-y-2">
          <Label htmlFor="photo" className="text-base font-medium">
            Room image
          </Label>

          {imagePreview ? (
            <div className="flex flex-col justify-center items-center">
              <div className="relative w-fit flex justify-end overflow-hidden border border-gray-800 rounded-lg ">
                <Image
                  src={imagePreview}
                  alt="Room preview"
                  width={100}
                  height={100}
                  className="h-[100px] w-[150px] object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="cursor-pointer absolute rounded-full bg-red-500 p-1 text-white hover:bg-red-600 transition-colors"
                >
                  <X className=" h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <label
              htmlFor="photo"
              className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg  bg-[#5E5E5E33]/80 text-gray-400 transition-colors hover:bg-[#5E5E5E33]/60"
            >
              <UploadCloud className="h-8 w-8" />
              <span className="mt-2 text-sm">Upload Image</span>
            </label>
          )}

          <input
            type="file"
            id="photo"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
          {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}
        </div>

        {/* Room Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-base font-medium">
            Room Name
          </Label>
          <Input
            id="name"
            placeholder="Enter the name of the room"
            className="rounded-lg border-none bg-[#5E5E5E33]/80 md:py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
            {...register("name", { required: "Room name is required" })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Number of PC & Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="no_of_pc" className="text-base font-medium">
              Number Of PC
            </Label>
            <Input
              type="number"
              step="any"  // Allow floating point numbers
              id="no_of_pc"
              placeholder="How many pc available here"
              className="rounded-lg border-none bg-[#5E5E5E33]/80 md:py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
              {...register("no_of_pc", {
                required: "PC number is required",
                valueAsNumber: true,
              })}
            />
            {errors.no_of_pc && <p className="text-red-500 text-sm">{errors.no_of_pc.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price" className="text-base font-medium">
              Pricing
            </Label>
            <Input
              type="number"
              step="any"  // Allow floating point numbers
              id="price"
              placeholder="Pricing per hour of each one seat"
              className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
              {...register("price", {
                required: "Pricing is required",
                valueAsNumber: true,
              })}
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>
        </div>

        {/* Buttons */}
        <Button
          type="submit"
          className="w-full md:py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
          style={{
            background: "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
          }}
        >
          {isLoading ? <CustomButtonLoader /> : 'Add'}
        </Button>
        <Button
          type="button"
          onClick={() => {
            setIsOpen(!open)
            reset()
            setImagePreview(null)
            setSelectedFile(null)
          }}
          className="w-full md:py-6 rounded-full cursor-pointer text-[#EB4335] font-semibold transition-all duration-200"
        >
          Cancel
        </Button>
      </form>
    </div>
  )
}

export default AddNewRoom
