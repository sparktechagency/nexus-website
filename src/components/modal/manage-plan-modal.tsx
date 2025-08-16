
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
        <div className="w-full  bg-black text-white p-6 rounded-lg">
            <h1 className="text-2xl font-semibold mb-8">Manage Plan</h1>

            {/* Plan Type Selection */}
            <div className="flex gap-2 mb-8">
                {planTypes.map((plan) => (
                    <Button
                        key={plan}
                        onClick={() => setSelectedPlan(plan)}
                        className={`flex-1 ${selectedPlan === plan
                            ? "bg-white font-bold border border-gray-600 rounded-full cursor-pointer py-5"
                            : "bg-transparent border border-gray-600 text-gray-400 rounded-full cursor-pointer py-5"
                            }`}
                    >
                        <span
                            className={`${selectedPlan === plan
                                ? "bg-gradient-to-r from-[#6523E7] via-[#023CE3] to-[#6523E7] bg-clip-text text-transparent"
                                : ""
                                }`}
                        >
                            {plan}
                        </span>
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
                    className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6  text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
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
                    className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6  text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                />
            </div>

            {/* Update Button */}
            <Button
                onClick={handleUpdate}
                className="w-full py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
                style={{
                    background:
                        "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
                }}
            >
                Update
            </Button>
        </div>
    )
}

export default ManagePlanModal