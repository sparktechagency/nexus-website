"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Phone, MapPin } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { X } from "lucide-react"


type RoomFormValues = {
  roomImage: FileList
  fullName: string
  contactNumber: string
  location: string
}

export default function PersonalDetailsPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
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
    <div className="w-full mt-4 bg-[#211935] backdrop-blur-sm rounded-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        {/* Photo Upload Section */}
        <div className="space-y-2">
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

            >
              <div className="flex flex-col items-center space-y-3">
                <div className="w-30 h-30 bg-white border-2 border-dashed border-slate-600 rounded-xl flex items-center justify-center transition-colors cursor-pointer">
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M37.3334 13.0667H41.0667M54.1334 35.4423L42.9334 24.2496L31.7334 35.4423L16.8 16.7878L1.8667 35.4667M5.60003 1.8667H50.4C52.4619 1.8667 54.1334 3.53817 54.1334 5.60003V50.4C54.1334 52.4619 52.4619 54.1334 50.4 54.1334H5.60003C3.53817 54.1334 1.8667 52.4619 1.8667 50.4V5.60003C1.8667 3.53817 3.53817 1.8667 5.60003 1.8667Z" stroke="#5D5D5D" />
                  </svg>

                </div>
                <p className="text-white text-sm font-medium">Upload your photo</p>
              </div>
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



        {/* Form Fields */}
        <div className="space-y-6"> {/* Increased space between fields */}
          <div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Full Name"
                {...register("fullName", { required: "Full name is required" })}
                className={`rounded-lg border-none bg-[#5E5E5E33]/80 px-8 py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500 ${errors.fullName ? "mb-1" : "mb-0"
                  }`}
              />
            </div>
            {errors.fullName && (
              <p className="text-red-400 text-sm ml-8 mt-1">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="tel"
                placeholder="Contact number"
                {...register("contactNumber", {
                  required: "Contact number is required",

                })}
                className={`rounded-lg border-none bg-[#5E5E5E33]/80 px-8 py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500 ${errors.contactNumber ? "mb-1" : "mb-0"
                  }`}
              />
            </div>
            {errors.contactNumber && (
              <p className="text-red-400 text-sm ml-8 mt-1">{errors.contactNumber.message}</p>
            )}
          </div>

          <div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Location"
                {...register("location", { required: "Location is required" })}
                className={`rounded-lg border-none bg-[#5E5E5E33]/80 px-8 py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500 ${errors.location ? "mb-1" : "mb-0"
                  }`}
              />
            </div>
            {errors.location && (
              <p className="text-red-400 text-sm ml-8 mt-1">{errors.location.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="mt-8 w-full py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
          style={{
            background:
              "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
          }}
        >
          Update changes
        </Button>
      </form>
    </div>
  )
}