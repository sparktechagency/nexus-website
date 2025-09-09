
"use client"

import { useState } from "react"
import Image from "next/image"
import { useForm, SubmitHandler } from "react-hook-form"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Lock, Eye, EyeOff } from 'lucide-react'
import { useChangePasswordApiMutation } from "@/redux/authontication/authApi"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import CustomButtonLoader from "@/components/loader/CustomButtonLoader"



type CreateNewPasswordInputs = {
    current_password: string
    new_password: string
    retype_password: string
    terms: boolean
}

export default function CreateNewPasswordPage() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showRetypePassword, setShowRetypePassword] = useState(false)
    const [changePasswordApi, { isLoading }] = useChangePasswordApiMutation()
    const router = useRouter()


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<CreateNewPasswordInputs>()

    const passwordValue = watch("new_password")





    const onSubmit: SubmitHandler<CreateNewPasswordInputs> = async (data) => {
        const formData = new FormData();

        formData.append("current_password", data?.current_password);
        formData.append("new_password", data?.new_password);
        formData.append("retype_password", data?.retype_password);



        try {
            const res = await changePasswordApi(formData).unwrap();
            if (res?.status === 'success') {
                toast.success(res?.message)
                router.push("/")
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
        <div
            className="h-full lg:h-dvh grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-0 text-[#ffff] bg-cover bg-center"
            style={{ backgroundImage: "url('/web_pic/login-bg.png')" }}
        >
            {/* Left side image */}
            <div className="rounded-2xl px-4 lg:px-0 lg:ml-4 mt-6 relative flex justify-center">
                <Image
                    src="/web_pic/authenticationPhoto2.png"
                    alt="Gaming controller with neon lights"
                    width={600}
                    height={300}
                    className="object-cover rounded-lg absolute top-8 md:top-16 lg:top-20 w-[80%] z-30"
                />
                <Image
                    src="/web_pic/authenticationPhoto.png"
                    alt="Gaming controller with neon lights"
                    width={400}
                    height={400}
                    className="object-cover rounded-lg w-full h-full lg:h-[95vh] relative"
                />
                <div className="absolute bottom-4 md:bottom-8 lg:bottom-16 xl:bottom-24 left-8 md:left-10 lg:left-16 space-y-5">
                    <p className="bg-gradient-to-r from-[#6523E7] via-[#023CE3] to-[#6523E7] inline-block text-transparent bg-clip-text text-4xl md:text-6xl lg:text-7xl font-bold">
                        Let’s Connect
                    </p>
                    <p className="text-[14px] md:text-3xl lg:text-4xl">
                        Make Your Space for an Unforgettable Gaming Experience.
                    </p>
                </div>
            </div>



            {/* Right side form */}
            <div className="h-full flex justify-center items-center">
                <div className="w-full xl:w-[646px] px-4 pb-4 xl:pb-0 xl:px-0 xl:p-8 rounded-2xl">
                    <div
                        className="w-full bg-[#14151b] shadow-[0_0_10px_3px_rgba(8,112,184,0.5)] backdrop-blur-sm rounded-xl"
                    
                    >
                        <CardHeader className="flex flex-col items-center space-y-4 pt-8 pb-6">
                            <Image
                                src="/web_pic/logo.png"
                                alt="Abstract geometric logo"
                                width={100}
                                height={100}
                                className="rounded-full"
                            />
                            <CardTitle className="md:text-3xl font-bold text-[#ffff]">Create New Password</CardTitle>
                            <CardDescription className="text-sm text-gray-400 text-center">
                                You have to create a new password after forget
                            </CardDescription>
                        </CardHeader>



                        <form onSubmit={handleSubmit(onSubmit)}>
                            <CardContent className="space-y-6 px-6 pb-6">

                                {/* Password */}
                                <div className="grid gap-2">
                                    <Label htmlFor="current_password" className="text-[#ffff]">Current Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="current_password"
                                            type={showCurrentPassword ? "text" : "password"}
                                            placeholder="********"
                                            className="pl-10 pr-10 md:py-6 rounded-full bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                                            {...register("current_password", { required: "Password is required" })}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                        >
                                            {showCurrentPassword? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    {errors.current_password && <p className="text-red-500 text-sm">{errors.current_password.message}</p>}
                                </div>

                                {/* new_password */}
                                <div className="grid gap-2">
                                    <Label htmlFor="new_password" className="text-[#ffff]">New Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="new_password"
                                            type={showNewPassword ? "text" : "password"}
                                            placeholder="********"
                                            className="pl-10 pr-10 md:py-6 rounded-full bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                                            {...register("new_password", { required: "Password is required" })}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                        >
                                            {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    {errors.new_password && <p className="text-red-500 text-sm">{errors.new_password.message}</p>}
                                </div>

                                {/* Retype Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="retype_password" className="text-[#ffff]">Retype Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="retype_password"
                                            type={showRetypePassword ? "text" : "password"}
                                            placeholder="********"
                                            className="pl-10 pr-10 md:py-6 rounded-full bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                                            {...register("retype_password", {
                                                required: "Please confirm your password",
                                                validate: value =>
                                                    value === passwordValue || "Passwords do not match"
                                            })}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowRetypePassword(!showRetypePassword)}
                                            className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                        >
                                            {showRetypePassword ? <EyeOff className="h-4 w-4 " /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    {errors.retype_password && <p className="text-red-500 text-sm">{errors.retype_password.message}</p>}
                                </div>



                                {/* Submit */}
                                <Button
                                    type="submit"
                                    className="w-full md:py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
                                    style={{
                                        background:
                                            "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
                                    }}>
                                    {
                                        isLoading ? <CustomButtonLoader /> : "Update"
                                    }
                                </Button>
                            </CardContent>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

