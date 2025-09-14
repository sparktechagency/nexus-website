



import { Button } from "@/components/ui/button"
import { useDeleteUserApiMutation, useGetUserApiQuery } from "@/redux/dashboard/manageUsers/manageUserApi";
import { skip } from "node:test";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

interface DeleteManageUserProps {
    open: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    deleteId: string | number
}


const DeleteManageUser = ({ open, setIsOpen, deleteId }: DeleteManageUserProps) => {

    const [deleteUserApi,] = useDeleteUserApiMutation()
    // Fetch user list with refetch option
    const { refetch } = useGetUserApiQuery({})

    const handleDeletRole = async () => {
        try {
            const res = await deleteUserApi({ id: deleteId }).unwrap();
            console.log(res)
            if (res?.status === 'success') {
                toast.success(res?.message)
                refetch()
            }
        } catch (errors) {
            console.log(errors)
        }
    }

    return (
        <div className="text-[#fff]">
            <h1 className="text-center text-3xl font-bold py-4">Delete User</h1>
            <p className="text-lg  text-center leading-relaxed text-gray-500">
                If you delete the user, it will be permanently <br /> removed from your dashboard
            </p>



            <div className="flex justify-center items-center gap-4 mb-8 mt-16">
                <Button
                    onClick={() => {
                        setIsOpen(!open),
                            handleDeletRole()
                    }}
                    className="w-[40%] py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
                    style={{
                        background:
                            "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
                    }}
                >
                    Delete
                </Button>
                <Button
                    onClick={() => setIsOpen(!open)}
                    className="w-[40%] bg-[#151515] hover:bg-[#151515] hover:opacity-90  text-red-500 flex justify-center items-center rounded-full text-center py-6 text-[16px] cursor-pointer">
                    Cancel
                </Button>
            </div>
        </div>
    )
}

export default DeleteManageUser
