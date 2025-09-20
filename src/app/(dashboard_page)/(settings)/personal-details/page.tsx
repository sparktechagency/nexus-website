"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Phone, MapPin } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { useEditProfileApiMutation, useEditSinglePhotoProfileApiMutation, useGetProfileApiQuery } from "@/redux/website/profile/profileApi"
import CustomButtonLoaderTwo from "@/components/loader/CustomButtonLoaderTwo"
import toast from "react-hot-toast"
import CustomButtonLoader from "@/components/loader/CustomButtonLoader"



type RoomFormValues = {
  avatar: FileList
  roomImage: FileList
  name: string
  phone: number
  address: string

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



  // get profile 
  const { data: getProfile, isLoading, refetch } = useGetProfileApiQuery(null)
  const profileData = getProfile?.data

  const [editSinglePhotoProfileApi,] = useEditSinglePhotoProfileApiMutation()
  const [editProfileApi,{ isLoading: UpdateLoading } ] = useEditProfileApiMutation()

  const [profileImage, setProfileImage] = useState(profileData?.avatar || "http://103.186.20.114:8011/uploads/users/default_avatar.png")

  useEffect(() => {
    if (profileData) {
      setValue("name", profileData?.name);
      setValue("phone", profileData?.phone);
      setValue("address", profileData?.address);
    }
  }, [profileData, setValue])


  useEffect(() => {
    if (profileData?.avatar) {
      setProfileImage(profileData.avatar)
    }
  }, [profileData?.avatar])


  const handleImageChange = async (e: any) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }


    const formData = new FormData();
    if (file) {
      formData.append("photo", file)
    }

    // SINGLE IMAGE CHANGES
    try {
      const res = await editSinglePhotoProfileApi(formData).unwrap();
      if (res?.status === 'success') {
        toast.success(res?.message)
        await refetch()
        setProfileImage(`${res.data?.avatar || profileData?.avatar}?t=${new Date().getTime()}`)
      } else {
        toast.error(res?.messages)
      }
    } catch (errors: any) {
      if (errors) {
        toast.error(errors.data?.message)
      }
    }

  }

  const removeImage = () => {
    setImagePreview(null)
    setSelectedFile(null)
    setValue("avatar", {} as FileList)
  }





  const onSubmit = async(data: RoomFormValues) => {
    const formData = new FormData();

    formData.append("name", data?.name);
    formData.append("phone", data?.phone.toString());
    formData.append("address", data?.address);

    try {
      const res = await editProfileApi(formData).unwrap();

      if (res?.status === 'success') {
        toast.success(res?.message)

      } else {
        toast.error(res?.messages)
      }
    } catch (errors: any) {
      if (errors) {
        toast.error(errors.data?.message)
      }
    }


  }

  if (isLoading) {
    return <div className="h-[500px] flex justify-center items-center">
      <CustomButtonLoaderTwo />
    </div>
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
                <div className="w-30 h-30 border-slate-600 rounded-xl flex items-center justify-center transition-colors cursor-pointer">
                  {
                    profileImage && <Image
                      src={profileImage}
                      alt="photo"
                      className="w-[100px] h-[100px] object-cover rounded-full"
                      width={100}
                      height={100}
                    />
                  }

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
                {...register("name", { required: "Full name is required" })}
                className={`rounded-lg border-none bg-[#5E5E5E33]/80 px-8 py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500 ${errors.name ? "mb-1" : "mb-0"
                  }`}
              />
            </div>
            {errors.name && (
              <p className="text-red-400 text-sm ml-8 mt-1">{errors.name.message}</p>
            )}
          </div>






          <div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                id="phone"
                type="tel"  // Change input type to text
                maxLength={11} // Now maxLength will work
                placeholder="Contact number"
                {...register("phone", {
                  required: "phone is required",
                  pattern: {
                    value: /^[0-9]{10,11}$/,  // Adjust the pattern as necessary
                    message: "Please enter a valid phone number",
                  },
                })}
                className={`rounded-lg border-none bg-[#5E5E5E33]/80 px-8 py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500 ${errors.phone ? "mb-1" : "mb-0"}`}
              />
            </div>
            {errors.phone && (
              <p className="text-red-400 text-sm ml-8 mt-1">{errors.phone.message}</p>
            )}
          </div>





          <div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Address"
                {...register("address", { required: "address is required" })}
                className={`rounded-lg border-none bg-[#5E5E5E33]/80 px-8 py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500 ${errors.address ? "mb-1" : "mb-0"
                  }`}
              />
            </div>
            {errors.address && (
              <p className="text-red-400 text-sm ml-8 mt-1">{errors.address.message}</p>
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
          {
            UpdateLoading ? <CustomButtonLoader /> : "Update changes"
          }
        </Button>
      </form>
    </div>
  )
}