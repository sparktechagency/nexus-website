
"use client"

import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Lock, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"

type CreateNewPasswordInputs = {
  currentPassword: string
  password: string
  retypePassword: string
}

const EditProfile = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showRetypePassword, setShowRetypePassword] = useState(false)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreateNewPasswordInputs>()

  const passwordValue = watch("password")

  const onSubmit: SubmitHandler<CreateNewPasswordInputs> = (data) => {
    console.log("Form Values:", data)

    reset()
    router.push("/home") // navigate after form submission
  }

  return (
    <div className="text-[#fff]">
      <h1 className="text-center md:text-2xl font-semibold pb-4">
        Change Your Password
      </h1>
      <p className="text-center">
        You have to fill current password section for change the password.
      </p>



      <div className="w-full px-4 pb-4 xl:pb-0 xl:px-0 xl:p-8 rounded-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6 px-6 pb-6 pt-10">
            {/* Current Password */}
            <div className="grid gap-2">
              <Label htmlFor="currentPassword" className="text-[#ffff]">
                Current Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="********"
                  className="pl-10 pr-10 md:py-6 rounded-full bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                  {...register("currentPassword", {
                    required: "Current password is required",
                  })}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowCurrentPassword(!showCurrentPassword)
                  }
                  className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="text-red-500 text-sm">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            {/* New Password */}
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-[#ffff]">
                New Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="pl-10 pr-10 md:py-6 rounded-full bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Retype Password */}
            <div className="space-y-2">
              <Label htmlFor="retypePassword" className="text-[#ffff]">
                Retype Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="retypePassword"
                  type={showRetypePassword ? "text" : "password"}
                  placeholder="********"
                  className="pl-10 pr-10 md:py-6 rounded-full bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                  {...register("retypePassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === passwordValue || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowRetypePassword(!showRetypePassword)
                  }
                  className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showRetypePassword ? (
                    <EyeOff className="h-4 w-4 " />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.retypePassword && (
                <p className="text-red-500 text-sm">
                  {errors.retypePassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full md:py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
              style={{
                background:
                  "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
              }}
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
