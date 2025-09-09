import { useForm } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UploadCloud, X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { useRegisterApiMutation } from "@/redux/authontication/authApi"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import CustomButtonLoader from "../loader/CustomButtonLoader"


type RoomFormValues = {
    roomImage: FileList
    gaming_zone_name: string
    phone: string
    opening_time: string
    closing_time: string
    address: string
}

interface RegisterFormInputs {
    name: string
    email: string
    password: string
    retype_password: string
    terms: boolean
}

export default function RegisterModal({ registerData }: { registerData: RegisterFormInputs }) {
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [collectPhoto, setCollectPhoto] = useState<File | null>(null)
    const router = useRouter()

    const [registerApi, { isLoading }] = useRegisterApiMutation()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<RoomFormValues>()


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
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
        setCollectPhoto(file ?? null);
    }


    const removeImage = () => {
        setImagePreview(null)
        setValue("roomImage", {} as FileList)
    }

    const onSubmit = async (data: RoomFormValues) => {

        const formData = new FormData();

        formData.append("name", registerData?.name);
        formData.append("email", registerData?.email);
        formData.append("password", registerData?.password);
        formData.append("retype_password", registerData?.retype_password);
        formData.append("role", "PROVIDER"); // default data append

        formData.append("gaming_zone_name", data?.gaming_zone_name);
        formData.append("phone", data?.phone); // You can remove this if it's already in the previous section
        formData.append("opening_time", data?.opening_time);
        formData.append("closing_time", data?.closing_time);
        formData.append("address", data?.address);

        if (collectPhoto) {
            formData.append("gaming_zone", collectPhoto);
        }

        // formData.forEach((value, key) => {
        //     console.log(key, value);
        // });


        try {
            const res = await registerApi(formData).unwrap();

            if (res?.status === 'success') {
                toast.success(res?.message)
                router.push(`/verify-otp?email=${formData.get('email')}&text=sign-up`)

            } else {
                toast.error(res?.messages)
            }
        } catch (errors: any) {
            if (errors) {
                toast.error(errors.data.message)
            }
        }

    }


    return (
        <div className="p-8 ">
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
                                    className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg  bg-gray-900 text-gray-400 transition-colors hover:bg-gray-900"
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
                            <Label htmlFor="gaming_zone_name" className="text-base font-medium">
                                Gaming Zone Name
                            </Label>
                            <Input
                                id="gaming_zone_name"
                                placeholder="Enter the name of the room"
                                className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                                {...register("gaming_zone_name", { required: "Gaming zone name is required" })}
                            />
                            {errors.gaming_zone_name && (
                                <p className="text-red-500 text-sm">{errors.gaming_zone_name.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-base font-medium">
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

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="opening_time" className="text-white text-sm">
                                    Opening Time
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="opening_time"
                                        type="tex"
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
                                        type="tex"
                                        placeholder="Enter the closing time(10.00 AM)"
                                        {...register("closing_time")}
                                        className=" border-gray-700 text-white rounded-lg border-none bg-[#5E5E5E33]/80 py-6 [&::-webkit-calendar-picker-indicator]:invert"
                                    />
                                </div>
                                {errors.closing_time && <p className="text-red-400 text-xs mt-1">{errors.closing_time.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address" className="text-base font-medium">
                                Location
                            </Label>
                            <Input
                                id="address"
                                placeholder="Enter the Location"
                                className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                                {...register("address", { required: "Location is required" })}
                            />
                            {errors.address && (
                                <p className="text-red-500 text-sm">{errors.address.message}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
                            style={{
                                background:
                                    "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
                            }}>
                            {isLoading ? (
                                <CustomButtonLoader />
                            ) : (
                                'Register'
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}