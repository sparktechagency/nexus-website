import { Button } from "@/components/ui/button"


const EditProfilePage = () => {
    return (
        <div className="text-[#ffff] px-4 md:px-6 lg:px-8 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <h1 className="text-xl font-semibold ">Basic info</h1>
                <div className="flex  items-center gap-3 ">
                    <Button className="w-[150px] py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
                        style={{
                            background:
                                "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
                        }}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="mask0_968_2960" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">
                                <rect width="18" height="18" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_968_2960)">
                                <path d="M3 15C2.5875 15 2.23438 14.8531 1.94063 14.5594C1.64688 14.2656 1.5 13.9125 1.5 13.5V4.5C1.5 4.0875 1.64688 3.73438 1.94063 3.44063C2.23438 3.14688 2.5875 3 3 3H15C15.4125 3 15.7656 3.14688 16.0594 3.44063C16.3531 3.73438 16.5 4.0875 16.5 4.5V13.5C16.5 13.9125 16.3531 14.2656 16.0594 14.5594C15.7656 14.8531 15.4125 15 15 15H3ZM9 9.75L3 6V13.5H15V6L9 9.75ZM9 8.25L15 4.5H3L9 8.25ZM3 6V4.5V13.5V6Z" fill="white" />
                            </g>
                        </svg>
                        Support</Button>
                    <h2 className="text-xl font-semibold">Gamers thought about you!</h2>
                </div>
            </div>
        </div>
    )
}

export default EditProfilePage
