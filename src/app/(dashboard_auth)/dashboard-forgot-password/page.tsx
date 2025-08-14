
"use client"
import { SubmitHandler, useForm } from "react-hook-form"
import Image from "next/image"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Mail } from 'lucide-react'
import Link from "next/link"


type ForgotInput = {
    email: string
    password: string
}

export default function DashboardForgotPasswordPage() {

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<ForgotInput>()




    // Handle form submit
    const onSubmit: SubmitHandler<ForgotInput> = async (data) => {
        console.log("Form Data:", data)

        reset()
    }

    return (
        <div
            className="h-screen flex justify-center items-center text-[#ffff] bg-cover bg-center"
            style={{ backgroundImage: "url('/web_pic/login-bg.png')" }}>

            <div className="flex justify-center items-center">
                <div className="w-full xl:w-[646px] px-4 pb-4 xl:pb-0 xl:px-0 xl:p-8 rounded-2xl">
                    <div
                        className="w-full bg-[#1c1629] backdrop-blur-sm shadow-2xl  rounded-xl"
                        style={{
                            boxShadow: "rgba(0, 0, 0, 0.16) 0px 2px 20px",
                        }}
                    >
                        <CardHeader className="flex flex-col items-center space-y-4 pt-8 pb-6">
                            <Image
                                src="/web_pic/logo.png"
                                alt="Abstract geometric logo"
                                width={100}
                                height={100}
                                className="rounded-full"
                            />
                            <CardTitle className="text-3xl font-bold text-[#ffff]">Forget Password</CardTitle>
                            <CardDescription className="text-sm text-gray-400 text-center">
                                Provide email address which you used to create account
                            </CardDescription>
                        </CardHeader>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <CardContent className="space-y-6 px-6 pb-6">
                                {/* Email Field */}
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="text-[#ffff]">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email."
                                            className="pl-10 py-6 rounded-full bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                    message: "Invalid email address"
                                                }
                                            })}
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-red-400 text-sm">{errors.email.message}</p>
                                    )}
                                </div>



                                {/* Submit Button */}
                                <Link href="/dashboard-verify-otp">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
                                        style={{
                                            background:
                                                "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
                                        }}
                                    >
                                        {isSubmitting ? "Loading..." : "Get Code"}
                                    </Button></Link>


                                <Link href="/dashboard-login">
                                    <Button
                                        className="w-full mt-6  py-6 rounded-full cursor-pointer text-[#EB4335] font-semibold transition-all duration-200">
                                        Back to Login
                                    </Button>
                                </Link>
                            </CardContent>
                        </form>


                    </div>
                </div>
            </div>
        </div>
    )
}
