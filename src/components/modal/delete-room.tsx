import { Button } from "@/components/ui/button"
import { Dispatch, SetStateAction } from "react";

interface RoomCancelledProps {
    open: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}


const DeleteRoom = ({ open, setIsOpen }: RoomCancelledProps) => {
    return (
        <div className="text-[#fff]">
            <h1 className="text-center text-[24px] pb-4">Are you sure?</h1>


            <div className="flex flex-col items-center justify-center   p-4">
                <p className="text-lg  leading-relaxed">
                    You want to delete this room.
                </p>
            </div>


            <div className="flex justify-center items-center gap-4 mt-16">
                <Button
                    onClick={() => setIsOpen(!open)}
                    className="w-[40%] md:py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
                    style={{
                        background:
                            "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
                    }}
                >
                    Delete
                </Button>
                <Button
                    onClick={() => setIsOpen(!open)}
                    className="w-[40%] bg-[#151515] hover:bg-[#151515] hover:opacity-90  text-red-500 flex justify-center items-center rounded-full text-center md:py-6 text-[16px] cursor-pointer">
                    Cancel
                </Button>
            </div>
        </div>
    )
}

export default DeleteRoom
