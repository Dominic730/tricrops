'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ShoppingBag, Shovel, Menu } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
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
      className="shadow-lg bg-blue-300"
    >
      <div className="container mx-auto px-6 py-4 text-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link href="/" className="flex flex-col items-center justify-center">
              <Image
                src="/Tripcrop.png"
                alt="Tricrops Logo"
                className="object-cover"
                width={60}
                height={60}
              />
              <span className="text-sm font-semibold text-black">Tricrops</span>
            </Link>
            <div className="hidden lg:block w-full max-w-sm">
              <SearchBar />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              {pathname === '/' ? (
                <Link href="/sell" className="text-black hover:text-opacity-80 transition duration-200">
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <ShoppingBag className="h-5 w-5 text-black" />
                    <span>Become a Seller</span>
                  </Button>
                </Link>
              ) : (
                <Link href="/buy" className="text-black hover:text-opacity-80 transition duration-200">
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Shovel className="h-5 w-5 text-black" />
                    <span>Farming Essentials</span>
                  </Button>
                </Link>
              )}
              <NavLoginButton />
            </div>
            
            <div className="flex md:hidden">
              <NavLoginButton />
            </div>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-black">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 sm:w-80 bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
                <nav className="flex flex-col space-y-6">
                  <Link href="/sell" className="text-black hover:text-opacity-80 transition duration-200">
                    Become a Seller
                  </Link>
                  <Link href="/buy" className="text-black hover:text-opacity-80 transition duration-200">
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
