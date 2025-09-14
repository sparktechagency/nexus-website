
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { useGetZoonDetailsApiQuery } from "@/redux/dashboard/zoonListing/zoonListingApi";

interface ZoneListProps {
    open: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    viewDetailsId : string | number;
}


export default function ZoneListDetails({ open, setIsOpen,viewDetailsId }: ZoneListProps) {

const {data:getzoonDetails} = useGetZoonDetailsApiQuery(viewDetailsId)
const zoonDetailsData = getzoonDetails?.data

console.log(zoonDetailsData)

    return (
        <div className=" text-white">
            {/* Image */}
            <div className="flex justify-center">
                <Image
                    src={zoonDetailsData?.avatar} // Replace with your image path
                    alt="photo"
                    width={500}
                    height={500}
                    className="max-w-[200px] object-cover rounded-lg w-full"
                />
            </div>

            {/* Content */}
            <div className="p-4">
                <h2 className="text-lg font-bold">{zoonDetailsData?.gaming_zone_name}</h2>
                <div className="flex items-center justify-between mt-2 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{zoonDetailsData?.address}</span>
                    </div>
                    <span>{zoonDetailsData?.opening_time} - {zoonDetailsData?.closing_time}</span>
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
