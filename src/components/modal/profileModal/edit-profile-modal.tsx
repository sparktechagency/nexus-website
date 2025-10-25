

"use client"

import { useForm } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UploadCloud, X } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useEditProfileApiMutation, useGetProfileApiQuery } from "@/redux/website/profile/profileApi"
import toast from "react-hot-toast"
import CustomButtonLoader from "@/components/loader/CustomButtonLoader"

type FormValues = {
    gaming_zone: FileList
    gaming_zone_name: string
    opening_time: string
    closing_time: string
    address: string
    name: string
    phone: string
}

interface ApiError {
    data: {
        message: string;
    };
}

export default function EditProfileModal({ open, setIsOpen }: { open: boolean, setIsOpen: (open: boolean) => void }) {
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<FormValues>()

    const [editProfileApi, { isLoading }] = useEditProfileApiMutation()
    const { data: getProfile } = useGetProfileApiQuery({
        skip: true
    })
    const profileData = getProfile?.data

    // DEFAULT DATA SHOW
    useEffect(() => {
        if (profileData) {
            // Convert time to HH:mm format for correct display
            setValue("name", profileData?.name)
            setValue("gaming_zone_name", profileData?.gaming_zone_name)
            setValue("opening_time", convertTo24HourFormat(profileData?.opening_time)) // Convert to 24-hour
            setValue("closing_time", convertTo24HourFormat(profileData?.closing_time)) // Convert to 24-hour
            setValue("address", profileData?.address)
            setValue("phone", profileData?.phone)
            if (profileData?.gaming_zone) {
                setImagePreview(profileData?.gaming_zone)
            }
        }
    }, [profileData, setValue])


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setSelectedFile(file)
            setImagePreview(URL.createObjectURL(file))
            const fileList = event.target.files
            if (fileList) {
                setValue("gaming_zone", fileList)
            }
        }
    }

    const removeImage = () => {
        setImagePreview(null)
        setSelectedFile(null)
        setValue("gaming_zone", {} as FileList)
    }


    function convertTo24HourFormat(time: string): string {
        const [timePart, modifier] = time.split(' ')
        const [hours, minutes] = timePart.split(':').map(Number)

        const adjustedHours = modifier === "PM" && hours < 12 ? hours + 12 :
            modifier === "AM" && hours === 12 ? 0 : hours

        return `${adjustedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    }

    function convertTo12HourFormat(time: string): string {
        const [hours, minutes] = time.split(':')
        let hour = parseInt(hours)
        const ampm = hour >= 12 ? 'PM' : 'AM'
        hour = hour % 12
        hour = hour ? hour : 12 // the hour '0' should be '12'
        return `${hour}:${minutes} ${ampm}`
    }

    

    const onSubmit = async (data: FormValues) => {
        const formData = new FormData()
        if (selectedFile) {
            formData.append("gaming_zone", selectedFile)
        }
        formData.append("name", data.name)
        formData.append("gaming_zone_name", data.gaming_zone_name)
        formData.append("opening_time", convertTo12HourFormat(data.opening_time)) // Convert back to 12-hour for API
        formData.append("closing_time", convertTo12HourFormat(data.closing_time)) // Convert back to 12-hour for API
        formData.append("address", data.address)
        formData.append("phone", data.phone)


        try {
            const res = await editProfileApi(formData).unwrap()
            if (res?.status === 'success') {
                toast.success(res?.message)
                setIsOpen(!open)
                reset()
                setImagePreview(null)
                setSelectedFile(null)
                setValue("gaming_zone", {} as FileList)
            } else {
                toast.error(res?.messages)
            }
        } catch (errors) {
            const errorValue = errors as ApiError
            if (errorValue?.data?.message) {
                toast.error(errorValue?.data?.message) // Now you can safely access error.data.message
            }
        }
    }

    return (
        <div className="text-[#ffff] xl:p-8">
            <h1 className="text-center text-[24px] py-4 text-[#ffff]">Edit profile</h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full rounded-xl border-none p-6 shadow-lg"
            >
                <div className="space-y-6">
                    {/* Gaming Zone Upload */}
                    <div className="space-y-2">
                        <Label htmlFor="photo" className="text-base font-medium">
                            Gaming Zone
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
                                htmlFor="gaming_zone"
                                className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg  bg-[#5E5E5E33]/80 text-gray-400 transition-colors hover:bg-[#5E5E5E33]/60"
                            >
                                <UploadCloud className="h-8 w-8" />
                                <span className="mt-2 text-sm">Upload Image</span>
                            </label>
                        )}

                        <input
                            type="file"
                            id="gaming_zone"
                            className="hidden"
                            accept="image/*"
                            // {...register("gaming_zone", { required: "Room image is required" })}
                            onChange={handleImageChange}
                        />
                        {errors.gaming_zone && <p className="text-red-500 text-sm">{errors.gaming_zone.message}</p>}
                    </div>

                    {/* Gaming Zone Name */}
                    <div className="space-y-2">
                        <Label htmlFor="gaming-zone-name" className="text-base font-medium">
                            Gaming Zone Name
                        </Label>
                        <Input
                            id="gaming-zone-name"
                            placeholder="Enter the name of the room"
                            {...register("gaming_zone_name", { required: true })}
                            className="rounded-lg border-none bg-[#5E5E5E33]/80 md:py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                        />
                        {errors.gaming_zone_name && (
                            <span className="text-red-500 text-sm">Required</span>
                        )}
                    </div>

                    {/* Opening & Closing Time */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="opening_time" className="text-white text-sm">
                                Opening Time
                            </Label>
                            <div className="relative">
                                <Input
                                    id="opening_time"
                                    type="time"
                                    placeholder="Enter the opening time(10.00 AM)"
                                    {...register("opening_time")}
                                    className=" border-gray-700 text-white rounded-lg border-none bg-[#5E5E5E33]/80 py-6 [&::-webkit-calendar-picker-indicator]:invert"
                                />
                            </div>
                            {errors.opening_time && <p className="text-red-400 text-xs mt-1">{errors.opening_time.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="closing_time" className="text-white text-sm">
                                Closing Time
                            </Label>
                            <div className="relative">
                                <Input
                                    id="closing_time"
                                    type="time"
                                    placeholder="Enter the closing time(10.00 AM)"
                                    {...register("closing_time")}
                                    className=" border-gray-700 text-white rounded-lg border-none bg-[#5E5E5E33]/80 py-6 [&::-webkit-calendar-picker-indicator]:invert"
                                />
                            </div>
                            {errors.closing_time && <p className="text-red-400 text-xs mt-1">{errors.closing_time.message}</p>}
                        </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                        <Label htmlFor="location" className="text-base font-medium">
                            Location
                        </Label>
                        <Input
                            id="location"
                            placeholder="Enter the Location"
                            {...register("address", { required: true })}
                            className="rounded-lg border-none bg-[#5E5E5E33]/80 md:py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                        />
                        {errors.address && (
                            <span className="text-red-500 text-sm">Required</span>
                        )}
                    </div>

                    {/* Full Name & Contact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="full-name" className="text-base font-medium">
                                Your Full Name
                            </Label>
                            <Input
                                id="full-name"
                                placeholder="Enter your full name"
                                {...register("name", { required: true })}
                                className="rounded-lg border-none bg-[#5E5E5E33]/80 md:py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                            />
                            {errors.name && (
                                <span className="text-red-500 text-sm">Required</span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contact-number" className="text-base font-medium">
                                Contact Number
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                maxLength={11}
                                placeholder="Enter the contact number"
                                className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                                {...register("phone", {
                                    required: "phone number is required",
                                    pattern: {
                                        value: /^[0-9]{10,15}$/,
                                        message: "Please enter a valid phone number",
                                    },
                                })}
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm">{errors.phone.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Buttons */}
                    <Button
                        type="submit"
                        className="w-full md:py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
                        style={{
                            background:
                                "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
                        }}
                    >
                        {
                            isLoading ? <CustomButtonLoader /> : "Save Changes"
                        }
                    </Button>
                    <Button
                        type="button"
                        onClick={() => setIsOpen(!open)}
                        className="w-full md:py-6 rounded-full cursor-pointer text-[#EB4335] font-semibold transition-all duration-200"
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    )
}
