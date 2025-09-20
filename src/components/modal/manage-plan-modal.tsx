"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useGetSubscriptionApiQuery, useUpdateSubscriptionApiMutation } from "@/redux/dashboard/subscription/subscirptionApi"
import toast from "react-hot-toast"
import CustomButtonLoader from "../loader/CustomButtonLoader"
import { useEffect, useState } from "react"

interface FormData {
    name: string
    booking_number: string
    price: string
    stripe_price_id: string
}

type ManagePlanProps = {
    open: boolean,
    setIsOpen: (value: boolean) => void
    planId: number | string
}

type SubscriptionProps = {
    id: number | string
    name: string
}


type SubscriptionArrayProps = {
    id: number | string
    name: string
    booking_number: string
    price: string
    stripe_price_id: string
}

const ManagePlanModal = ({ open, setIsOpen, planId }: ManagePlanProps) => {
    const [subscriptionType, setSubscriptionType] = useState<string>("")

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FormData>({
        defaultValues: {
            name: "",
            booking_number: "",
            price: "",
            stripe_price_id: "",
        },
    })


    const handlePlanChange = (name: string) => {
        setSubscriptionType(name)
    }


    // GET API
    const { data: getSubscription, } = useGetSubscriptionApiQuery({ skip: true })
    const subscriptionData = getSubscription?.data

    const findData = subscriptionData.find((element: SubscriptionProps) => element.id === planId)


    // UPDATE API
    const [updateSubscriptionApi, { isLoading }] = useUpdateSubscriptionApiMutation()


    useEffect(() => {
        if (subscriptionData) {
            setValue("name", findData?.name);
            setValue("booking_number", findData?.booking_number);
            setValue("price", findData?.price);
            setValue("stripe_price_id", findData?.stripe_price_id);
            setSubscriptionType(findData.name)
        }
    }, [findData, setValue])





    const onSubmit = async (data: FormData) => {
        const formData = new FormData();



        formData.append("name", subscriptionType);
        formData.append("type", "recurring"); // STATIC TYPE SEND
        formData.append("booking_number", data?.booking_number);
        formData.append("stripe_price_id", data.stripe_price_id);
        formData.append("price", data?.price);
        formData.append("_method", "PUT");


        try {
            const res = await updateSubscriptionApi({ id: planId, updateSubscriptionInfo: formData }).unwrap();
            console.log(res)
            if (res?.status === 'success') {
                toast.success(res?.message)
                setIsOpen(!open)

            } else {
                toast.error(res?.messages)
            }
        } catch (errors: any) {
            if (errors) {
                toast.error(errors.data?.message)
            }
        }

    }








    return (
        <div className="w-full bg-black text-white xl:p-8 rounded-lg">
            <h1 className="text-2xl font-semibold mb-8">Manage Plan</h1>

            {/* Plan Type Selection */}
            <div className="flex gap-2 mb-8">
                {subscriptionData?.map((item: SubscriptionArrayProps) => (
                    <Button
                        key={item.id}
                        onClick={() => handlePlanChange(item?.name)}
                        className={`flex-1 ${item?.name === subscriptionType
                            ? "bg-white font-bold border border-gray-600 rounded-full cursor-pointer py-5"
                            : "bg-transparent border border-gray-600 text-gray-400 rounded-full cursor-pointer py-5"
                            }`}
                    >
                        <span
                            className={`${item?.name === subscriptionType
                                ? "bg-gradient-to-r from-[#6523E7] via-[#023CE3] to-[#6523E7] bg-clip-text text-transparent"
                                : ""
                                }`}
                        >
                            {item?.name}
                        </span>
                    </Button>
                ))}
            </div>

            {/* Booking Number Section */}
            <div className="mb-6">
                <Label
                    htmlFor="booking_number"
                    className="text-white text-base font-medium mb-3 block"
                >
                    Booking number <span className="text-yellow-500">(Type -1 for unlimited)</span>
                </Label>
                <Input
                    id="booking_number"
                    type="number"
                    placeholder="How many bookings per day?"
                    {...register("booking_number", {
                        required: "Booking number is required",
                    })}
                    className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6  text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                />
                {errors.booking_number && (
                    <span className="text-red-500">{errors.booking_number.message}</span>
                )}
            </div>

            {/* Price Section */}
            <div className="mb-8">
                <Label htmlFor="price" className="text-white text-base font-medium mb-3 block">
                    Price
                </Label>
                <Input
                    id="price"
                    type="number"
                    placeholder="Enter the price of this plan"
                    {...register("price", {
                        required: "Price is required",
                    })}
                    className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6  text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                />
                {errors.price && (
                    <span className="text-red-500">{errors.price.message}</span>
                )}
            </div>
            {/* stripe_price_id Section */}
            <div className="mb-8">
                <Label htmlFor="stripe_price_id" className="text-white text-base font-medium mb-3 block">
                    Stripe Price Id
                </Label>
                <Input
                    id="stripe_price_id"
                    placeholder="Enter the stripe price id"
                    {...register("stripe_price_id", {
                        required: "stripe price id is required",
                    })}
                    className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6  text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                />
                {errors.stripe_price_id && (
                    <span className="text-red-500">{errors.stripe_price_id.message}</span>
                )}
            </div>

            {/* Update Button */}
            <Button
                onClick={handleSubmit(onSubmit)}
                className="w-full py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
                style={{
                    background:
                        "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
                }}
            >
                {
                    isLoading ? <CustomButtonLoader /> : " Update"
                }
            </Button>
        </div>
    )
}

export default ManagePlanModal
