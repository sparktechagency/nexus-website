
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Dispatch, SetStateAction } from "react"

interface SubscriptionModalProps {
  open: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function SubscriptionModal({ open, setIsOpen }: SubscriptionModalProps) {
  return (
    <div className="">
      <div className="text-center mb-8">
        <h1 className="text-white md:text-3xl font-bold mb-2">Subscription Packages</h1>
        <p className="text-gray-300 text-sm">You have to buy one of any subscription packages for add bookings.</p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Basic Plan */}
        <div className="bg-[#DBEAFE] rounded-3xl p-6 text-center">
          <div className="mb-4 flex justify-center">
            <svg width="64" height="62" viewBox="0 0 64 62" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M62.4899 22.5322L41.7601 20.6096L33.5256 1.48853C32.9491 0.149657 31.0507 0.149657 30.4742 1.48853L22.2399 20.6097L1.51003 22.5322C0.0585351 22.6669 -0.528089 24.4722 0.567034 25.4342L16.2078 39.1745L11.6305 59.4839C11.31 60.9059 12.8458 62.0217 14.0991 61.2774L32 50.6482L49.9008 61.2774C51.1542 62.0217 52.6901 60.9059 52.3696 59.4839L47.7922 39.1745L63.4329 25.4342C64.528 24.4722 63.9414 22.6669 62.4899 22.5322Z" fill="#FFDC64" />
            </svg>

          </div>
          <h3 className="text-black text-lg font-semibold mb-1">Basic Plan</h3>
          <p className="text-black text-sm mb-4">$5643.00/monthly</p>

          <ul className="text-left text-black text-sm space-y-2 mb-6">
            <li>• Up to 5 PC bookings per day.</li>
            <li>• Listing in the Nexus app.</li>
            <li>• Email support.</li>
          </ul>

          <Button
            className="w-full bg-white text-black hover:bg-gray-100 rounded-full cursor-pointer">
            <Link href='/rescedule'>
              Manage plan
            </Link>
          </Button>
        </div>

        {/* Standard Plan */}
        <div className="bg-[#D1FAE5] rounded-3xl p-6 text-center">
          <div className="mb-4 flex justify-center">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M14.057 63.6808C13.6978 63.6808 13.4057 63.4472 13.3319 63.1057L12.2068 58.2677L1.48069 63.5432C0.838694 63.8546 0.155209 63.1868 0.480636 62.5432L5.74371 51.7921L0.905728 50.667C0.204231 50.5014 0.118149 49.5524 0.768116 49.2543L14.0444 43.1661C14.7525 42.8385 15.3012 43.6249 15.0523 44.1756C17.0048 45.3306 21.1892 49.268 20.8701 49.9918L14.7444 63.2432C14.6195 63.5057 14.3445 63.6808 14.057 63.6808Z" fill="#FDBF00" />
              <path fillRule="evenodd" clipRule="evenodd" d="M15.1954 35.3662C15.1828 35.3662 15.1704 35.3662 15.1704 35.3662L0.719024 34.8162C0.0554737 34.7896 -0.257993 33.9486 0.256428 33.5036L17.1331 18.5023C17.233 18.4147 17.3455 18.3523 17.4831 18.3273L25.9714 16.5646C26.7687 16.3947 18.3976 29.4508 15.0473 33.8708C16.4332 33.9246 16.0649 35.3662 15.1954 35.3662Z" fill="#FF193D" />
              <path fillRule="evenodd" clipRule="evenodd" d="M29.9344 64.0067C29.5411 64.0067 29.1998 63.6699 29.1843 63.2816L28.6343 48.8302C28.6038 47.9372 43.3426 38.6044 45.9834 37.7121C46.2229 36.7955 47.6359 37.1053 47.4484 38.0542L45.6857 46.5425C45.6608 46.6675 45.5982 46.7925 45.5107 46.8926L30.497 63.7567C30.347 63.9191 30.1469 64.0067 29.9344 64.0067Z" fill="#FF193D" />
              <path fillRule="evenodd" clipRule="evenodd" d="M29.3463 49.5671C29.1462 49.5671 28.9587 49.4921 28.8213 49.3421L14.6449 35.1782C14.4324 34.9658 14.3698 34.6532 14.4699 34.3781C21.921 14.3954 41.8857 0.179795 63.2369 2.75944e-05C63.6726 -0.00366371 64.0029 0.363548 63.9995 0.762653C63.8848 14.3727 58.0044 27.6848 48.348 37.3411C42.96 42.7291 36.6468 46.8295 29.6088 49.5298C29.5338 49.5547 29.4337 49.5671 29.3463 49.5671Z" fill="#E1F1FA" />
              <path fillRule="evenodd" clipRule="evenodd" d="M45.9989 3.2252C51.4789 1.18523 57.3044 0.0499324 63.2372 2.75944e-05C63.6729 -0.00366371 64.0032 0.363548 63.9998 0.762653C63.9502 6.65 62.8208 12.4814 60.7745 17.9854L60.3832 18.0266C52.7911 17.8344 46.3174 11.3077 45.9615 3.617C45.9553 3.48293 45.9684 3.3513 45.9989 3.2252Z" fill="#F6FBFB" />
              <path fillRule="evenodd" clipRule="evenodd" d="M60.4373 17.4017C60.4247 17.4017 60.4123 17.4017 60.3998 17.4017C56.7994 17.2142 53.3991 15.7015 50.8489 13.1389C48.2986 10.5886 46.7859 7.18831 46.586 3.58796C46.5735 3.25043 46.7735 2.9504 47.0861 2.83789C51.8683 1.16129 58.2373 0 63.25 0C63.6703 0 64.0038 0.361306 64.0001 0.762625C63.9002 6.25072 62.95 11.6762 61.1498 16.9017C61.0499 17.2017 60.7623 17.4017 60.4373 17.4017Z" fill="#FF193D" />
              <path fillRule="evenodd" clipRule="evenodd" d="M25.7967 56.0556C25.5966 56.0556 25.4091 55.9806 25.2716 55.8306L8.15749 38.729C7.80238 38.3741 7.88729 37.7811 8.33261 37.5415L14.8208 33.9912C15.1082 33.8286 15.4709 33.8786 15.7083 34.1162L29.8722 48.2801C30.1097 48.5177 30.1597 48.8802 29.9972 49.1676L26.4469 55.6558C26.3186 55.8942 26.0561 56.0556 25.7967 56.0556Z" fill="#313E5B" />
              <path fillRule="evenodd" clipRule="evenodd" d="M40.961 30.141C34.6458 30.141 31.4695 22.4684 35.9355 18.0024C38.7108 15.2271 43.2238 15.2271 45.999 18.0024C50.4607 22.4643 47.2999 30.141 40.961 30.141Z" fill="#313E5B" />
            </svg>

          </div>
          <h3 className="text-black text-lg font-semibold mb-1">Standard Plan</h3>
          <p className="text-black text-sm mb-4">$5643.00/monthly</p>

          <ul className="text-left text-black text-sm space-y-2 mb-6">
            <li>• Up to 50 PC bookings per day.</li>
            <li>• Listing in the Nexus app.</li>
            <li>• Higher placement in search.</li>
            <li>• Email support.</li>
          </ul>

          <Button className="w-full bg-white text-black hover:bg-gray-100 rounded-full cursor-pointer">
            <Link href='/rescedule'>
              Manage plan
            </Link>
          </Button>
        </div>

        {/* Premium Plan */}
        <div className="bg-[#FEF3C7] rounded-3xl p-6 text-center">
          <div className="mb-4 flex justify-center">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_968_4289)">
                <path d="M57.6938 44.8118L61.0784 22.6837L52.371 31.5361L49.9425 16.0951L38.8597 29.3931L32.0004 10.251L25.1411 29.3931L14.0583 16.0951L11.6298 31.5361L2.92236 22.6837L6.30701 44.8118V50.7411H57.6938V44.8118Z" fill="#FFDB0C" />
                <path d="M57.6934 44.8118L61.078 22.6837L52.3706 31.5361L49.9421 16.0951L38.8593 29.3931L32 10.251V50.7411H57.6934V44.8118Z" fill="#FBBF00" />
                <path d="M57.6927 44.8125H6.30615V56.6713H57.6927V44.8125Z" fill="#FFA900" />
                <path d="M57.6939 44.812H32V56.6708H57.6939V44.812Z" fill="#FF8800" />
                <path d="M2.92214 25.6055C4.536 25.6055 5.84428 24.2972 5.84428 22.6834C5.84428 21.0695 4.536 19.7612 2.92214 19.7612C1.30829 19.7612 0 21.0695 0 22.6834C0 24.2972 1.30829 25.6055 2.92214 25.6055Z" fill="#FF8800" />
                <path d="M14.0574 19.0166C15.6713 19.0166 16.9795 17.7084 16.9795 16.0945C16.9795 14.4807 15.6713 13.1724 14.0574 13.1724C12.4435 13.1724 11.1353 14.4807 11.1353 16.0945C11.1353 17.7084 12.4435 19.0166 14.0574 19.0166Z" fill="#FF421D" />
                <path d="M32.0003 13.1729C33.6141 13.1729 34.9224 11.8646 34.9224 10.2508C34.9224 8.6369 33.6141 7.32861 32.0003 7.32861C30.3864 7.32861 29.0781 8.6369 29.0781 10.2508C29.0781 11.8646 30.3864 13.1729 32.0003 13.1729Z" fill="#DE0418" />
                <path d="M61.0779 25.6055C62.6918 25.6055 64 24.2972 64 22.6834C64 21.0695 62.6918 19.7612 61.0779 19.7612C59.464 19.7612 58.1558 21.0695 58.1558 22.6834C58.1558 24.2972 59.464 25.6055 61.0779 25.6055Z" fill="#870215" />
                <path d="M49.9427 19.0166C51.5565 19.0166 52.8648 17.7084 52.8648 16.0945C52.8648 14.4807 51.5565 13.1724 49.9427 13.1724C48.3288 13.1724 47.0205 14.4807 47.0205 16.0945C47.0205 17.7084 48.3288 19.0166 49.9427 19.0166Z" fill="#A3021A" />
              </g>
              <defs>
                <clipPath id="clip0_968_4289">
                  <rect width="64" height="64" fill="white" />
                </clipPath>
              </defs>
            </svg>

          </div>
          <h3 className="text-black text-lg font-semibold mb-1">Premium Plan</h3>
          <p className="text-black text-sm mb-4">$5643.00/monthly</p>

          <ul className="text-left text-black text-sm space-y-2 mb-6">
            <li>• Unlimited bookings.</li>
            <li>• Priority placement.</li>
            <li>• Featured venue badges.</li>
            <li>• Priority support.</li>
            <li>• First access to beta features.</li>
          </ul>

          <Button className="w-full bg-white text-black hover:bg-gray-100 rounded-full cursor-pointer">
            <Link href='/rescedule'>
              Manage plan
            </Link>
          </Button>
        </div>
      </div>

      {/* Close Button */}
      <div className="text-center">
        <Button
          onClick={() => setIsOpen(!open)}
          className="w-full py-6 rounded-full cursor-pointer text-[#EB4335] font-semibold transition-all duration-200">
          Close
        </Button>
      </div>

    </div >
  )
}
