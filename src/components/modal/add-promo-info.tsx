
"use client"

import { Button } from "@/components/ui/button";
import { useViewDetailsPromoApiQuery } from "@/redux/website/promo/promoApi";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface AddPromoInfoProps {
    open: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    viewPromoId: number | null;
}

const AddPromoInfo = ({ open, setIsOpen,viewPromoId }: AddPromoInfoProps) => {
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [isScrollable, setIsScrollable] = useState(false);

const { data:viewDetailsPromo } = useViewDetailsPromoApiQuery(viewPromoId);
const singlePromoData = viewDetailsPromo?.data




    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;
        const MAX = 250;

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

            <div className="text-[#fff] xl:p-8">
                <h1 className="text-center text-[24px] py-4">Information</h1>
                <div className="w-full rounded-xl border-none shadow-lg">
                    <div className="space-y-6">
                        <p className="text-xl font-bold">About promo</p>
                        <div ref={contentRef}
                            className={`${isScrollable ? "border border-gray-700 rounded-2xl p-4  h-[250px] overflow-y-auto custom-scrollbar" : "border border-gray-700 rounded-2xl p-4  h-[250px] "}`}>

                            <p className=" overflow-hidden custom-scrollbar">
                                {singlePromoData?.about}
                            </p>

                        </div>

                        <Button
                            onClick={() => setIsOpen(!open)}
                            className="w-full border-none md:py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200 mt-8"
                            style={{ background: "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)" }}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddPromoInfo;