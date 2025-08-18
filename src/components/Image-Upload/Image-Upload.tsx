
"use client"

import type React from "react"

import { useForm } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { UploadCloud, X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

type RoomFormValues = {
  roomImage: FileList
  roomName: string
  pcNumber: number
  pricing: number
}

const ImageUpload = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const {
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
    reset()
    setImagePreview(null)
    setSelectedFile(null)
  }

  return (
    <div className="text-[#fff]">

      <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-xl border-none shadow-lg space-y-6">
        {/* Room Image */}
        <div className="space-y-2">
          <Label htmlFor="roomImage" className="text-base font-medium">
            Room image
          </Label>

          {imagePreview ? (
            <div className="relative">
              <div className="relative  w-full overflow-hidden rounded-lg border border-gray-700">
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
                  className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-2">Selected: {selectedFile?.name}</p>
            </div>
          ) : (
            <label
              htmlFor="roomImage"
              className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-700 bg-[#5E5E5E33]/80 text-gray-400 transition-colors hover:bg-[#5E5E5E33]/60"
            >
              <UploadCloud className="h-8 w-8" />
              <span className="mt-2 text-sm">Upload Room Image</span>
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


      </form>
    </div>
  )
}

export default ImageUpload
