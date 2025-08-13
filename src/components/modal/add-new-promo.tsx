"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "../ui/textarea"
import { useEffect, useRef, useState } from "react"



const AddNewPromo = () => {
    const contentRef = useRef<HTMLTextAreaElement | null>(null);
    const [isScrollable, setIsScrollable] = useState<boolean>(false);

    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;
        const MAX = 620;

        const check = () => setIsScrollable(el.scrollHeight > MAX);
        check(); // initial

        // update on content resize (works for dynamic content)
        const ro = new ResizeObserver(check);
        ro.observe(el);

        // also update on window resize
        window.addEventListener("resize", check);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", check);
        };
    }, []);





    return (
        <>
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
        /* Firefox fallback */
        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #6523E7 transparent; }
      `}</style>

            <div className="text-[#fff]">
                <h1 className="text-center text-[24px] py-4">Add A New Promo</h1>



                <div className="w-full rounded-xl border-none  shadow-lg">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="promo-code" className="text-base font-medium">
                                Promo Code
                            </Label>
                            <Input
                                id="promo-code"
                                placeholder="Enter the promo code name"
                                className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6  text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="valid-date" className="text-base font-medium">
                                    Validate Date
                                </Label>
                                <Input
                                    id="valid-date"
                                    placeholder="What date will it start"
                                    className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6  text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="percentage" className="text-base font-medium">
                                    Percentage
                                </Label>
                                <Input
                                    id="percentage"
                                    placeholder="Enter the percentage of discount"
                                    className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6  text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                        </div>



                        <div className="space-y-2">
                            <Label htmlFor="minimum-amount" className="text-base font-medium">
                                Minimum amount
                            </Label>
                            <Input
                                id="minimum-amount"
                                placeholder="Enter the minimum order amount"
                                className="rounded-lg border-none bg-[#5E5E5E33]/80 py-6  text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500"
                            />
                        </div>



                        <div className="space-y-2">
                            <Label htmlFor="about-promo" className="text-base font-medium">
                                About promo
                            </Label>
                            <Textarea
                                id="about-promo"
                                placeholder="Describe the promotion details"
                                ref={contentRef}
                                className={`resize-none rounded-lg border-none bg-[#5E5E5E33]/80 text-white placeholder:text-gray-500 focus:border-none focus:outline-none focus:ring-0 focus:ring-offset-0 overflow-y-auto custom-scrollbar ${!isScrollable && "h-[150px]"}`} />
                        </div>


                        <Button
                            className="w-full py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
                            style={{
                                background:
                                    "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
                            }}
                        >
                            Add
                        </Button>
                        <Button
                            className="w-full py-6 rounded-full cursor-pointer text-[#EB4335] font-semibold transition-all duration-200">
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </>

    )
}

export default AddNewPromo
