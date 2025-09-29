
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useForm, SubmitHandler } from "react-hook-form"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react'
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import CustomModal from "@/components/modal/customModal"
import RegisterModal from "@/components/registerModal/page"
import { KeyboardEventHandler } from "react"


type RegisterFormInputs = {
  name: string
  email: string
  password: string
  retype_password: string
  terms: boolean
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showRetypePassword, setShowRetypePassword] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [terms, setTerms] = useState(false)
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const [emailError, setEmailError] = useState<string>("")

  const [registerData, setRegisterData] = useState<RegisterFormInputs>({
    name: "",
    email: "",
    password: "",
    retype_password: "",
    terms: false,
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterFormInputs>()

  const passwordValue = watch("password")

  // Watch form values
  const nameValue = watch("name")
  const emailValue = watch("email")
  const retypePasswordValueT = watch("retype_password")

  // Email validation function (Regex)
  const isEmailValid = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  // Check if email is valid on every key press
  const handleEmailChange: KeyboardEventHandler<HTMLInputElement> = (e) => {
     const email = (e.target as HTMLInputElement).value
    if (!isEmailValid(email)) {
      setEmailError("Please enter a valid email address.")
    } else {
      setEmailError("")
    }
  }

  // Check if all fields are filled and terms are checked
  useEffect(() => {
    const isEmailValidFlag = isEmailValid(emailValue)
    
    if (
      nameValue && 
      isEmailValidFlag && 
      passwordValue && 
      retypePasswordValueT && 
      terms && 
      passwordValue === retypePasswordValueT
    ) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }, [nameValue, emailValue, passwordValue, retypePasswordValueT, terms])

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    setRegisterData(data)
    // reset()
  }

  const handleTerms = () => {
    setTerms(!terms)
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
        <div className="w-full xl:w-[646px] px-4 pb-4 xl:pb-0 xl:px-0 xl:p-0 rounded-2xl">
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
              <CardTitle className="md:text-3xl font-bold text-[#ffff]">Sign Up</CardTitle>
              <CardDescription className="text-sm text-gray-400 text-center">
                Give correct information to create NEXUS account
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="space-y-6 px-6 pb-6">
                {/* Full Name */}
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-[#ffff]">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      placeholder="Enter your full name."
                      className="pl-10 md:py-6 rounded-full bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                      {...register("name", { required: "Full name is required" })}
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-[#ffff]">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email."
                      className="pl-10 md:py-6 rounded-full bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                      {...register("email", { required: "Email is required" })}
                      onKeyUp={handleEmailChange} // validate email on keyup
                    />
                  </div>
                  {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-[#ffff]">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      className="pl-10 pr-10 md:py-6 rounded-full bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
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

                {/* Terms */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    onClick={handleTerms}
                    id="terms"
                    className="border-gray-600 data-[state=checked]:bg-purple-600 data-[state=checked]:text-white"
                    {...register("terms", { required: "You must agree to the terms" })}
                  />
                  <label htmlFor="terms" className="text-sm font-medium leading-none text-gray-400">
                    By creating an account you agree to our{" "}
                    <Link href="#" className="text-[#023CE3] hover:underline">terms of use</Link> &{" "}
                    <Link href="#" className="bg-gradient-to-r from-[#6523E7] via-[#023CE3] to-[#6523E7] inline-block text-transparent bg-clip-text hover:underline">
                      privacy policy
                    </Link>.
                  </label>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full md:py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
                  onClick={() => setIsOpen(!isOpen)}
                  style={{
                    background:
                      "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
                  }}
                  disabled={!isButtonEnabled}
                >
                  Sign Up
                </Button>
              </CardContent>
            </form>

            <CardFooter className="flex justify-center text-sm pb-8">
              Have an account?
              <Link href="/" className="bg-gradient-to-r from-[#6523E7] via-[#023CE3] to-[#6523E7] inline-block text-transparent bg-clip-text hover:underline ml-1">
                Sign In
              </Link>
            </CardFooter>
          </div>
        </div>
      </div>

      {/* modal component(REGISTER) */}
      <CustomModal
        open={isOpen}
        setIsOpen={setIsOpen}
        className={"p-0 max-h-[0vh]"}
        maxWidth={"!max-w-[50vw]"}
      >
        <RegisterModal
          registerData={registerData}
        />
      </CustomModal>
    </div>
  )
}

