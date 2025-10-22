
"use client"

import { useState } from "react"
import Image from "next/image"
import { useForm, SubmitHandler} from "react-hook-form"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Lock, Eye, EyeOff } from 'lucide-react'
import toast from "react-hot-toast"
import { useChangePasswordApiMutation } from "@/redux/authontication/authApi"
import CustomButtonLoader from "@/components/loader/CustomButtonLoader"
import { useRouter } from "next/navigation"

type CreateNewPasswordInputs = {
    current_password: string
    new_password: string
    retype_password: string
    terms: boolean
}
interface ApiError {
    data: {
        message: string;
    };
}

export default function DashboardCreateNewPasswordPage() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showRetypePassword, setShowRetypePassword] = useState(false)
    const [changePasswordApi, { isLoading }] = useChangePasswordApiMutation()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        watch,
        setError,
        clearErrors,
        formState: { errors }
    } = useForm<CreateNewPasswordInputs>()

    const passwordValue = watch("new_password")
    const retypePasswordValue = watch("retype_password")

    // Simplified real-time validation
    const validatePasswordMatch = (value: string) => {
        if (!passwordValue) {
            return "Please enter new password first"
        }
        if (value !== passwordValue) {
            return "Password do not match"
        }
        return true
    }

    const handleRetypePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        
        if (value && passwordValue) {
            if (value !== passwordValue) {
                setError("retype_password", {
                    type: "manual",
                    message: "Password do not match"
                })
            } else {
                clearErrors("retype_password")
            }
        } else if (!value) {
            // Clear error when field is empty
            clearErrors("retype_password")
        }
    }

    const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        
        if (retypePasswordValue) {
            if (value !== retypePasswordValue) {
                setError("retype_password", {
                    type: "manual",
                    message: "Password do not match"
                })
            } else {
                clearErrors("retype_password")
            }
        }
    }

    const onSubmit: SubmitHandler<CreateNewPasswordInputs> = async (data) => {
        // Final validation before submission
        if (data.new_password !== data.retype_password) {
            setError("retype_password", {
                type: "manual",
                message: "Password do not match"
            })
            toast.error("Password do not match")
            return
        }

        const formData = new FormData();

        formData.append("current_password", data?.current_password);
        formData.append("new_password", data?.new_password);
        formData.append("retype_password", data?.retype_password);

        try {
            const res = await changePasswordApi(formData).unwrap();
            if (res?.status === 'success') {
                toast.success(res?.message)
                router.push("/dashboard-login")
            } else {
                toast.error(res?.messages)
            }
        } catch (errors) {
            const errorValue = errors as ApiError;
            if (errorValue?.data?.message) {
                toast.error(errorValue?.data?.message);
            }
        }
    }

    return (
        <div
            className="h-screen flex justify-center items-center text-[#ffff] bg-cover bg-center"
            style={{ backgroundImage: "url('/web_pic/login-bg.png')" }}>

            {/* Right side form */}
            <div className="h-full flex justify-center items-center">
                <div className="w-full xl:w-[646px] px-4 pb-4 xl:pb-0 xl:px-0 xl:p-8 rounded-2xl">
                    <div
                        className="w-full bg-[#1c1629] backdrop-blur-sm shadow-2xl  rounded-xl"
                        style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 2px 20px" }}
                    >
                        <CardHeader className="flex flex-col items-center space-y-4 pt-8 pb-6">
                            <Image
                                src="/web_pic/logo.png"
                                alt="Abstract geometric logo"
                                width={100}
                                height={100}
                                className="rounded-full"
                            />
                            <CardTitle className="text-3xl font-bold text-[#ffff]">Create New Password</CardTitle>
                            <CardDescription className="text-sm text-gray-400 text-center">
                                You have to create a new password after forget
                            </CardDescription>
                        </CardHeader>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <CardContent className="space-y-6 px-6 pb-6">

                                {/* Current Password */}
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
                                            {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    {errors.current_password && <p className="text-red-500 text-sm">{errors.current_password.message}</p>}
                                </div>

                                {/* New Password */}
                                <div className="grid gap-2">
                                    <Label htmlFor="new_password" className="text-[#ffff]">New Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="new_password"
                                            type={showNewPassword ? "text" : "password"}
                                            placeholder="********"
                                            className="pl-10 pr-10 md:py-6 rounded-full bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                                            {...register("new_password", { 
                                                required: "Password is required",
                                                minLength: {
                                                    value: 4,
                                                    message: "Password must be at least 4 characters"
                                                }
                                            })}
                                            onChange={(e) => {
                                                // Call the original register onChange
                                                register("new_password").onChange(e);
                                                // Call our custom handler
                                                handleNewPasswordChange(e);
                                            }}
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
                                                minLength: {
                                                    value: 4,
                                                    message: "Password must be at least 4 characters"
                                                },
                                                validate: validatePasswordMatch
                                            })}
                                            onChange={(e) => {
                                                // Call the original register onChange
                                                register("retype_password").onChange(e);
                                                // Call our custom handler
                                                handleRetypePasswordChange(e);
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowRetypePassword(!showRetypePassword)}
                                            className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                        >
                                            {showRetypePassword ? <EyeOff className="h-4 w-4 " /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    {errors.retype_password && (
                                        <p className="text-red-500 text-sm">{errors.retype_password.message}</p>
                                    )}
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