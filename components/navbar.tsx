'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { MoreVertical, ShoppingBag, Shovel, Menu } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import SearchBar from './searchbar'
import NavLoginButton from './navloginbutton'

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="shadow-md bg-blue-300"
    >
      <div className="container mx-auto px-4 py-3 text-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/Tripcrop.png"
                alt="Tricrops Logo"
                className="h-fit object-cover"
                width={80}
                height={80}
              />
              <span className="text-3xl font-bold text-primary">Tricrops</span>
            </Link>
            <div className="hidden lg:block w-96">
              <SearchBar />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              {pathname === '/' ? (
                <Link href="/sell" className="text-primary hover:text-primary/80 transition-colors">
                  <Button variant="ghost" className="space-x-2">
                    <ShoppingBag className="h-5 w-5" />
                    <span>Become a Seller</span>
                  </Button>
                </Link>
              ) : (
                <Link href="/buy" className="text-primary hover:text-primary/80 transition-colors">
                  <Button variant="ghost" className="space-x-2">
                    <Shovel className="h-5 w-5" />
                    <span>Farming Essentials</span>
                  </Button>
                </Link>
              )}
              <NavLoginButton />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Help</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4">
                  <Link href="/sell" className="text-primary hover:text-primary/80 transition-colors">
                    Become a Seller
                  </Link>
                  <Link href="/buy" className="text-primary hover:text-primary/80 transition-colors">
                    Farming Essentials
                  </Link>
                  <NavLoginButton />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}