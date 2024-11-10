"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut } from "@/lib/firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { CircleUserRound, Loader, LogIn, LogOut, ShoppingCart, UserPen } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import fetchName from "@/actions/fetchName";

export default function NavLoginButton() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    if (user?.uid) {
      fetchName(user.uid).then((item) => {
        if (item) {
          setName(item);
        }
      });
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    setIsMounted(true);
    return () => unsubscribe();
  }, []);

  if (!isMounted) {
    return <Loader className="animate-spin" />;
  }

  const navigationItems = [
    { href: "/profile", label: "My Profile", icon: <UserPen /> },
    { href: "/orders", label: "My Orders", icon: <ShoppingCart /> },
    { href: "/cart", label: "Cart", icon: <ShoppingCart /> },
  ];

  const handleLogOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="mb-0 bg-blue-300 hover:bg-blue-200 flex gap-2 items-center px-3 py-2 rounded-md transition">
              {user ? <CircleUserRound />  : ""}
              
              <span className="text-sm font-medium">
                {user ? <div>{name}</div> : "Login"}
              </span>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="">
              <ul className="min-w-[150px] px-4 py-3">
                {!user ? (
                  <>
                    <li className="w-full">
                      <NavigationMenuLink asChild>
                        <Link className="text-sm flex gap-2 items-center" href="/login">
                          <LogIn />
                          <span>Login<br/>Sign Up</span>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </>
                ) : (
                  <>
                    {navigationItems.map((item) => (
                      <li key={item.href} className="w-full">
                        <NavigationMenuLink asChild>
                          <Link className="text-sm flex gap-2 items-center" href={item.href}>
                            {item.icon}
                            <span>{item.label}</span>
                          </Link>
                        </NavigationMenuLink>
                        <div className="my-2 border-t border-gray-300" />
                      </li>
                    ))}
                    <li className="w-full">
                      <NavigationMenuLink asChild>
                        <button className="text-sm flex gap-2 items-center w-full text-left" onClick={handleLogOut} >
                          <LogOut />
                          <span>Log Out</span>
                        </button>
                      </NavigationMenuLink>
                    </li>
                  </>
                )}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
