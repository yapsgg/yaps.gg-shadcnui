"use client"

import * as React from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Backpack,
  BookOpen,
  Bot,
  Box,
  Boxes,
  Calendar,
  ClipboardList,
  Command,
  FlaskConicalIcon,
  Frame,
  LifeBuoy,
  Logs,
  Map,
  PackageOpen,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { EMAIL_URL, BOOK_A_CALL_URL, NAME, IMAGE_URL, EMAIL_URL_LINK } from "@/lib/constants"
import { getApplicationBySlug } from "@/lib/applications"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const activeProgram = getApplicationBySlug(pathname.split("/")[1] ?? "")
  
  const data = {
    user: {
      name: NAME,
      email: EMAIL_URL,
      avatar: IMAGE_URL,
    },
    navMain: [
      {
        title: "Playground",
        url: "/",
        icon: SquareTerminal,
        isActive: pathname === "/",
      },
      {
        title: "Labs",
        url: "/lab",
        icon: FlaskConicalIcon,
        isActive: pathname.startsWith("/lab"),
      },
      {
        title: "Tutorials",
        url: "/tutorial",
        icon: BookOpen,
        isActive: pathname.startsWith("/tutorial"),
      },
      {
        title: "Things",
        url: "/thing",
        icon: Boxes,
        isActive: pathname.startsWith("/thing"),
      },
      {
        title: "Experience",
        url: "/experience",
        icon: Box,
        isActive: pathname.startsWith("/experience"),
      },
      {
        title: "Apply",
        url: "/apply",
        icon: ClipboardList,
        isActive: pathname.startsWith("/apply") || Boolean(activeProgram),
      },
      {
        title: "Applications",
        url: "/application",
        icon: PackageOpen,
        isActive: pathname.startsWith("/application"),
      },
    ],
    navSecondary: [
      {
        title: "Support",
        url: EMAIL_URL_LINK,
        icon: LifeBuoy,
      },
      {
        title: "Feedback",
        url: EMAIL_URL_LINK,
        icon: Send,
      },
      {
        title: "Book a Call",
        url: BOOK_A_CALL_URL,
        icon: Calendar,
      },
    ],
    projects: [
      {
        name: "I'm viral on socials",
        url: "/socials",
        icon: Frame,
        isActive: pathname.startsWith("/socials"),
      },
      {
        name: "I do take notes",
        url: "/wrapped",
        icon: Logs,
        isActive: pathname.startsWith("/wrapped"),
      },
    ],
  }

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image 
                    src="/images/yapsdotgg.svg" 
                    alt="Yaps GG" 
                    width={32} 
                    height={32} 
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Yaps World</span>
                  <span className="truncate text-xs text-primary/70">Probably Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
