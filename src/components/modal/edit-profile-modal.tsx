"use client"

import { useForm } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UploadCloud,X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

type FormValues = {
    roomImage: FileList
    gamingZoneName: string
    openingTime: string
    closingTime: string
    location: string
    fullName: string
    contactNumber: string
}

export default function EditProfileModal() {
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<FormValues>()

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



    const onSubmit = (data: FormValues) => {
        console.log("Form Data:", data)
        console.log("Selected File:", selectedFile)
        reset()
        setImagePreview(null)
        setSelectedFile(null)
    }

    return (
        <div className="text-[#ffff]">
            <h1 className="text-center text-[24px] py-4 text-[#ffff]">Edit profile</h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full rounded-xl border-none p-6 shadow-lg"
            >
                <div className="space-y-6">
                    {/* Gaming Zone Upload */}
                    <div className="space-y-2">
                        <Label htmlFor="roomImage" className="text-base font-medium">
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

                    {/* Gaming Zone Name */}
                    <div className="space-y-2">
                        <Label htmlFor="gaming-zone-name" className="text-base font-medium">
                            Gaming Zone Name
                        </Label>
                        <Input
                            id="gaming-zone-name"
                            placeholder="Enter the name of the room"
                            {...register("gamingZoneName", { required: true })}
                            className="rounded-lg border-none bg-[#5E5E5E33]/80 md:py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                        />
                        {errors.gamingZoneName && (
                            <span className="text-red-500 text-sm">Required</span>
                        )}
                    </div>

                    {/* Opening & Closing Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="openingTime" className="text-white text-sm">
                                Opening Time
                            </Label>
                            <div className="relative">
                                <Input
                                    id="openingTime"
                                    type="time"
                                    {...register("openingTime")}
                                    className=" border-gray-700 text-white rounded-lg border-none bg-[#5E5E5E33]/80 md:py-6 [&::-webkit-calendar-picker-indicator]:invert"
                                />
                            </div>
                            {errors.openingTime && <p className="text-red-400 text-xs mt-1">{errors.openingTime.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="closingTime" className="text-white text-sm">
                                Closing Time
                            </Label>
                            <div className="relative">
                                <Input
                                    id="closingTime"
                                    type="time"
                                    {...register("closingTime")}
                                    className=" border-gray-700 text-white rounded-lg border-none bg-[#5E5E5E33]/80 md:py-6 [&::-webkit-calendar-picker-indicator]:invert"
                                />
                            </div>
                            {errors.closingTime && <p className="text-red-400 text-xs mt-1">{errors.closingTime.message}</p>}
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
                            {...register("location", { required: true })}
                            className="rounded-lg border-none bg-[#5E5E5E33]/80 md:py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                        />
                        {errors.location && (
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
                                {...register("fullName", { required: true })}
                                className="rounded-lg border-none bg-[#5E5E5E33]/80 md:py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                            />
                            {errors.fullName && (
                                <span className="text-red-500 text-sm">Required</span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contact-number" className="text-base font-medium">
                                Contact Number
                            </Label>
                            <Input
                                id="contact-number"
                                type="tel"
                                placeholder="Enter the contact number"
                                {...register("contactNumber", { required: true })}
                                className="rounded-lg border-none bg-[#5E5E5E33]/80 md:py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                            />
                            {errors.contactNumber && (
                                <span className="text-red-500 text-sm">Required</span>
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
                        Save Changes
                    </Button>
                    <Button
                        type="button"
                        onClick={() => reset()}
                        className="w-full md:py-6 rounded-full cursor-pointer text-[#EB4335] font-semibold transition-all duration-200"
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    )
}