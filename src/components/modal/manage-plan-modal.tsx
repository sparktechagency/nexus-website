
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type PlanType = "Basic" | "Standard" | "Premium"

const ManagePlanModal = () => {
    const [selectedPlan, setSelectedPlan] = useState<PlanType>("Basic")
    const [bookingNumber, setBookingNumber] = useState("")
    const [price, setPrice] = useState("")

    const planTypes: PlanType[] = ["Basic", "Standard", "Premium"]

    const handleUpdate = () => {
        console.log({
            plan: selectedPlan,
            bookingNumber,
            price,
        })
    }

    return (
        <div className="w-full max-w-md mx-auto bg-black text-white p-6 rounded-lg">
            <h1 className="text-2xl font-semibold mb-8">Manage Plan</h1>

            {/* Plan Type Selection */}
            <div className="flex gap-2 mb-8">
                {planTypes.map((plan) => (
                    <Button
                        key={plan}
                        variant={selectedPlan === plan ? "default" : "outline"}
                        onClick={() => setSelectedPlan(plan)}
                        className={`flex-1 ${selectedPlan === plan
                                ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
                                : "bg-transparent border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white"
                            }`}
                    >
                        {plan}
                    </Button>
                ))}
            </div>

            {/* Booking Number Section */}
            <div className="mb-6">
                <Label htmlFor="booking-number" className="text-white text-base font-medium mb-3 block">
                    Booking number
                </Label>
                <Input
                    id="booking-number"
                    placeholder="How many bookings per day?"
                    value={bookingNumber}
                    onChange={(e) => setBookingNumber(e.target.value)}
                    className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-600 focus:ring-blue-600"
                />
            </div>

            {/* Price Section */}
            <div className="mb-8">
                <Label htmlFor="price" className="text-white text-base font-medium mb-3 block">
                    Price
                </Label>
                <Input
                    id="price"
                    placeholder="Enter the price of this plan"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-600 focus:ring-blue-600"
                />
            </div>

            {/* Update Button */}
            <Button
                onClick={handleUpdate}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 rounded-lg"
            >
                Update
            </Button>
        </div>
    )
}

export default ManagePlanModal