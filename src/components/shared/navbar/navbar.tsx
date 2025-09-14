"use client"

import { ChevronDown } from "lucide-react"
import Image from "next/image"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useState } from "react";
import CustomModal from "@/components/modal/customModal";
import { usePathname, useRouter } from "next/navigation";
import EditProfile from "@/components/modal/accounts/page";
import Link from "next/link";
import Cookies from 'js-cookie';
import TermsAndCondition from "@/components/modal/accounts/terms-and-condition/page";
import PrivacyPolicy from "@/components/modal/accounts/privacy-policy/page";
import { useGetWebNotificationApiQuery } from "@/redux/website/notification/webNotificationApi";
import { useGetProfileApiQuery } from "@/redux/website/profile/profileApi";


export default function Navbar() {
    const router = useRouter()
    const [isTerms, setIsTerms] = useState(false)
    const [isPrivacy, setIsPrivacy] = useState(false)
    const [isProfile, setIsProfile] = useState(false)
    const pathname = usePathname();
    const isActive = (path: string) => pathname === path;

    const { data: getNotification } = useGetWebNotificationApiQuery(undefined, {
        pollingInterval: 5000, // Poll every 5 seconds
        refetchOnFocus: true, // Optionally refetch when the tab gains focus
    });
    const notificationCount = getNotification?.data?.unread_notifications_count || 0


    const { data: getProfile } = useGetProfileApiQuery(null)
    const profileData = getProfile?.data



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
            Cookies.remove('token');
            Cookies.remove('role');
            Cookies.remove('subscription_status');
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
                    <div className="relative cursor-pointer">
                        <svg
                            onClick={handleNotification}
                            className=" w-[30px] h-[30px] md:w-[45px] md:h-[45px]  rounded-full" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="56" height="56" rx="24" fill="#5E5E5E" fillOpacity="0.2" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M21 34C20.8296 33.9999 20.662 33.9562 20.5132 33.8732C20.3644 33.7902 20.2393 33.6705 20.1498 33.5256C20.0602 33.3806 20.0092 33.2152 20.0015 33.0449C19.9938 32.8747 20.0298 32.7054 20.106 32.553L22 28.764V26C22 22.272 24.55 19.14 28 18.252C31.45 19.14 34 22.272 34 26V28.764L35.894 32.553C35.9701 32.7054 36.0061 32.8747 35.9984 33.0449C35.9907 33.2152 35.9397 33.3806 35.8502 33.5256C35.7606 33.6705 35.6355 33.7902 35.4867 33.8732C35.3379 33.9562 35.1703 33.9999 35 34H21Z" fill="black" fillOpacity="0.2" />
                            <path d="M32 34C32 35.0608 31.5785 36.0782 30.8284 36.8284C30.0782 37.5785 29.0608 38 28 38C26.9391 38 25.9217 37.5785 25.1715 36.8284C24.4214 36.0782 24 35.0608 24 34M21 34C20.8296 33.9999 20.662 33.9562 20.5132 33.8732C20.3644 33.7902 20.2393 33.6705 20.1498 33.5256C20.0602 33.3806 20.0092 33.2152 20.0015 33.0449C19.9938 32.8747 20.0298 32.7054 20.106 32.553L22 28.763V26C22 22.272 24.55 19.14 28 18.252C31.45 19.14 34 22.272 34 26V28.764L35.894 32.553C35.9701 32.7054 36.0061 32.8747 35.9984 33.0449C35.9907 33.2152 35.9397 33.3806 35.8502 33.5256C35.7606 33.6705 35.6355 33.7902 35.4867 33.8732C35.3379 33.9562 35.1703 33.9999 35 34H21Z" stroke="#C2C2C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        <p className="absolute -top-1 left-8 text-[10px] bg-red-500 p-[3px] rounded-full">{notificationCount}</p>
                    </div>


                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center space-x-1 md:space-x-2 cursor-pointer focus:outline-none bg-[#292531] p-2 md:p-3 rounded-full">

                            <div className="relative">
                                {
                                    profileData?.avatar && <Image
                                        src={profileData?.avatar}
                                        alt="photo"
                                        width={30}
                                        height={30}
                                        className="w-[15px] h-[15px] md:w-[30px] md:h-[30px] rounded-full object-cover flex-shrink-0"
                                    />
                                }

                                {
                                    profileData?.subscription_type === "Free"
                                        ? ""
                                        : profileData?.subscription_type === "Basic"
                                            ? (<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M62.4899 23.5322L41.7601 21.6096L33.5256 2.48853C32.9491 1.14966 31.0507 1.14966 30.4742 2.48853L22.2399 21.6097L1.51003 23.5322C0.0585351 23.6669 -0.528089 25.4722 0.567034 26.4342L16.2078 40.1745L11.6305 60.4839C11.31 61.9059 12.8458 63.0217 14.0991 62.2774L32 51.6482L49.9008 62.2774C51.1542 63.0217 52.6901 61.9059 52.3696 60.4839L47.7922 40.1745L63.4329 26.4342C64.528 25.4722 63.9414 23.6669 62.4899 23.5322Z" fill="#FFDC64" />
                                                <path d="M33.5256 2.48853C32.9491 1.14966 31.0507 1.14966 30.4742 2.48853L22.2399 21.6097L1.51003 23.5322C0.0585351 23.6669 -0.528089 25.4722 0.567034 26.4342L16.2078 40.1745L11.6305 60.4839C11.31 61.9059 12.8458 63.0217 14.0991 62.2774L18.0945 59.9051C18.6475 37.1425 29.2237 21.1129 37.5972 11.943L33.5256 2.48853Z" fill="#FFC850" />
                                            </svg>
                                            )
                                            : profileData?.subscription_type === "Standard"
                                                ? (
                                                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.057 63.6808C13.6978 63.6808 13.4057 63.4472 13.3319 63.1057L12.2068 58.2677L1.48069 63.5432C0.838694 63.8546 0.155209 63.1868 0.480636 62.5432L5.74371 51.7921L0.905728 50.667C0.204231 50.5014 0.118149 49.5524 0.768116 49.2543L14.0444 43.1661C14.7525 42.8385 15.3012 43.6249 15.0523 44.1756C17.0048 45.3306 21.1892 49.268 20.8701 49.9918L14.7444 63.2432C14.6195 63.5057 14.3445 63.6808 14.057 63.6808Z" fill="#FDBF00" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1954 35.3662C15.1828 35.3662 15.1704 35.3662 15.1704 35.3662L0.719024 34.8162C0.0554737 34.7896 -0.257993 33.9486 0.256428 33.5036L17.1331 18.5023C17.233 18.4147 17.3455 18.3523 17.4831 18.3273L25.9714 16.5646C26.7687 16.3947 18.3976 29.4508 15.0473 33.8708C16.4332 33.9246 16.0649 35.3662 15.1954 35.3662Z" fill="#FF193D" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M29.9344 64.0067C29.5411 64.0067 29.1998 63.6699 29.1843 63.2816L28.6343 48.8302C28.6038 47.9372 43.3426 38.6044 45.9834 37.7121C46.2229 36.7955 47.6359 37.1053 47.4484 38.0542L45.6857 46.5425C45.6608 46.6675 45.5982 46.7925 45.5107 46.8926L30.497 63.7567C30.347 63.9191 30.1469 64.0067 29.9344 64.0067Z" fill="#FF193D" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M29.3463 49.5671C29.1462 49.5671 28.9587 49.4921 28.8213 49.3421L14.6449 35.1782C14.4324 34.9658 14.3698 34.6532 14.4699 34.3781C21.921 14.3954 41.8857 0.179795 63.2369 2.75944e-05C63.6726 -0.00366371 64.0029 0.363548 63.9995 0.762653C63.8848 14.3727 58.0044 27.6848 48.348 37.3411C42.96 42.7291 36.6468 46.8295 29.6088 49.5298C29.5338 49.5547 29.4337 49.5671 29.3463 49.5671Z" fill="#E1F1FA" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M45.9989 3.2252C51.4789 1.18523 57.3044 0.0499324 63.2372 2.75944e-05C63.6729 -0.00366371 64.0032 0.363548 63.9998 0.762653C63.9502 6.65 62.8208 12.4814 60.7745 17.9854L60.3832 18.0266C52.7911 17.8344 46.3174 11.3077 45.9615 3.617C45.9553 3.48293 45.9684 3.3513 45.9989 3.2252Z" fill="#F6FBFB" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M60.4373 17.4017C60.4247 17.4017 60.4123 17.4017 60.3998 17.4017C56.7994 17.2142 53.3991 15.7015 50.8489 13.1389C48.2986 10.5886 46.7859 7.18831 46.586 3.58796C46.5735 3.25043 46.7735 2.9504 47.0861 2.83789C51.8683 1.16129 58.2373 0 63.25 0C63.6703 0 64.0038 0.361306 64.0001 0.762625C63.9002 6.25072 62.95 11.6762 61.1498 16.9017C61.0499 17.2017 60.7623 17.4017 60.4373 17.4017Z" fill="#FF193D" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M25.7967 56.0556C25.5966 56.0556 25.4091 55.9806 25.2716 55.8306L8.15749 38.729C7.80238 38.3741 7.88729 37.7811 8.33261 37.5415L14.8208 33.9912C15.1082 33.8286 15.4709 33.8786 15.7083 34.1162L29.8722 48.2801C30.1097 48.5177 30.1597 48.8802 29.9972 49.1676L26.4469 55.6558C26.3186 55.8942 26.0561 56.0556 25.7967 56.0556Z" fill="#313E5B" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M40.961 30.141C34.6458 30.141 31.4695 22.4684 35.9355 18.0024C38.7108 15.2271 43.2238 15.2271 45.999 18.0024C50.4607 22.4643 47.2999 30.141 40.961 30.141Z" fill="#313E5B" />
                                                    </svg>

                                                )
                                                : profileData?.subscription_type === "Premium"
                                                    ? (<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clipPath="url(#clip0_968_2827)">
                                                            <path d="M36.0585 28.0068L38.1739 14.1767L32.7318 19.7095L31.2139 10.0588L24.2872 18.3701L20.0001 6.40625L15.7131 18.3701L8.78632 10.0588L7.2685 19.7095L1.82635 14.1767L3.94176 28.0068V31.7126H36.0585V28.0068Z" fill="#FFDB0C" />
                                                            <path d="M36.0585 28.0068L38.1739 14.1767L32.7318 19.7095L31.2139 10.0588L24.2872 18.3701L20.0001 6.40625V31.7126H36.0585V28.0068Z" fill="#FBBF00" />
                                                            <path d="M36.058 28.0078H3.94141V35.4196H36.058V28.0078Z" fill="#FFA900" />
                                                            <path d="M36.0588 28.0078H20.0001V35.4196H36.0588V28.0078Z" fill="#FF8800" />
                                                            <path d="M1.82634 16.0042C2.835 16.0042 3.65268 15.1866 3.65268 14.1779C3.65268 13.1692 2.835 12.3516 1.82634 12.3516C0.81768 12.3516 0 13.1692 0 14.1779C0 15.1866 0.81768 16.0042 1.82634 16.0042Z" fill="#FF8800" />
                                                            <path d="M8.78599 11.8851C9.79465 11.8851 10.6123 11.0674 10.6123 10.0588C10.6123 9.0501 9.79465 8.23242 8.78599 8.23242C7.77734 8.23242 6.95966 9.0501 6.95966 10.0588C6.95966 11.0674 7.77734 11.8851 8.78599 11.8851Z" fill="#FF421D" />
                                                            <path d="M20.0001 8.23276C21.0088 8.23276 21.8264 7.41508 21.8264 6.40642C21.8264 5.39776 21.0088 4.58008 20.0001 4.58008C18.9914 4.58008 18.1738 5.39776 18.1738 6.40642C18.1738 7.41508 18.9914 8.23276 20.0001 8.23276Z" fill="#DE0418" />
                                                            <path d="M38.1736 16.0042C39.1823 16.0042 40 15.1866 40 14.1779C40 13.1692 39.1823 12.3516 38.1736 12.3516C37.165 12.3516 36.3473 13.1692 36.3473 14.1779C36.3473 15.1866 37.165 16.0042 38.1736 16.0042Z" fill="#870215" />
                                                            <path d="M31.2142 11.8851C32.2229 11.8851 33.0406 11.0674 33.0406 10.0588C33.0406 9.0501 32.2229 8.23242 31.2142 8.23242C30.2056 8.23242 29.3879 9.0501 29.3879 10.0588C29.3879 11.0674 30.2056 11.8851 31.2142 11.8851Z" fill="#A3021A" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_968_2827">
                                                                <rect width="40" height="40" fill="white" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>)
                                                    : ''
                                }

                            </div>

                            {
                                profileData?.name && <span className="text-xs md:text-xl md:font-medium">{profileData?.name}</span>
                            }
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
                <EditProfile
                    open={isProfile}
                    setIsOpen={setIsProfile}
                />
            </CustomModal>
        </div>
    )
}
