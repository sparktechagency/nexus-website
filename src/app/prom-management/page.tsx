"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter } from "next/navigation"
import CustomModal from "@/components/modal/customModal"
import AddNewPromo from "@/components/modal/add-new-promo"
import EditPromo from "@/components/modal/edit-promo"
import AddPromoInfo from "@/components/modal/add-promo-info"
import { useDeletePromoApiMutation, useGetUserListApiQuery, useStatusChangePromoApiMutation } from "@/redux/website/promo/promoApi";
import toast from "react-hot-toast"

interface PromoCodeProps {
    id: number
    promo_code: string
    validate_date: string
    percentage: number | string
    minimum_amount: number
    is_active: boolean
}


export default function PromoManagement() {
    const router = useRouter()
    const [isAddPromo, setIsAddPromo] = useState<boolean>(false)
    const [isEditPromo, setIsEditPromo] = useState<boolean>(false)
    const [isAddPromoInof, setIsAddPromoInof] = useState<boolean>(false)
    const [viewPromoId, setViewPromoId] = useState<number | null>(null)









    const { data: getPromo, refetch } = useGetUserListApiQuery({ skip: true, });
    const promoData: PromoCodeProps[] = getPromo?.data?.data


    const [deletePromoApi] = useDeletePromoApiMutation();

    const [statusChangePromoApi] = useStatusChangePromoApiMutation()




    const handleBackClick = () => {
        router.push("/home")
    }


    // delete promo
    const handleDeletePromo = async (id: number) => {
        try {
            const res = await deletePromoApi(id).unwrap();

            if (res?.status === 'success') {
                toast.success(res?.message)
            } else {
                toast.error(res?.messages)
            }
        } catch (errors: any) {
            if (errors) {
                toast.error(errors.data?.message)
            }
        }
    }

    // view details promo
    const handleViewDetails = (id: number) => {
        setViewPromoId(id)
    }


    // Function to handle status change
   const handleChangeStatus = async (id: number, currentStatus: boolean) => {
        try {
            const newStatus = !currentStatus;
            const res = await statusChangePromoApi({ id, is_active: newStatus }).unwrap();
            if (res?.status === 'success') {
                toast.success(res?.message || 'Promo status updated successfully');
                refetch();
            } else {
                toast.error(res?.message || 'Failed to update promo status');
            }
        } catch (error: any) {
            toast.error(error?.data?.message || 'An error occurred while updating status');
        }
    };




    return (
        <div className="text-[#fff]  px-4 md:px-6 lg:px-8 mb-6 pt-4">
            <div className="flex flex-col md:flex-row md:justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-4">

                        <svg
                            onClick={handleBackClick}
                            className="cursor-pointer"
                            width="18" height="30" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 30L0 15L15 0L17.6625 2.6625L5.325 15L17.6625 27.3375L15 30Z" fill="white" />
                        </svg>

                        <h1 className="text-xl font-medium">Manage Promo</h1>

                    </div>
                    <p className="text-sm pl-8 mb-6 ">
                        You can update your room information from here & also can add a new room.
                    </p>
                </div>

                <div>
                    <Button
                        onClick={() => setIsAddPromo(!isAddPromo)}
                        className="w-[160px] px-4 md:py-5 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
                        style={{
                            background:
                                "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
                        }}
                    >
                        Add A New Promo
                    </Button>
                </div>
            </div>



            <div className="bg-gradient-to-r from-[#0f0829] via-black to-[#0f0829] rounded-lg p-6 ">

                {/* Table */}
                <div className="px-4 border rounded-2xl border-gray-800">

                    <Table>
                        <TableHeader className="border-none">
                            <TableRow className="border-none hover:bg-transparent cursor-pointer">
                                <TableHead className="text-[#ffff] font-bold text-lg text-center">Promo Code</TableHead>
                                <TableHead className="text-[#ffff] font-bold text-lg text-center">Validate Date</TableHead>
                                <TableHead className="text-[#ffff] font-bold text-lg text-center">Percentage</TableHead>
                                <TableHead className="text-[#ffff] font-bold text-lg text-center">Minimum Amount</TableHead>
                                <TableHead className="text-[#ffff] font-bold text-lg">Status</TableHead>
                                <TableHead className="text-[#ffff] font-bold text-lg text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {promoData?.map((item) => (
                                <TableRow key={item.id} className="text-[#ffff] border-none hover:bg-transparent cursor-pointer">
                                    <TableCell className="font-medium text-white text-center">{item.promo_code}</TableCell>
                                    <TableCell className="text-gray-300 text-center ">{item.validate_date}</TableCell>
                                    <TableCell className="text-gray-300 text-center">{item.percentage}%</TableCell>
                                    <TableCell className="text-gray-300 text-center">${item.minimum_amount}</TableCell>


                                    <TableCell>
                                        <Switch
                                            checked={item.is_active}
                                            onCheckedChange={() => handleChangeStatus(item.id, item.is_active)}
                                            className="data-[state=checked]:bg-green-600 cursor-pointer"
                                        />
                                    </TableCell>




                                    <TableCell>
                                        <div className="flex items-center gap-4 justify-center">
                                            {/* add info */}
                                            <svg
                                                onClick={() => {
                                                    setIsAddPromoInof(!isAddPromoInof);
                                                    handleViewDetails(item.id)
                                                }}
                                                width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <mask id="mask0_1114_432" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_1114_432)">
                                                    <path d="M11 17H13V11H11V17ZM12 9C12.2833 9 12.5208 8.90417 12.7125 8.7125C12.9042 8.52083 13 8.28333 13 8C13 7.71667 12.9042 7.47917 12.7125 7.2875C12.5208 7.09583 12.2833 7 12 7C11.7167 7 11.4792 7.09583 11.2875 7.2875C11.0958 7.47917 11 7.71667 11 8C11 8.28333 11.0958 8.52083 11.2875 8.7125C11.4792 8.90417 11.7167 9 12 9ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z" fill="#00ACC1" />
                                                </g>
                                            </svg>

                                            {/* Delete */}
                                            <svg
                                                onClick={() => handleDeletePromo(item.id)}
                                                className="cursor-pointer"
                                                width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 18C2.45 18 1.97933 17.8043 1.588 17.413C1.19667 17.0217 1.00067 16.5507 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8043 17.021 14.413 17.413C14.0217 17.805 13.5507 18.0007 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z" fill="#EB4335" />
                                            </svg>


                                            {/* Edit  */}
                                            <svg
                                                onClick={() => {
                                                    setIsEditPromo(!isEditPromo);
                                                    handleViewDetails(item.id)
                                                }}
                                                width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.414 15.8902L16.556 5.74822L15.142 4.33422L5 14.4762V15.8902H6.414ZM7.243 17.8902H3V13.6472L14.435 2.21222C14.6225 2.02475 14.8768 1.91943 15.142 1.91943C15.4072 1.91943 15.6615 2.02475 15.849 2.21222L18.678 5.04122C18.8655 5.22875 18.9708 5.48306 18.9708 5.74822C18.9708 6.01338 18.8655 6.26769 18.678 6.45522L7.243 17.8902ZM3 19.8902H21V21.8902H3V19.8902Z" fill="#1E88E5" />
                                            </svg>

                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>



            {/* modal component(Add_PROMO) */}
            <CustomModal
                open={isAddPromo}
                setIsOpen={setIsAddPromo}
                className={"p-4 max-h-[0vh]"}
                maxWidth={"md:!max-w-[70vw] xl:!max-w-[40vw]"}
            >
                <AddNewPromo open={isAddPromo}
                    setIsOpen={setIsAddPromo} />
            </CustomModal>



            {/* modal component(EDIT_PROMO) */}
            <CustomModal
                open={isEditPromo}
                setIsOpen={setIsEditPromo}
                className={"p-4 max-h-[0vh]"}
                maxWidth={"md:!max-w-[70vw] xl:!max-w-[40vw]"}
            >
                <EditPromo
                    open={isEditPromo}
                    setIsOpen={setIsEditPromo}
                    updatePromoId={viewPromoId}
                />
            </CustomModal>


            {/* modal component(ADD_PROMO_INFO_DETAILS) */}
            <CustomModal
                open={isAddPromoInof}
                setIsOpen={setIsAddPromoInof}
                className={"p-4 max-h-[0vh]"}
                maxWidth={"md:!max-w-[70vw] xl:!max-w-[40vw]"}
            >
                <AddPromoInfo
                    open={isAddPromoInof}
                    setIsOpen={setIsAddPromoInof}
                    viewPromoId={viewPromoId}
                />
            </CustomModal>
        </div>
    )
}
