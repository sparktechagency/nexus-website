

"use client"

import * as React from "react"
import { LogOut, Settings2 } from "lucide-react"
import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,

} from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import {
  AboutIcon,
  BookingIcon,
  ChangePasswordIcon,
  DashboardIcon,
  PayoutIcon,
  TermsIcon,
  TransactionIcon,
  UsersIcon
} from "./custom-icons"
import { useRouter } from "next/navigation"
import Image from "next/image"



export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  projects: [
    {
      name: "Dashboard",
      url: "dashboard",
      icon: DashboardIcon,
    },
    {
      name: "Manage users",
      url: "manage-users",
      icon: UsersIcon,
    },
    {
      name: "Zone listing",
      url: "zone-listing",
      icon: BookingIcon,
    },
    {
      name: "Transaction",
      url: "transaction",
      icon: TransactionIcon,
    },
    {
      name: "Subscription",
      url: "subscription",
      icon: PayoutIcon,
    },

  ],
  navMain: [
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Personal details",
          description: "Update Account Security Credentials",
          url: "personal-details",
          icon: ChangePasswordIcon,
        },
        {
          title: "Terms & Conditions",
          description: "Legal Policies and Agreements",
          url: "terms-and-conditions",
          icon: TermsIcon,
        },
        {
          title: "Privacy policy",
          description: "Company Information and Background",
          url: "privacy-policy",
          icon: AboutIcon,
        },
        ,
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter()

  const handleNavigate = () => {
    router.push('/')
  }

  return (
    <Sidebar collapsible="icon" {...props} className="h-full border-none">
      <SidebarHeader className="bg-[#0a0726]" >
        <div
          className="flex items-center space-x-2">
          <Image
            src="/web_pic/logo.png"
            alt="Nexus Logo"
            width={60}
            height={60}
            className="rounded-full"
          />
          <span className="text-2xl font-bold tracking-wider text-[#ffff]">NEXUS</span>
        </div>
      </SidebarHeader>


      <SidebarContent className="bg-[#0a0726] ">
        <div className="">
          <NavProjects projects={data.projects} />
        </div>
        <NavMain items={data.navMain} />
      </SidebarContent>



      <SidebarFooter className="bg-[#0a0726]">
        <Button
          onClick={handleNavigate}
          className="w-full py-6 rounded-lg cursor-pointer text-white font-semibold transition-all duration-200"
          style={{
            background:
              "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
          }}
        >
          <div className="">
            <Image src="https://randomuser.me/api/portraits/men/1.jpg" alt="photo" width={20} height={20} className="object-cover w-[30px] h-[30px] rounded-full" />
          </div>

          <span className="text-white font-medium text-lg flex-1 text-left">Log Out</span>

          <LogOut className="w-6 h-6 text-red-400 group-hover:text-red-300 transition-colors" />
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

