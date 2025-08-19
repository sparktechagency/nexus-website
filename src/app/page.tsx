
"use client"

import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import Image from "next/image"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import Link from "next/link"
import { useRouter } from "next/navigation"


type LoginFormInputs = {
  email: string
  password: string
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  // React Hook Form setup
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormInputs>()

  // Handle form submit
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    console.log("Form Data:", data)
   router.push("/home?loginVerify=true")
    reset()
  }

 

  return (
    <div
      className="h-full lg:h-dvh grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-0 text-[#ffff] bg-cover bg-center"
      style={{ backgroundImage: "url('/web_pic/login-bg.png')" }}
    >

      {/* Left section */}
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

      {/* Right section */}
      <div className="flex justify-center items-center">
        <div className="w-full xl:w-[646px] px-4 pb-4 xl:pb-0 xl:px-0 xl:p-8 rounded-2xl">
          <div
            className="w-full bg-gray-900/50 backdrop-blur-sm shadow-2xl border-1 border-gray-600 rounded-xl"
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
              <CardTitle className="md:text-3xl font-bold text-[#ffff]">Sign In</CardTitle>
              <CardDescription className="text-sm text-gray-400 text-center">
                Access your account with correct information
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
                      className="pl-10 md:py-6 rounded-full bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
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

                {/* Password Field */}
                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-[#ffff]">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      className="pl-10 pr-10 md:py-6 rounded-full bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters"
                        }
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-sm">{errors.password.message}</p>
                  )}

                  <Link
                    href="/forgot-password"
                    className="text-sm text-right bg-gradient-to-r from-[#6523E7] via-[#023CE3] to-[#6523E7] inline-block text-transparent bg-clip-text hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
                  style={{
                    background:
                      "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
                  }}
                >
                  {isSubmitting ? "Loading..." : "Sign In"}
                </Button>

              </CardContent>
            </form>

            <CardFooter className="flex justify-center text-sm pb-8">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="bg-gradient-to-r from-[#6523E7] via-[#023CE3] to-[#6523E7] inline-block text-transparent bg-clip-text hover:underline ml-1"
              >
                Sign Up
              </Link>
            </CardFooter>
          </div>
        </div>
      </div>
    </div>
  )
}
