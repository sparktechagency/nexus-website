
"use client"

import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface AddPromoInfoProps {
    open: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const AddPromoInfo = ({ open, setIsOpen }: AddPromoInfoProps) => {
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [isScrollable, setIsScrollable] = useState(false);

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

            <div className="text-[#fff]">
                <h1 className="text-center text-[24px] py-4">Info</h1>
                <div className="w-full rounded-xl border-none shadow-lg">
                    <div className="space-y-6">
                        <p className="text-xl font-bold">About promo</p>
                        <div ref={contentRef}
                            className={`${isScrollable ? "border border-gray-700 rounded-2xl p-4  h-[250px] overflow-y-auto custom-scrollbar" : "border border-gray-700 rounded-2xl p-4  h-[250px] "}`}>

                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&rsquo;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
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