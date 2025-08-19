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

interface PromoCode {
    id: string
    code: string
    validateDate: string
    percentage: number
    minimumAmount: number
    status: boolean
}

const mockPromoData: PromoCode[] = [
    {
        id: "1",
        code: "SAVE20",
        validateDate: "04/30/24",
        percentage: 5,
        minimumAmount: 500.0,
        status: true,
    },
    {
        id: "2",
        code: "WINTER24",
        validateDate: "12/31/24",
        percentage: 8,
        minimumAmount: 750.0,
        status: true,
    },
    {
        id: "3",
        code: "SPECIAL",
        validateDate: "01/01/24",
        percentage: 8,
        minimumAmount: 456.0,
        status: true,
    },
    {
        id: "4",
        code: "SUMMER",
        validateDate: "02/28/24",
        percentage: 2,
        minimumAmount: 320.0,
        status: true,
    },
    {
        id: "5",
        code: "FALLSAVE",
        validateDate: "03/31/24",
        percentage: 10,
        minimumAmount: 310.0,
        status: true,
    },
    {
        id: "6",
        code: "HOLIDAY",
        validateDate: "04/30/24",
        percentage: 2,
        minimumAmount: 470.0,
        status: true,
    },
    {
        id: "7",
        code: "NEWCUST",
        validateDate: "08/31/24",
        percentage: 30,
        minimumAmount: 890.0,
        status: true,
    },
    {
        id: "8",
        code: "LOYALTY",
        validateDate: "08/31/24",
        percentage: 50,
        minimumAmount: 695.0,
        status: true,
    },
    {
        id: "9",
        code: "FLASH500",
        validateDate: "07/25/24",
        percentage: 2,
        minimumAmount: 480.0,
        status: true,
    },
    {
        id: "10",
        code: "FLASH500",
        validateDate: "07/25/24",
        percentage: 2,
        minimumAmount: 480.0,
        status: true,
    },
    {
        id: "11",
        code: "FLASH500",
        validateDate: "07/25/24",
        percentage: 2,
        minimumAmount: 480.0,
        status: true,
    },
]

export default function PromoManagement() {
    const router = useRouter()
    const [isAddPromo, setIsAddPromo] = useState<boolean>(false)
    const [isEditPromo, setIsEditPromo] = useState<boolean>(false)
    const [isAddPromoInof, setIsAddPromoInof] = useState<boolean>(false)






    const handleBackClick = () => {
        router.push("/home")
    }




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
                                <TableHead className="text-[#ffff] font-bold text-lg">Promo Code</TableHead>
                                <TableHead className="text-[#ffff] font-bold text-lg">Validate Date</TableHead>
                                <TableHead className="text-[#ffff] font-bold text-lg">Percentage</TableHead>
                                <TableHead className="text-[#ffff] font-bold text-lg">Minimum Amount</TableHead>
                                <TableHead className="text-[#ffff] font-bold text-lg">Status</TableHead>
                                <TableHead className="text-[#ffff] font-bold text-lg">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockPromoData.map((promo) => (
                                <TableRow key={promo.id} className="text-[#ffff] border-none hover:bg-transparent cursor-pointer">
                                    <TableCell className="font-medium text-white">{promo.code}</TableCell>
                                    <TableCell className="text-gray-300">{promo.validateDate}</TableCell>
                                    <TableCell className="text-gray-300">{promo.percentage}%</TableCell>
                                    <TableCell className="text-gray-300">${promo.minimumAmount.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Switch
                                            className="data-[state=checked]:bg-green-600"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {/* add info */}
                                            <svg
                                                onClick={() => setIsAddPromoInof(!isAddPromoInof)}
                                                width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <mask id="mask0_1114_432" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_1114_432)">
                                                    <path d="M11 17H13V11H11V17ZM12 9C12.2833 9 12.5208 8.90417 12.7125 8.7125C12.9042 8.52083 13 8.28333 13 8C13 7.71667 12.9042 7.47917 12.7125 7.2875C12.5208 7.09583 12.2833 7 12 7C11.7167 7 11.4792 7.09583 11.2875 7.2875C11.0958 7.47917 11 7.71667 11 8C11 8.28333 11.0958 8.52083 11.2875 8.7125C11.4792 8.90417 11.7167 9 12 9ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z" fill="#00ACC1" />
                                                </g>
                                            </svg>

                                            {/* Edit  */}
                                            <svg
                                                onClick={() => setIsEditPromo(!isEditPromo)}
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
                />
            </CustomModal>


            {/* modal component(ADD_PROMO_INFO) */}
            <CustomModal
                open={isAddPromoInof}
                setIsOpen={setIsAddPromoInof}
                className={"p-4 max-h-[0vh]"}
                maxWidth={"md:!max-w-[70vw] xl:!max-w-[40vw]"}
            >
                <AddPromoInfo
                    open={isAddPromoInof}
                    setIsOpen={setIsAddPromoInof}
                />
            </CustomModal>
        </div>
    )
}
