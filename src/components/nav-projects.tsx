
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

interface SidebarContext {
  isCollapsed: boolean
}

type ProjectItem = {
  name: string
  title?: string
  url: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

interface NavProjectsProps {
  projects: ProjectItem[]
}

export function NavProjects({ projects }: NavProjectsProps) {
  const { isCollapsed } = useSidebar() as unknown as SidebarContext
  const pathname = usePathname()


  return (
    <SidebarGroup>
      <SidebarMenu>
        {projects.map((item) => {
          let isActive = false

          if (item.url === "users") {
            isActive = pathname.startsWith("/users") || pathname.startsWith("/provider") || pathname.startsWith("/userReviewRequest") || pathname.startsWith("/userReviewRequest") || pathname.startsWith("/userReviewDetails")
          }
          else if (item.url === "services") {
            isActive = pathname.startsWith("/services") || pathname.startsWith("/requestedServices")
          }
          else if (item.url === "referralManagement") {
            isActive = pathname.startsWith("/referralManagement") || pathname.startsWith("/allReferrals")
          }
          else if (item.url === "disputeManagement") {
            isActive = pathname.startsWith("/disputeManagement") || pathname.startsWith("/dispute_fom_user")
          }
          else if (item.url === "boostControl") {
            isActive = pathname.startsWith("/boostControl") || pathname.startsWith("/pricingControl") || pathname.startsWith("/boostingRequests")
          }

          else {
            isActive =
              pathname === `/${item.url}` ||
              pathname.startsWith(`/${item.url}/`)
          }

          return (
            <SidebarMenuItem key={item.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton asChild>
                    <Link
                      href={`/${item.url}`}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all  ${isActive
                          ? "bg-[#0b041a] hover:bg-gray-800 text-white "
                          : "text-white "
                        }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && (
                        <span className="text-sm">{item.name}</span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </TooltipTrigger>
                {isCollapsed ? (
                  <TooltipContent side="right">
                    <p>{item.title}</p>
                  </TooltipContent>
                ) : (
                  <TooltipContent side="right">
                    <p>{item.name}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}