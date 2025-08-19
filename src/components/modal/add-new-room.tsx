"use client"

import type React from "react"

import { useForm } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UploadCloud, X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

type RoomFormValues = {
  roomImage: FileList
  roomName: string
  pcNumber: number
  pricing: number
}

const AddNewRoom = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<RoomFormValues>()

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      // Update form value
      const fileList = event.target.files
      if (fileList) {
        setValue("roomImage", fileList)
      }
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    setSelectedFile(null)
    setValue("roomImage", {} as FileList)
  }

  const onSubmit = (data: RoomFormValues) => {
    console.log("Form Data:", data)
    console.log("Selected File:", selectedFile)

    // If you want to reset after submit
    // reset()
    // setImagePreview(null)
    // setSelectedFile(null)
  }

  return (
    <div className="text-[#fff]">
      <h1 className="text-center text-[24px] py-4">Add New Room</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-xl border-none shadow-lg space-y-6">
        {/* Room Image */}
        <div className="space-y-2">
          <Label htmlFor="roomImage" className="text-base font-medium">
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
              htmlFor="roomImage"
              className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg  bg-[#5E5E5E33]/80 text-gray-400 transition-colors hover:bg-[#5E5E5E33]/60"
            >
              <UploadCloud className="h-8 w-8" />
              <span className="mt-2 text-sm">Upload Image</span>
            </label>
          )}

          <input
            type="file"
            id="roomImage"
            className="hidden"
            accept="image/*"
            // {...register("roomImage", { required: "Room image is required" })}
            onChange={handleImageChange}
          />
          {errors.roomImage && <p className="text-red-500 text-sm">{errors.roomImage.message}</p>}
        </div>

        {/* Room Name */}
        <div className="space-y-2">
          <Label htmlFor="roomName" className="text-base font-medium">
            Room Name
          </Label>
          <Input
            id="roomName"
            placeholder="Enter the name of the room"
            className="rounded-lg border-none bg-[#5E5E5E33]/80 md:py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
            {...register("roomName", { required: "Room name is required" })}
          />
          {errors.roomName && <p className="text-red-500 text-sm">{errors.roomName.message}</p>}
        </div>

        {/* Number of PC & Pricing */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pcNumber" className="text-base font-medium">
              Number Of PC
            </Label>
            <Input
              type="number"
              id="pcNumber"
              placeholder="How many pc available here"
              className="rounded-lg border-none bg-[#5E5E5E33]/80 md:py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
              {...register("pcNumber", {
                required: "PC number is required",
                valueAsNumber: true,
              })}
            />
            {errors.pcNumber && <p className="text-red-500 text-sm">{errors.pcNumber.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pricing" className="text-base font-medium">
              Pricing
            </Label>
            <Input
              type="number"
              id="pricing"
              placeholder="Pricing per hour of each one seat"
              className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
              {...register("pricing", {
                required: "Pricing is required",
                valueAsNumber: true,
              })}
            />
            {errors.pricing && <p className="text-red-500 text-sm">{errors.pricing.message}</p>}
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
          Add
        </Button>
        <Button
          type="button"
          onClick={() => {
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
