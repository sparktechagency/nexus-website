"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ImageIcon, User, Phone, MapPin } from "lucide-react"

export default function PersonalDetailsPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    location: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className="w-full mt-4 bg-[#211935] backdrop-blur-sm rounded-xl">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Photo Upload Section */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-40 h-40 bg-slate-700/50 border-2 border-dashed border-slate-600 rounded-xl flex items-center justify-center hover:bg-slate-700/70 transition-colors cursor-pointer">
            <ImageIcon className="w-24 h-24 text-slate-400" />
          </div>
          <p className="text-slate-300 text-sm font-medium">Upload your photo</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className="rounded-lg border-none bg-[#5E5E5E33]/80 px-8 py-6  text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="tel"
              placeholder="Contact number"
              value={formData.contactNumber}
              onChange={(e) => handleInputChange("contactNumber", e.target.value)}
              className="rounded-lg border-none bg-[#5E5E5E33]/80 px-8 py-6  text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="rounded-lg border-none bg-[#5E5E5E33]/80 px-8 py-6  text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="mt-8 w-full py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
          style={{
            background:
              "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
          }}
        >
          Update changes
        </Button>
      </form>
    </div>
  )
}
