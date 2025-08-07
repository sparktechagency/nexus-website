"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import Link from "next/link"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="h-dvh grid grid-cols-1 lg:grid-cols-2  text-[#ffff] ">
      <div className=" rounded-2xl ml-6 mt-6 relative">
        <Image
          src="/web_pic/authenticationPhoto2.png"
          alt="Gaming controller with neon lights"
          width={600}
          height={300}
          className="object-cover rounded-lg absolute top-20 w-[80%] ml-20 z-30"
        />
        <Image
          src="/web_pic/authenticationPhoto.png"
          alt="Gaming controller with neon lights"
          width={400}
          height={400}
          className="object-cover rounded-lg w-full h-[95vh] relative"
        />

        <div className="absolute bottom-24 left-16 space-y-5">
          <p
            className="text-transparent bg-clip-text bg-gradient-to-r text-8xl font-bold"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(101,35,231,1) 0%, rgba(2,60,227,1) 50%, rgba(101,35,231,1) 100%)",
              WebkitBackgroundClip: "text", // Very important for Safari/Chrome
              WebkitTextFillColor: "transparent", // Needed for full support
            }}
          >
            Let’s Connect
          </p>

          <p className="text-4xl">
            Make Your Space for an Unforgettable Gaming Experience.
          </p>

        </div>
      </div>




      {/* Right section with login form - takes full width on small screens, half on medium and larger */}
      <div className="flex justify-center items-center">
        <div className="w-[646px] p-8 rounded-2xl">
          <Card className="w-full  bg-gray-900/50 backdrop-blur-sm  rounded-xl shadow-lg">
            <CardHeader className="flex flex-col items-center space-y-4 pt-8 pb-6">
              <Image
                src="/web_pic/logo.png"
                alt="Abstract geometric logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
              <CardDescription className="text-sm text-gray-400 text-center">
                Access your account with correct information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 px-6 pb-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email."
                    className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    className="pl-10 pr-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
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
                <Link href="#" className="text-sm text-right text-purple-400 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold py-2 rounded-md transition-all duration-200"
              >
                Sign In
              </Button>
            </CardContent>
            <CardFooter className="flex justify-center text-sm text-gray-400 pb-8">
              Don&apos;t have an account?{" "}
              <Link href="#" className="text-purple-400 hover:underline ml-1">
                Sign Up
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
