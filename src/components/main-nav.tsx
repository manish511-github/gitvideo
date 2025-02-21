"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, Plus, Import, AlertCircle } from "lucide-react"
import { MainSidebar } from "@/components/main-sidebar"
import { UserSidebar } from "@/components/user-sidebar"
import { useState } from "react"

export function MainNav() {
  const [mainSidebarOpen, setMainSidebarOpen] = useState(false)
  const [userSidebarOpen, setUserSidebarOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Sheet open={mainSidebarOpen} onOpenChange={setMainSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle main menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-0">
            <MainSidebar />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-4 md:gap-6 ml-4">
          <div className="hidden items-center gap-1 text-sm font-medium md:flex">
            <Link href="/manish511/repo1" className="flex items-center gap-1.5 rounded-md px-2 py-1.5 hover:bg-accent">
              manish511
            </Link>
            <span>/</span>
            <Link href="/manish511/repo1" className="flex items-center gap-1.5 rounded-md px-2 py-1.5 hover:bg-accent">
              repo1
            </Link>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="hidden w-full max-w-[400px] md:block">
            <Input type="search" placeholder="Search repositories..." className="h-9" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Plus className="mr-2 h-4 w-4" />
                New Repository
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Import className="mr-2 h-4 w-4" />
                Import Repository
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/issues">
              <AlertCircle className="h-5 w-5" />
              <span className="sr-only">Issues</span>
            </Link>
          </Button>
          <Sheet open={userSidebarOpen} onOpenChange={setUserSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-7 w-7">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@manish511" />
                  <AvatarFallback>MS</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-0">
              <UserSidebar />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

