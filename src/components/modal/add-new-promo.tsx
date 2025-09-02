
"use client"

import { useRef, useState, useEffect, Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// type define ========
type PromoFormValues = {
    promoCode: string;
    validDate: string;
    percentage: string;
    minimumAmount: string;
    aboutPromo: string;
};
interface AddNewPromoProps {
    open: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}


const AddNewPromo = ({ open, setIsOpen }: AddNewPromoProps) => {
    const contentRef = useRef<HTMLTextAreaElement | null>(null);
    const [isScrollable, setIsScrollable] = useState<boolean>(false);
    const { register, handleSubmit, reset } = useForm<PromoFormValues>();

    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;
        const MAX = 620;

        const check = () => setIsScrollable(el.scrollHeight > MAX);
        check(); // initial

        const ro = new ResizeObserver(check);
        ro.observe(el);
        window.addEventListener("resize", check);

        return () => {
            ro.disconnect();
            window.removeEventListener("resize", check);
        };
    }, []);

    const onSubmit = (data: PromoFormValues) => {
        console.log("Form Data:", data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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

            <div className="text-[#fff]">
                <h1 className="text-center text-[24px] py-4">Add A New Promo</h1>
                <div className="w-full rounded-xl border-none shadow-lg">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="promoCode" className="text-base font-medium">Promo Code</Label>
                            <Input
                                id="promoCode"
                                placeholder="Enter the promo code name"
                                className="rounded-lg border-none bg-[#5E5E5E33]/80 md:py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                                {...register("promoCode")}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="validDate" className="text-base font-medium">Validate Date</Label>
                                <Input
                                    id="validDate"
                                    placeholder="What date will it start"
                                    className="rounded-lg border-none bg-[#5E5E5E33]/80 md:py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                                    {...register("validDate")}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="percentage" className="text-base font-medium">Percentage</Label>
                                <Input
                                    id="percentage"
                                    placeholder="Enter the percentage of discount"
                                    className="rounded-lg border-none bg-[#5E5E5E33]/80 md:py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                                    {...register("percentage")}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="minimumAmount" className="text-base font-medium">Minimum amount</Label>
                            <Input
                                id="minimumAmount"
                                placeholder="Enter the minimum order amount"
                                className="rounded-lg border-none bg-[#5E5E5E33]/80 md:py-6 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                                {...register("minimumAmount")}
                            />
                        </div>

                        <div className="w-full overflow-hidden">
                            <Label htmlFor="aboutPromo" className="text-base font-medium">About promo</Label>
                            <div className="sm:-mx-4 p-4">
                                <textarea
                                    id="aboutPromo"
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
                                    " {...register("aboutPromo")} />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full md:py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
                            style={{ background: "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)" }}
                        >
                            Add
                        </Button>

                        <Button
                            onClick={() => setIsOpen(!open)}
                            className="w-full md:py-6 rounded-full cursor-pointer text-[#EB4335] font-semibold transition-all duration-200"
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
