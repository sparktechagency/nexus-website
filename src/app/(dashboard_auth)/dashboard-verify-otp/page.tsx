
"use client"

import React, {
    useRef,
    useState,
    type ChangeEvent,
    type KeyboardEvent,
    type ClipboardEvent,
} from "react"
import Image from "next/image"
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function DashboardVerifyOtpPage() {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
    const inputRefs = useRef<HTMLInputElement[]>([])

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value
        if (/^\d*$/.test(value) && value.length <= 1) {
            const newOtp = [...otp]
            newOtp[index] = value
            setOtp(newOtp)

            if (value && index < 5) {
                inputRefs.current[index + 1]?.focus()
            }
        }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        const pasteData = e.clipboardData.getData("text").trim()
        if (/^\d{6}$/.test(pasteData)) {
            const newOtp = pasteData.split("")
            setOtp(newOtp)
            inputRefs.current[5]?.focus()
        }
    }

    const handleVerify = () => {
        const fullOtp = otp.join("")
        console.log("Verifying OTP:", fullOtp)
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
                        <div className=" rounded-xl border-none  p-6 text-center shadow-lg">
                            <CardHeader className="flex flex-col items-center space-y-4 pt-8 pb-6">
                                <Image
                                    src="/web_pic/logo.png"
                                    alt="Abstract geometric logo"
                                    width={100}
                                    height={100}
                                    className="rounded-full"
                                />
                                <CardTitle className="text-3xl font-bold text-[#ffff]">Verify Email</CardTitle>
                                <CardDescription className="text-sm text-gray-400 text-center">
                                    We’ve sent 6 digits code on your email
                                </CardDescription>
                            </CardHeader>



                            <div className="space-y-6">
                                <div className="space-y-2 text-left">
                                    <Label htmlFor="otp" className="text-white">
                                        Verify OTP
                                    </Label>
                                    <div className="flex justify-between gap-1 md:gap-2 ">
                                        {otp.map((digit, index) => (
                                            <Input
                                                key={index}
                                                id={`otp-input-${index}`}
                                                type="text"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleChange(e, index)}
                                                onKeyDown={(e) => handleKeyDown(e, index)}
                                                onPaste={handlePaste}
                                                ref={(el) => {
                                                    if (el) inputRefs.current[index] = el
                                                }}
                                                className={cn(
                                                    "h-10 w-[60px] md:h-20 md:w-24 lg:w-36 text-center text-xs md:text-2xl font-bold text-white",
                                                    "rounded md:rounded-2xl border border-gray-700 bg-[#3A3A3A] focus:border-purple-500 focus:ring-purple-500",
                                                    digit && "border-purple-500"
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <div className="text-right text-sm">
                                        <Button variant="link" className="cursor-pointer bg-gradient-to-r from-[#6523E7] via-[#023CE3] to-[#6523E7] inline-block text-transparent bg-clip-text hover:underline">
                                            Send again
                                        </Button>
                                    </div>
                                </div>





                                <Button
                                    onClick={handleVerify}
                                    className="w-full py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
                                    style={{
                                        background:
                                            "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
                                    }}
                                >
                                    <Link href="dashboard-create-new-password">
                                        Verify
                                    </Link>
                                </Button>





                                <Link href="/dashboard-forgot-password">
                                    <Button
                                        className="w-full py-6 rounded-full cursor-pointer text-[#EB4335] font-semibold transition-all duration-200">
                                        Back
                                    </Button>
                                </Link>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div >
    )
}
