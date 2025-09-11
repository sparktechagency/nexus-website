"use client"


import CustomButtonLoaderTwo from "@/components/loader/CustomButtonLoaderTwo"
import CustomModal from "@/components/modal/customModal"
import EditProfileModal from "@/components/modal/profileModal/edit-profile-modal"
import { Button } from "@/components/ui/button"
import { useEditSinglePhotoProfileApiMutation, useGetProfileApiQuery, useGetRatingProfileApiQuery } from "@/redux/website/profile/profileApi"
import { Mail, MapPin, Phone, Clock, Gamepad2, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"


interface RatingProfileData {
  id: number
  user: {
    id: number
    name: string
    avatar: string
  }
  rating: number
  review: string
  created_at: string
}

export default function WebProfilePage() {
  const [isEdit, setIsEdit] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  
  // get profile 
  const { data: getProfile } = useGetProfileApiQuery(null)
  const profileData = getProfile?.data
  
  const [profileImage, setProfileImage] = useState(profileData?.avatar || "http://103.186.20.114:8011/uploads/users/default_avatar.png")
  
  
  useEffect(() => {
    if (profileData?.avatar) {
      setProfileImage(profileData.avatar)
    }
  }, [profileData?.avatar])

  // rating profile data
  const { data: getRatingProfile,isLoading,refetch: refetchProfile } = useGetRatingProfileApiQuery(null)
  const ratingProfileData: RatingProfileData[] = getRatingProfile?.data?.data


  // single photo change
  const [editSinglePhotoProfile] = useEditSinglePhotoProfileApiMutation()




  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }


    const formData = new FormData();
    if (file) {
      formData.append("photo", file)
    }

    try {
      const res = await editSinglePhotoProfile(formData).unwrap();
      console.log(res)
      if (res?.status === 'success') {
        toast.success(res?.message)
        await refetchProfile()
     setProfileImage(`${res.data?.avatar || profileData?.avatar}?t=${new Date().getTime()}`)
      } else {
        toast.error(res?.messages)
      }
    } catch (errors: any) {
      if (errors) {
        toast.error(errors.data?.message)
      }
    }

  }



  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < rating ? "text-orange-400" : "text-gray-600"}`}>
        ★
      </span>
    ))
  }



  if(isLoading){
    return <CustomButtonLoaderTwo />
  }

  return (
    <>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #6523E7, #023CE3, #6523E7);
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #5a20cc, #022fb8, #5a20cc);
        }
        /* Firefox fallback */
        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #6523E7 transparent; }
      `}</style>

      <div className="min-h-screen bg-[#0a0b1e] text-white p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-evenly gap-3 xl:gap-10 ">
            <h2 className="text-white md:text-2xl font-bold xl:mb-6">Basic info</h2>

            <div className="flex flex-col xl:flex-row xl:items-center gap-4 mb-4 ">
              <Link href="mailto:someone@example.com" className="w-fit">
                <Button
                  className="w-[130px] cursor-pointer md:py-6 rounded-full  text-white font-semibold transition-all duration-200"
                  style={{
                    background:
                      "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
                  }}
                >
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 12C1.5875 12 1.23438 11.8531 0.940625 11.5594C0.646875 11.2656 0.5 10.9125 0.5 10.5V1.5C0.5 1.0875 0.646875 0.734375 0.940625 0.440625C1.23438 0.146875 1.5875 0 2 0H14C14.4125 0 14.7656 0.146875 15.0594 0.440625C15.3531 0.734375 15.5 1.0875 15.5 1.5V10.5C15.5 10.9125 15.3531 11.2656 15.0594 11.5594C14.7656 11.8531 14.4125 12 14 12H2ZM8 6.75L2 3V10.5H14V3L8 6.75ZM8 5.25L14 1.5H2L8 5.25ZM2 3V1.5V10.5V3Z" fill="white" />
                  </svg>
                  Support
                </Button>
              </Link>
              <h2 className="text-white md:text-2xl font-bold">Gamers thought about you!</h2>
            </div>
          </div>



          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Profile Info */}
            <div className="space-y-4 bg-[#1a1b3a]/60 rounded-xl border border-gray-800/50 md:h-[550px]">
              {/* Basic Info Section */}
              <div className=" rounded-xl p-6  ">
                <div className="flex justify-center">
                  <div className="relative cursor-pointer"
                    onClick={handleImageClick}
                  >
                    <div
                      className="cursor-pointer"

                    >
                      {
                        profileImage && <Image
                          src={profileImage}
                          alt="photo"
                          className="w-[100px] h-[100px] object-cover rounded-full"
                          width={100}
                          height={100}
                        />
                      }
                    </div>

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />

                    <div className="absolute -top-2 -right-2 text-2xl">

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
                    <div className="bg-white absolute -bottom-0 -right-2  rounded-full p-1">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 16V7.85L8.4 10.45L7 9L12 4L17 9L15.6 10.45L13 7.85V16H11ZM6 20C5.45 20 4.97933 19.8043 4.588 19.413C4.19667 19.0217 4.00067 18.5507 4 18V15H6V18H18V15H20V18C20 18.55 19.8043 19.021 19.413 19.413C19.0217 19.805 18.5507 20.0007 18 20H6Z" fill="url(#paint0_linear_968_2825)" />
                        <defs>
                          <linearGradient id="paint0_linear_968_2825" x1="4" y1="12" x2="20" y2="12" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#6523E7" />
                            <stop offset="0.5" stopColor="#023CE3" stopOpacity="0.8" />
                            <stop offset="1" stopColor="#6523E7" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information Section */}
              <div className=" rounded-xl p-6 ">
                <h2 className="text-white text-2xl font-normal mb-6">Personal information</h2>
                <div className="space-y-6 md:space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-white mr-3" />
                      <span className="text-white text-sm">Full Name</span>
                    </div>
                    <span className="text-white text-sm">{profileData?.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-white mr-3" />
                      <span className="text-white text-sm">Email</span>
                    </div>
                    <span className="text-white text-sm">{profileData?.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Gamepad2 className="w-4 h-4 text-white mr-3" />
                      <span className="text-white text-sm">Gaming Zone Name</span>
                    </div>
                    <span className="text-white text-sm">{profileData?.gaming_zone_name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-white mr-3" />
                      <span className="text-white text-sm">Operating Hours</span>
                    </div>
                    <div className="text-white text-sm flex items-center">{profileData?.opening_time}
                      <p className="px-2">-</p>
                      {profileData?.closing_time}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-white mr-3" />
                      <span className="text-white text-sm">Location</span>
                    </div>
                    <span className="text-white text-sm">{profileData?.address}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-white mr-3" />
                      <span className="text-white text-sm">Contact</span>
                    </div>
                    <span className="text-white text-sm">{profileData?.phone}</span>
                  </div>
                </div>


                <Button
                  onClick={() => setIsEdit(!isEdit)}
                  className="w-full md:py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200 mt-6"
                  style={{
                    background:
                      "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
                  }}>
                  Edit
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 7H6.5C5.96957 7 5.46086 7.21071 5.08579 7.58579C4.71071 7.96086 4.5 8.46957 4.5 9V18C4.5 18.5304 4.71071 19.0391 5.08579 19.4142C5.46086 19.7893 5.96957 20 6.5 20H15.5C16.0304 20 16.5391 19.7893 16.9142 19.4142C17.2893 19.0391 17.5 18.5304 17.5 18V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16.5 5.00011L19.5 8.00011M20.885 6.58511C21.2788 6.19126 21.5001 5.65709 21.5001 5.10011C21.5001 4.54312 21.2788 4.00895 20.885 3.61511C20.4912 3.22126 19.957 3 19.4 3C18.843 3 18.3088 3.22126 17.915 3.61511L9.5 12.0001V15.0001H12.5L20.885 6.58511Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Button>
              </div>
            </div>


            {/* Right Column - Reviews */}
            <div className="space-y-3 md:h-[550px] overflow-y-auto custom-scrollbar">
              {ratingProfileData?.map((item, index: number) => (
                <div key={index} className="bg-[#1a1b3a]/60 rounded-xl p-4 border border-gray-800/50">
                  <div className="flex items-start gap-3">

                    <Image
                      src={item?.user?.avatar}
                      alt="photo"
                      className="object-cover rounded-full"
                      width={50}
                      height={50}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white text-sm mb-1">{item?.user?.name}</h3>
                      <div className="flex items-center gap-0.5 mb-2">{renderStars(item?.rating)}</div>
                      <p className="text-gray-300 text-xs leading-relaxed">{item?.review}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* modal component(REGISTER) */}
        <CustomModal
          open={isEdit}
          setIsOpen={setIsEdit}
          className={"p-0 max-h-[20vh]"}
          maxWidth={"md:!max-w-[70vw] xl:!max-w-[40vw]"}
        >
          <EditProfileModal
            open={isEdit}
            setIsOpen={setIsEdit}
          />
        </CustomModal>
      </div>
    </>
  )
}
