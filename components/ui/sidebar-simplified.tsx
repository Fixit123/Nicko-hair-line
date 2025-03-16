"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronLeft, ChevronRight, Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const SIDEBAR_COOKIE_NAME = "sidebar:state"

type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

interface SidebarProviderProps {
  children: React.ReactNode
  defaultState?: "expanded" | "collapsed"
  defaultOpen?: boolean
  defaultOpenMobile?: boolean
}

function SidebarProvider({
  children,
  defaultState = "expanded",
  defaultOpen = true,
  defaultOpenMobile = false,
}: SidebarProviderProps) {
  const [state, setState] = React.useState<"expanded" | "collapsed">(defaultState)
  const [open, setOpen] = React.useState<boolean>(defaultOpen)
  const [openMobile, setOpenMobile] = React.useState<boolean>(defaultOpenMobile)
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  const toggleSidebar = React.useCallback(() => {
    setState((prev) => (prev === "expanded" ? "collapsed" : "expanded"))
  }, [])

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <SidebarContext.Provider
      value={{
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { state, open, openMobile, isMobile } = useSidebar()

  return (
    <div
      ref={ref}
      data-state={state}
      data-open={isMobile ? openMobile : open}
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex w-64 flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
        "data-[state=collapsed]:w-16",
        "data-[open=false]:-translate-x-full data-[open=false]:md:translate-x-0",
        className
      )}
      {...props}
    />
  )
})
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex h-14 items-center border-b border-sidebar-border px-4", className)}
      {...props}
    />
  )
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex-1 overflow-auto p-4", className)}
      {...props}
    />
  )
})
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("border-t border-sidebar-border p-4", className)}
      {...props}
    />
  )
})
SidebarFooter.displayName = "SidebarFooter"

const SidebarToggle = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { toggleSidebar, state } = useSidebar()

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn("absolute right-2 top-2", className)}
      onClick={toggleSidebar}
      {...props}
    >
      {state === "expanded" ? (
        <ChevronLeft className="h-4 w-4" />
      ) : (
        <ChevronRight className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
})
SidebarToggle.displayName = "SidebarToggle"

const SidebarMobileToggle = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { setOpenMobile, openMobile } = useSidebar()

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn("md:hidden", className)}
      onClick={() => setOpenMobile(!openMobile)}
      {...props}
    >
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle Mobile Sidebar</span>
    </Button>
  )
})
SidebarMobileToggle.displayName = "SidebarMobileToggle"

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarToggle,
  SidebarMobileToggle,
  SidebarProvider,
  useSidebar,
} 