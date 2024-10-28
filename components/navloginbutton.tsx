"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  CircleUserRound,
  Loader,
  LogIn,
  LogOut,
  ShoppingCart,
  UserPen,
} from "lucide-react";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { signOut } from "@/lib/firebase/auth";

export default function NavLoginButton() {
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      return () => unsubscribe();
    });
  }, []);

  if (!isMounted) {
    return <Loader className="animate-spin" />;
  }

  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link
              href={user ? "/profile" : "/login"}
              legacyBehavior
              passHref
            >
              {/* <NavigationMenuLink className={navigationMenuTriggerStyle()}> */}
              <NavigationMenuTrigger className="mb-0">
                <CircleUserRound />
                <p className="text-[16px] pl-1">{user ? "Account" : "Login"}</p>
              </NavigationMenuTrigger>
              {/* </NavigationMenuLink> */}
            </Link>
            <NavigationMenuContent>
              <ul className="w-[180px] px-5 py-3">
                <li className="w-full ">
                  <NavigationMenuLink asChild>
                    <Link
                      className="text-sm text-center "
                      href="/signup"
                    >
                      {user ? null : (
                        <div className="flex gap-2 items-center">
                          <LogIn />
                          <p>Sign Up</p>
                        </div>
                      )}
                    </Link>
                  </NavigationMenuLink>
                </li>
                {user ? null : (
                  <div className={"w-full border border-gray-600 my-2"} />
                )}
                <li className="w-full">
                  <NavigationMenuLink asChild>
                    <Link
                      className="text-sm text-center flex gap-2 items-center"
                      href="/signup"
                    >
                      <UserPen />
                      My Profile
                    </Link>
                  </NavigationMenuLink>
                </li>
                <div className="w-full border border-gray-600 my-2" />
                <li className="w-full">
                  <NavigationMenuLink asChild>
                    <Link
                      className="text-sm text-center flex gap-2 items-center"
                      href="/signup"
                    >
                      <ShoppingCart />
                      My Orders
                    </Link>
                  </NavigationMenuLink>
                </li>
                {user ? (
                  <div>
                    <div className="w-full border border-gray-600 my-2" />
                    <li className="w-full">
                      <NavigationMenuLink asChild>
                        <button
                          className="text-sm text-center flex gap-2 items-center"
                          onClick={() => signOut()}
                        >
                          <LogOut />
                          Log Out
                        </button>
                      </NavigationMenuLink>
                    </li>
                  </div>
                ) : null}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
