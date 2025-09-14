
"use client"

import { useState, Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useAddPromoApiMutation } from "@/redux/website/promo/promoApi";
import toast from "react-hot-toast";
import CustomButtonLoader from "../loader/CustomButtonLoader";


// type define ========
type PromoFormValues = {
    promo_code: string;
    validate_date: string;
    percentage: string;
    minimum_amount: string;
    about: string;
};
interface AddNewPromoProps {
    open: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}


const AddNewPromo = ({ open, setIsOpen }: AddNewPromoProps) => {
    const { register, handleSubmit } = useForm<PromoFormValues>();
    const [startDate, setStartDate] = useState<Date | null>(new Date());



    const [addPromoApi, { isLoading }] = useAddPromoApiMutation();









    const onSubmit = async (data: PromoFormValues) => {

        // Format to yyyy-mm-dd
        const dateStr = startDate || new Date()
        const date = new Date(dateStr);
        const formattedDate = date.toISOString().split('T')[0];


        const formData = new FormData();
        formData.append("promo_code", data.promo_code);
        formData.append("validate_date", formattedDate);
        formData.append("percentage", data.percentage);
        formData.append("minimum_amount", data.minimum_amount);
        formData.append("about", data.about);


        try {
            const res = await addPromoApi(formData).unwrap();
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


    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 8px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(180deg, #6523E7, #023CE3, #6523E7);
                    border-radius: 9999px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(180deg, #5a20cc, #022fb8, #5a20cc);
                }
                .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #6523E7 transparent; }
            `}</style>

            <div className="text-[#fff] xl:p-8">
                <h1 className="text-center text-[24px] py-4">Add A New Promo</h1>
                <div className="w-full rounded-xl border-none shadow-lg">

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="promo_code" className="text-base font-medium">Promo Code</Label>
                            <Input
                                id="promo_code"
                                placeholder="Enter the promo code name"
                                className="rounded-lg border-none bg-[#5E5E5E33]/80 md:py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                                {...register("promo_code")}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2 w-full">
                                <Label htmlFor="validate_date" className="text-base font-medium">Validate Date</Label>
                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="bg-[#5E5E5E33] p-3 w-full block rounded-lg  focus:outline-none focus:border-none"
                                    wrapperClassName="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="percentage" className="text-base font-medium">Percentage</Label>
                                <Input
                                    id="percentage"
                                    type="number"
                                    placeholder="Enter the percentage of discount"
                                    className="rounded-lg border-none bg-[#5E5E5E33]/80 md:py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                                    {...register("percentage")}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="minimum_amount" className="text-base font-medium">Minimum amount</Label>
                            <Input
                                id="minimum_amount"
                                type="number"
                                placeholder="Enter the minimum order amount"
                                className="rounded-lg border-none bg-[#5E5E5E33]/80 md:py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                                {...register("minimum_amount")}
                            />
                        </div>

                        <div className="w-full overflow-hidden custom-scrollbar">
                            <Label htmlFor="about" className="text-base font-medium">About promo</Label>
                            <div className="sm:-mx-4 p-4">
                                <textarea
                                    id="about"
                                    placeholder="Describe the promotion details"
                                    className=" w-[calc(100%+32px)]  /* Forces full width */
                                    min-h-[150px]
                                    rounded-lg
                                    bg-[#5E5E5E33]/80
                                    text-white
                                    placeholder:text-gray-500
                                    p-4
                                    border-none
                                    focus:outline-none
                                    resize-none
                                    overflow-auto
                                    break-all
                                    whitespace-pre-wrap
                                    box-border
                                    -ml-4
                                    sm:w-full
                                    sm:ml-0
                                    " {...register("about")} />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full md:py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
                            style={{ background: "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)" }}
                        >
                            {isLoading ? <CustomButtonLoader /> : "Add Promo"}
                        </Button>

                        <Button
                            onClick={() => setIsOpen(false)}
                            className="w-full md:py-6 rounded-full cursor-pointer text-[#EB4335] font-semibold transition-all duration-200"
                            type="button"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AddNewPromo;
