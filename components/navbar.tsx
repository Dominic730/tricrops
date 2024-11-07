"use client";

import SearchBar from "./searchbar";
import NavLoginButton from "./navloginbutton";
import { MoreVertical, ShoppingBag } from "lucide-react";
import { Shovel } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
// import Logo from "@/public/Tricrops.png";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="flex px-5 md:px-20 absolute w-screen gap-20 justify-between bg-blue-300">
      <div className="flex items-center gap-5">
        <Link
          href="/"
          className="flex text-lg font-semibold w-16 items-center justify-center"
        >
          <Image
            src="/tripcrops.svg"
            alt="Tricrops Logo"
            className="h-fit object-cover rounded-xl"
            width={200}
            height={200}
          />
        </Link>
      </div>
      <div className="hidden md:flex w-[500px] ml-56 items-center justify-center">
        <div className="w-full">
          <SearchBar />
        </div>
      </div>
      <div className="flex md:gap-12">
        {pathname === "/" ? (
          <Link
            href="/sell"
            className="hidden md:block"
          >
            <div className="flex items-center gap-2 h-full">
              <ShoppingBag />
              <p className="whitespace-nowrap">Become a Seller</p>
            </div>
          </Link>
        ) : (
          <Link
            href="/buy"
            className="hidden md:block"
          >
            <div className="flex items-center gap-2 h-full">
              <Shovel />
              <p className="whitespace-nowrap">Farming Essentials</p>
            </div>
          </Link>
        )}
        <div className="flex items-center">
          <div>
            <NavLoginButton />
          </div>
        </div>
        <div className="flex items-center">
          <MoreVertical size={20} />
        </div>
      </div>
    </nav>
  );
}
