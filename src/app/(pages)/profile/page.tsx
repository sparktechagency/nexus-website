"use client"


import CustomModal from "@/components/modal/customModal"
import EditProfileModal from "@/components/modal/edit-profile-modal"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Phone, Clock, Gamepad2, User } from "lucide-react"
import Image from "next/image"
import { ChangeEvent, useRef, useState } from "react"

export default function WebProfilePage() {
  const [isEdit, setIsEdit] = useState(false)
  const [profileImage, setProfileImage] = useState("https://randomuser.me/api/portraits/women/2.jpg")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
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
  }

  const reviews = [
    {
      name: "Christiano Ronaldo",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      rating: 4,
      review:
        "I recently visited this gaming zone and was really impressed! The PCs are high-performance, the chairs are super comfortable, and the ambiance is perfect for long sessions. They offer a great variety of games—from FPS to racing and strategy. The staff were friendly and helpful throughout. Highly recommended for both casual and serious gamers!",
    },
    {
      name: "Lionel Messi",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      rating: 4,
      review:
        "I checked out this new esports arena last weekend and it was nothing short of spectacular! The setup is top-notch, with multi-screen gaming stations and a huge selection of titles to choose from. The snack bar has a fantastic range of energy drinks and quick bites. The community events they host are a great way to meet fellow gamers and compete in friendly tournaments. Definitely a must-visit for enthusiasts!",
    },
    {
      name: "Neymar Jr.",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      rating: 4,
      review:
        "I had the chance to explore an amazing VR gaming lounge recently. The virtual reality experience was mind-blowing, with immersive environments that transported me right into the game! The staff provided excellent guidance, ensuring I got the most out of each game. The lounge also features a cozy hangout area for gamers to relax and socialize. An exhilarating experience for any gaming level!",
    },
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < rating ? "text-orange-400" : "text-gray-600"}`}>
        ★
      </span>
    ))
  }

  return (
    <div className="min-h-screen bg-[#0a0b1e] text-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-evenly gap-3 xl:gap-10">
          <h2 className="text-white md:text-2xl font-bold xl:mb-6">Basic info</h2>

          <div className="flex flex-col xl:flex-row xl:items-center gap-4 mb-4">
            <Button
              className="w-[130px] md:py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
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
            <h2 className="text-white md:text-2xl font-bold">Gamers thought about you!</h2>
          </div>
        </div>



        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Profile Info */}
          <div className="space-y-4 bg-[#1a1b3a]/60 rounded-xl border border-gray-800/50">
            {/* Basic Info Section */}
            <div className=" rounded-xl p-6  ">
              <div className="flex justify-center">
                <div className="relative cursor-pointer"
                  onClick={handleImageClick}
                >
                  <div
                    className="cursor-pointer"

                  >
                    <Image
                      src={profileImage}
                      alt="photo"
                      className="w-[100px] h-[100px] object-cover rounded-full"
                      width={100}
                      height={100}
                    />
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />

                  <div className="absolute -top-2 -right-2 text-2xl">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    </svg>

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
                  <span className="text-white text-sm">Suuu Ronaldo</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-white mr-3" />
                    <span className="text-white text-sm">Email</span>
                  </div>
                  <span className="text-white text-sm">ronaldo69@gmail.com</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Gamepad2 className="w-4 h-4 text-white mr-3" />
                    <span className="text-white text-sm">Gaming Zone Name</span>
                  </div>
                  <span className="text-white text-sm">Bermuda Gaming Zone</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-white mr-3" />
                    <span className="text-white text-sm">Operating Hours</span>
                  </div>
                  <span className="text-white text-sm">10:00 AM - 09:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-white mr-3" />
                    <span className="text-white text-sm">Location</span>
                  </div>
                  <span className="text-white text-sm">5/9 Los Angeles, USA</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-white mr-3" />
                    <span className="text-white text-sm">Contact</span>
                  </div>
                  <span className="text-white text-sm">+992 365 45565</span>
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
          <div className="space-y-3">
            {reviews.map((review, index) => (
              <div key={index} className="bg-[#1a1b3a]/60 rounded-xl p-4 border border-gray-800/50">
                <div className="flex items-start gap-3">

                  <Image
                    src={review.avatar}
                    alt="photo"
                    className="object-cover rounded-full"
                    width={50}
                    height={50}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white text-sm mb-1">{review.name}</h3>
                    <div className="flex items-center gap-0.5 mb-2">{renderStars(review.rating)}</div>
                    <p className="text-gray-300 text-xs leading-relaxed">{review.review}</p>
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
        className={"p-0 max-h-[30vh]"}
        maxWidth={"md:!max-w-[70vw] xl:!max-w-[40vw]"}
      >
        <EditProfileModal />
      </CustomModal>
    </div>
  )
}
