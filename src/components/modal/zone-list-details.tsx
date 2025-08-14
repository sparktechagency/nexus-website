
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

interface ZoneListProps {
    open: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}


export default function ZoneListDetails({ open, setIsOpen }: ZoneListProps) {
    return (
        <div className=" text-white">
            {/* Image */}
            <div className="">
                <Image
                    src="/zone1.png" // Replace with your image path
                    alt="Turbo Gaming Zone"
                    width={500}
                    height={500}
                    className="object-cover rounded-lg w-full"
                />
            </div>

            {/* Content */}
            <div className="p-4">
                <h2 className="text-lg font-bold">Turbo Gaming Zone</h2>
                <div className="flex items-center justify-between mt-2 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>Los Angeles, USA</span>
                    </div>
                    <span>10:00 AM - 08:00 PM</span>
                </div>
            </div>
            

            {/* Close Button */}
            <div className="p-4">
                <Button
                    className="w-full py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
                    onClick={() => setIsOpen(!open)}
                    style={{
                        background:
                            "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
                    }}
                >
                    Close
                </Button>
            </div>
        </div>
    );
}
