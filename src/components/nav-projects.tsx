
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Tooltip, TooltipTrigger } from "./ui/tooltip"

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
  const pathname = usePathname()


  return (
    <SidebarGroup>
      <SidebarMenu>
        {projects.map((item) => {
          let isActive = false

          if (item.url === "users") {
            isActive = pathname.startsWith("/users") || pathname.startsWith("/provider") || pathname.startsWith("/userReviewRequest") || pathname.startsWith("/userReviewRequest") || pathname.startsWith("/userReviewDetails")
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
                  {/* =============== DEFAULT HOVER EFFECT REMOVE HERE ================ */}
                  <SidebarMenuButton asChild className="hover:bg-[#0b041a] hover:text-white active:bg-transparent">
                    <Link
                      href={`/${item.url}`}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all  ${isActive
                        ? "bg-[#0b041a] shadow-[0_0_10px_3px_rgba(8,112,184,0.7)] text-white py-[20px]"
                        : "text-white  py-[20px]"
                        }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </TooltipTrigger>
              </Tooltip>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}