"use client"

import { ChevronDown } from "lucide-react"
import Image from "next/image"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useState } from "react";
import CustomModal from "@/components/modal/customModal";
import TermsAndCondition from "@/components/terms-and-condition/page";
import { usePathname, useRouter } from "next/navigation";
import PrivacyPolicy from "@/components/privacy-policy/page";
import EditProfile from "@/components/edit-profile/page";
import Link from "next/link";



export default function Navbar() {
    const router = useRouter()
    const [isTerms, setIsTerms] = useState(false)
    const [isPrivacy, setIsPrivacy] = useState(false)
    const [isProfile, setIsProfile] = useState(false)
    const pathname = usePathname();
    const isActive = (path: string) => pathname === path;

    const handleMenuClick = (value: string) => {
        if (value === "Home") {
            router.push('/home')
        }
       else if (value === "Rooms") {
            router.push('/room')
        }
       else if (value === "Bookings") {
            router.push('/booking')
        }
       else if (value === "Profile") {
            router.push('/profile')
        }
       else if (value === "Logout") {
            router.push('/')
        }
        else if (value === "User History") {
            router.push('/user-list')
        }
        else if (value === "Manage Promo") {
            router.push('/prom-management')
        }
    };

    const handleNotification = () => {
        router.push('/web-notification')
    }

    const handleNavigateHome = () => {
        router.push('/home')
    }



    return (
        <div className="  text-white px-4 md:px-6 lg:px-8 mb-6 mt-4">
            {/* Navbar */}
            <nav className="bg-[#1e1829] flex items-center justify-between bg-card-bg rounded-full p-2 md:p-4 mb-6 shadow-lg">
                <div
                    onClick={handleNavigateHome}
                    className="cursor-pointer flex items-center space-x-1 md:space-x-4">
                    <Image
                        src="/web_pic/logo.png"
                        alt="Nexus Logo"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <span className="md:text-2xl font-bold tracking-wider">NEXUS</span>
                </div>

                <div className="hidden xl:flex items-center space-x-6">
                    <Link
                        href="/home"
                        className={`px-4 py-1 rounded-full transition-colors ${isActive('/home')
                            ? 'bg-[#0b041a] shadow-[0_0_10px_3px_rgba(8,112,184,0.7)] text-white'
                            : 'text-gray-300 '
                            }`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/room"
                        className={`px-4 py-1 rounded-full transition-colors ${isActive('/room')
                            ? 'bg-[#0b041a] shadow-[0_0_10px_3px_rgba(8,112,184,0.7)] text-white'
                            : 'text-gray-300 '
                            }`}
                    >
                        Rooms
                    </Link>
                    <Link
                        href="/booking"
                        className={`px-4 py-1 rounded-full transition-colors ${isActive('/booking')
                            ? 'bg-[#0b041a] shadow-[0_0_10px_3px_rgba(8,112,184,0.7)] text-white'
                            : 'text-gray-300 '
                            }`}
                    >
                        Bookings
                    </Link>
                    <Link
                        href="/profile"
                        className={`px-4 py-1 rounded-full transition-colors ${isActive('/profile')
                            ? 'bg-[#0b041a] shadow-[0_0_10px_3px_rgba(8,112,184,0.7)] text-white'
                            : 'text-gray-300 '
                            }`}
                    >
                        Profile
                    </Link>

                </div>
                <div className="flex items-center space-x-4">
                    <svg
                        onClick={handleNotification}
                        className="w-[30px] h-[30px] md:w-[45px] md:h-[45px]  cursor-pointer rounded-full" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="56" height="56" rx="24" fill="#5E5E5E" fillOpacity="0.2" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M21 34C20.8296 33.9999 20.662 33.9562 20.5132 33.8732C20.3644 33.7902 20.2393 33.6705 20.1498 33.5256C20.0602 33.3806 20.0092 33.2152 20.0015 33.0449C19.9938 32.8747 20.0298 32.7054 20.106 32.553L22 28.764V26C22 22.272 24.55 19.14 28 18.252C31.45 19.14 34 22.272 34 26V28.764L35.894 32.553C35.9701 32.7054 36.0061 32.8747 35.9984 33.0449C35.9907 33.2152 35.9397 33.3806 35.8502 33.5256C35.7606 33.6705 35.6355 33.7902 35.4867 33.8732C35.3379 33.9562 35.1703 33.9999 35 34H21Z" fill="black" fillOpacity="0.2" />
                        <path d="M32 34C32 35.0608 31.5785 36.0782 30.8284 36.8284C30.0782 37.5785 29.0608 38 28 38C26.9391 38 25.9217 37.5785 25.1715 36.8284C24.4214 36.0782 24 35.0608 24 34M21 34C20.8296 33.9999 20.662 33.9562 20.5132 33.8732C20.3644 33.7902 20.2393 33.6705 20.1498 33.5256C20.0602 33.3806 20.0092 33.2152 20.0015 33.0449C19.9938 32.8747 20.0298 32.7054 20.106 32.553L22 28.763V26C22 22.272 24.55 19.14 28 18.252C31.45 19.14 34 22.272 34 26V28.764L35.894 32.553C35.9701 32.7054 36.0061 32.8747 35.9984 33.0449C35.9907 33.2152 35.9397 33.3806 35.8502 33.5256C35.7606 33.6705 35.6355 33.7902 35.4867 33.8732C35.3379 33.9562 35.1703 33.9999 35 34H21Z" stroke="#C2C2C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>




                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center space-x-1 md:space-x-2 cursor-pointer focus:outline-none bg-[#292531] p-2 md:p-3 rounded-full">

                            <div className="relative">
                                <Image
                                    src="/home/photo1.png"
                                    alt="Angkara Messi"
                                    width={30}
                                    height={30}
                                    className="w-[15px] h-[15px] md:w-[30px] md:h-[30px] rounded-full object-cover flex-shrink-0"
                                />

                                <svg
                                    className="w-[10px] h-[10px] md:w-[15px] md:h-[15px] absolute -top-2 md:-top-2.5 -right-1"
                                    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_968_2048)">
                                        <path d="M14.4235 11.2032L15.2696 5.67116L13.0928 7.88427L12.4856 4.02403L9.71492 7.34852L8.0001 2.56299L6.28528 7.34852L3.51458 4.02403L2.90745 7.88427L0.730591 5.67116L1.57675 11.2032V12.6855H14.4235V11.2032Z" fill="#FFDB0C" />
                                        <path d="M14.4233 11.2032L15.2695 5.67116L13.0927 7.88427L12.4855 4.02403L9.71482 7.34852L8 2.56299V12.6855H14.4233V11.2032Z" fill="#FBBF00" />
                                        <path d="M14.4232 11.2031H1.57654V14.1678H14.4232V11.2031Z" fill="#FFA900" />
                                        <path d="M14.4235 11.2031H8V14.1678H14.4235V11.2031Z" fill="#FF8800" />
                                        <path d="M0.730536 6.4015C1.134 6.4015 1.46107 6.07443 1.46107 5.67097C1.46107 5.2675 1.134 4.94043 0.730536 4.94043C0.327072 4.94043 0 5.2675 0 5.67097C0 6.07443 0.327072 6.4015 0.730536 6.4015Z" fill="#FF8800" />
                                        <path d="M3.51435 4.75404C3.91781 4.75404 4.24488 4.42697 4.24488 4.0235C4.24488 3.62004 3.91781 3.29297 3.51435 3.29297C3.11089 3.29297 2.78381 3.62004 2.78381 4.0235C2.78381 4.42697 3.11089 4.75404 3.51435 4.75404Z" fill="#FF421D" />
                                        <path d="M8.00007 3.2931C8.40353 3.2931 8.7306 2.96603 8.7306 2.56257C8.7306 2.1591 8.40353 1.83203 8.00007 1.83203C7.5966 1.83203 7.26953 2.1591 7.26953 2.56257C7.26953 2.96603 7.5966 3.2931 8.00007 3.2931Z" fill="#DE0418" />
                                        <path d="M15.2695 6.4015C15.6729 6.4015 16 6.07443 16 5.67097C16 5.2675 15.6729 4.94043 15.2695 4.94043C14.866 4.94043 14.5389 5.2675 14.5389 5.67097C14.5389 6.07443 14.866 6.4015 15.2695 6.4015Z" fill="#870215" />
                                        <path d="M12.4857 4.75404C12.8891 4.75404 13.2162 4.42697 13.2162 4.0235C13.2162 3.62004 12.8891 3.29297 12.4857 3.29297C12.0822 3.29297 11.7551 3.62004 11.7551 4.0235C11.7551 4.42697 12.0822 4.75404 12.4857 4.75404Z" fill="#A3021A" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_968_2048">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>

                            </div>

                            <span className="text-xs md:text-xl md:font-medium">Md. Jusef</span>
                            <ChevronDown className="md:w-4 md:h-4 text-gray-300" />
                        </DropdownMenuTrigger>










                        <DropdownMenuContent className="bg-[#292531] border-none text-white">
                            {/* small/medium device */}
                            <div className="xl:hidden">
                                <DropdownMenuItem onClick={() => { handleMenuClick("Home") }} className="hover:bg-gray-700 cursor-pointer">Home</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => { handleMenuClick("Rooms") }} className="hover:bg-gray-700 cursor-pointer">Rooms</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => { handleMenuClick("Bookings") }} className="hover:bg-gray-700 cursor-pointer">Bookings</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => { handleMenuClick("Profile") }} className="hover:bg-gray-700 cursor-pointer">Profile</DropdownMenuItem>
                            </div>
                            <DropdownMenuItem onClick={() => { handleMenuClick("User History") }} className="hover:bg-gray-700 cursor-pointer">User History</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { handleMenuClick("Manage Promo") }} className="hover:bg-gray-700 cursor-pointer">Manage Promo</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { handleMenuClick("Change Password"); setIsProfile(!isProfile); }} className="hover:bg-gray-700 cursor-pointer">Change Password</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { handleMenuClick("Terms & Conditions"); setIsTerms(!isTerms); }} className="hover:bg-gray-700 cursor-pointer">Terms & Conditions</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { handleMenuClick("Privacy Policy"); setIsPrivacy(!isPrivacy); }} className="hover:bg-gray-700 cursor-pointer">Privacy Policy</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { handleMenuClick("Logout") }} className="hover:bg-gray-700 cursor-pointer">Logout</DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>






            {/* modal component(TERMS_AND_CONDITION) */}
            <CustomModal
                open={isTerms}
                setIsOpen={setIsTerms}
                className={"p-4 max-h-[0vh]"}
                maxWidth={"md:!max-w-[70vw] xl:!max-w-[50vw]"}
            >
                <TermsAndCondition />
            </CustomModal>


            {/* modal component(PRIVACY) */}
            <CustomModal
                open={isPrivacy}
                setIsOpen={setIsPrivacy}
                className={"p-4 max-h-[0vh]"}
                maxWidth={"md:!max-w-[70vw] xl:!max-w-[50vw]"}
            >
                <PrivacyPolicy />
            </CustomModal>



            {/* modal component(EDIT_PROFILE) */}
            <CustomModal
                open={isProfile}
                setIsOpen={setIsProfile}
                className={"p-4 max-h-[0vh]"}
                maxWidth={"md:!max-w-[70vw] xl:!max-w-[40vw]"}
            >
                <EditProfile />
            </CustomModal>
        </div>
    )
}
