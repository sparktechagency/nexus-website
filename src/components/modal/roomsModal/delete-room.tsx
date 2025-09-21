import { Button } from "@/components/ui/button"
import { useDeleteRoomApiMutation } from "@/redux/website/rooms/roomApi";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

interface RoomCancelledProps {
    open: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    deleteId: number;
}


interface ApiError {
    data: {
        message: string;
    };
}



const DeleteRoom = ({ open, setIsOpen, deleteId }: RoomCancelledProps) => {

    // delete api
    const [deleteRoomApi] = useDeleteRoomApiMutation()



    // delete room function
    const handleDelete = async () => {
        try {
            const res = await deleteRoomApi(deleteId).unwrap();
            if (res?.status === 'success') {
                toast.success(res?.message)
            } else {
                toast.error(res?.messages)
            }
        } catch (errors) {
           const errorValue = errors as ApiError;
            if (errorValue?.data?.message) {
                toast.error(errorValue?.data?.message); // Now you can safely access error.data.message
            }
        }
    }



    return (
        <div className="text-[#fff xl:p-8">
            <h1 className="text-center text-[24px] pb-4">Are you sure?</h1>


            <div className="flex flex-col items-center justify-center   p-4">
                <p className="text-lg  leading-relaxed">
                    You want to delete this room.
                </p>
            </div>


            <div className="flex justify-center items-center gap-4 mt-16">
                <Button
                    onClick={() => {
                        setIsOpen(!open);
                            handleDelete()
                    }}
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
