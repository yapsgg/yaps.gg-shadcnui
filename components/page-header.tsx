"use client"

import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { BookOpen, FlaskConicalIcon, LifeBuoy, Send, SquareTerminal, Boxes, Moon, Sun, Sparkles, MoonStar, SunDim, Briefcase, Backpack, Box, Frame, PackageOpen, Copy, HandHeart, ClipboardList } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { getApplicationBySlug } from "@/lib/applications"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { SUBSCRIPTION_URL } from "@/lib/constants"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { SOLANA_ADDRESS, BITCOIN_ADDRESS, ETHEREUM_ADDRESS, TETHER_ADDRESS, BINANCE_ADDRESS } from "@/lib/constants"
import { toast } from "sonner"
import DonationDialog from "./donation-dialog"

export default function PageHeader() {
  const pathname = usePathname()
  
  // Get page title and icon based on current route
  const getPageInfo = () => {
    const activeProgram = getApplicationBySlug(pathname.split("/")[1] ?? "")

    if (pathname === "/") {
      return {
        title: "Playground",
        icon: <SquareTerminal className="h-5 w-5" />,
      }
    } else if (pathname.startsWith("/apply")) {
      return {
        title: "Apply",
        icon: <ClipboardList className="h-5 w-5" />,
      }
    } else if (activeProgram) {
      return {
        title: activeProgram.name,
        icon: <ClipboardList className="h-5 w-5" />,
      }
    } else if (pathname.startsWith("/tutorial")) {
      return {
        title: "Tutorials",
        icon: <BookOpen className="h-5 w-5" />,
      }
    } else if (pathname.startsWith("/lab")) {
      return {
        title: "Labs",
        icon: <FlaskConicalIcon className="h-5 w-5" />,
      }
    } else if (pathname.startsWith("/thing")) {
      return {
        title: "Things",
        icon: <Boxes className="h-5 w-5" />,
      }
    } else if (pathname.startsWith("/blog")) {
      return {
        title: "Blog",
        icon: <BookOpen className="h-5 w-5" />,
      }
    } else if (pathname.startsWith("/experience")) {
      return {
        title: "Experience",
        icon: <Box className="h-5 w-5" />,
      }
    } else if (pathname.startsWith("/application")) {
      return {
        title: "Applications",
        icon: <PackageOpen className="h-5 w-5" />,
      }
    } else if (pathname.startsWith("/socials")) {
      return {
        title: "Socials",
        icon: <Frame className="h-5 w-5" />,
      }
    } else if (pathname.startsWith("/wrapped")) {
      return {
        title: "Wrapped",
        icon: <PackageOpen className="h-5 w-5" />,
      }
    } else {
      return {
        title: "Playground",
        icon: <SquareTerminal className="h-5 w-5" />,
      }
    }
  }

  const { title, icon } = getPageInfo()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Set default theme to dark when component mounts
  useEffect(() => {
    setMounted(true)
    setTheme("dark")
  }, [setTheme])

  const handleCopy = (addr: string) => {
    navigator.clipboard.writeText(addr);
    toast.success("Copied to clipboard")
  };

  const addresses = [
    { label: "SOLANA", value: SOLANA_ADDRESS },
    { label: "BITCOIN", value: BITCOIN_ADDRESS },
    { label: "ETHEREUM", value: ETHEREUM_ADDRESS },
    { label: "TETHER", value: TETHER_ADDRESS },
    { label: "BINANCE", value: BINANCE_ADDRESS },
  ];

  // Prevent hydration mismatch
  if (!mounted) return null

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 justify-between">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1 cursor-pointer" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href={pathname === "/" ? "/" : `/${pathname.split("/")[1]}`}>
                <div className="flex items-center gap-2">
                  {icon}
                  <span>{title}</span>
                </div>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {pathname !== "/" && pathname.split("/").filter(Boolean).length > 1 && (
              <>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    <BreadcrumbLink href={pathname === "/" ? "/" : pathname.split("/")[0]}>
                      {pathname.split("/").filter(Boolean)[1]}
                    </BreadcrumbLink>
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <div className="flex items-center px-4">
        <DonationDialog>
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <HandHeart className="h-5 w-5" />
          </Button>
        </DonationDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="cursor-pointer">
              {theme === "dark" ? (
                <MoonStar className="h-5 w-5" />
              ) : (
                <SunDim className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("light")}>
              <Sun className="mr-2 h-4 w-4" />
              <span>Light</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("dark")}>
              <Moon className="mr-2 h-4 w-4" />
              <span>Dark</span>
            </DropdownMenuItem>
            <Separator className="my-1" /> */}
            <DropdownMenuItem>
              <Link href={SUBSCRIPTION_URL} className="flex w-full">
                <Sparkles className="mr-2 h-4 w-4" />
                <span>Upgrade to Pro</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
} 