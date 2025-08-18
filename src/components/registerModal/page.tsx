import { useForm } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UploadCloud, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

type RoomFormValues = {
    roomImage: FileList
    gamingZoneName: string
    contactNumber: string
    openingTime: string
    closingTime: string
    location: string
}

export default function RegisterModal() {
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
        <div className="">
            <h1 className="text-center text-[24px] py-4">Register a Gaming Zone</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full rounded-xl border-none p-6 shadow-lg">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="gaming-zone" className="text-base font-medium">
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

                        <div className="space-y-2">
                            <Label htmlFor="gaming-zone-name" className="text-base font-medium">
                                Gaming Zone Name
                            </Label>
                            <Input
                                id="gaming-zone-name"
                                placeholder="Enter the name of the room"
                                className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                                {...register("gamingZoneName", { required: "Gaming zone name is required" })}
                            />
                            {errors.gamingZoneName && (
                                <p className="text-red-500 text-sm">{errors.gamingZoneName.message}</p>
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
                                className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                                {...register("contactNumber", {
                                    required: "Contact number is required",
                                    pattern: {
                                        value: /^[0-9]{10,15}$/,
                                        message: "Please enter a valid phone number",
                                    },
                                })}
                            />
                            {errors.contactNumber && (
                                <p className="text-red-500 text-sm">{errors.contactNumber.message}</p>
                            )}
                        </div>

                         <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="openingTime" className="text-white text-sm">
                                Opening Time
                            </Label>
                            <div className="relative">
                                <Input
                                    id="openingTime"
                                    type="time"
                                    {...register("openingTime")}
                                    className=" border-gray-700 text-white rounded-lg border-none bg-[#5E5E5E33]/80 py-6 [&::-webkit-calendar-picker-indicator]:invert"
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
                                    className=" border-gray-700 text-white rounded-lg border-none bg-[#5E5E5E33]/80 py-6 [&::-webkit-calendar-picker-indicator]:invert"
                                />
                            </div>
                            {errors.closingTime && <p className="text-red-400 text-xs mt-1">{errors.closingTime.message}</p>}
                        </div>
                    </div>

                        <div className="space-y-2">
                            <Label htmlFor="location" className="text-base font-medium">
                                Location
                            </Label>
                            <Input
                                id="location"
                                placeholder="Enter the Location"
                                className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                                {...register("location", { required: "Location is required" })}
                            />
                            {errors.location && (
                                <p className="text-red-500 text-sm">{errors.location.message}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
                            style={{
                                background:
                                    "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
                            }}
                        >
                            <Link href="/home">
                                Register
                            </Link>
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}