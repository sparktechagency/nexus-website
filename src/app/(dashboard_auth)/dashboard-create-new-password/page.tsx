
"use client"

import { useState } from "react"
import Image from "next/image"
import { useForm, SubmitHandler } from "react-hook-form"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Lock, Eye, EyeOff } from 'lucide-react'
import Link from "next/link"


type CreateNewPasswordInputs = {
    password: string
    retypePassword: string
    terms: boolean
}

export default function DashboardCreateNewPasswordPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showRetypePassword, setShowRetypePassword] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors }
    } = useForm<CreateNewPasswordInputs>()

    const passwordValue = watch("password")

    const onSubmit: SubmitHandler<CreateNewPasswordInputs> = (data) => {
        console.log("Form Values:", data)
        reset()
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

                                {/* Password */}
                                <div className="grid gap-2">
                                    <Label htmlFor="password" className="text-[#ffff]">New Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="********"
                                            className="pl-10 pr-10 py-6 rounded-full bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                                            {...register("password", { required: "Password is required" })}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                                </div>

                                {/* Retype Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="retypePassword" className="text-[#ffff]">Retype Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="retypePassword"
                                            type={showRetypePassword ? "text" : "password"}
                                            placeholder="********"
                                            className="pl-10 pr-10 py-6 rounded-full bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                                            {...register("retypePassword", {
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
                                    {errors.retypePassword && <p className="text-red-500 text-sm">{errors.retypePassword.message}</p>}
                                </div>



                                {/* Submit */}
                                <Button
                                    type="submit"
                                    className="w-full py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
                                    style={{
                                        background:
                                            "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
                                    }}
                                >
                                    <Link href="/dashboard-login">
                                        Update
                                    </Link>
                                </Button>
                            </CardContent>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

