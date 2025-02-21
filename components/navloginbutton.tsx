"use client";

import Link from "next/link";
import fetchName from "@/actions/fetchName";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut } from "@/lib/firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { CircleUserRound, Loader, LogIn, LogOut, ShoppingCart, BaggageClaim, UserPen, Truck, UserRoundPlus } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

export default function NavLoginButton() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const authenticatedEmails = [ "adithyakb93@gmail.com", "abrahul02@gmail.com" ];
    onAuthStateChanged(auth, (user: null | User) => {
      if (user && user.email && authenticatedEmails.includes(user?.email)) {
        setAdmin(true);
      } else {
        router.push("/");
      }
    });
    if (user?.uid) {
      fetchName(user.uid).then((item) => {
        if (item) {
          setName(item);
        }
      });
    }
  }, [user, router]);

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
    { href: "/orders", label: "My Orders", icon: <Truck /> },
    { href: "/cart", label: "Cart", icon: <ShoppingCart /> },
    { href: "/sack", label: "Sack", icon: <BaggageClaim /> },
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
            <NavigationMenuTrigger className="mb-0 bg-[#f8f9fa] flex gap-2 items-center px-3 py-2 rounded-md transition">
              {user ? <CircleUserRound /> : ""}
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
                          <span> Login <br /> Sign Up </span>
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
                    {admin && (
                      <li className="w-full">
                        <NavigationMenuLink asChild>
                          <Link className="text-sm flex gap-2 items-center" href="/admin">
                            <UserRoundPlus />
                            <span>Admin</span>
                          </Link>
                        </NavigationMenuLink>
                        <div className="my-2 border-t border-gray-300" />
                      </li>
                    )}
                    <li className="w-full">
                      <NavigationMenuLink asChild>
                        <button className="text-sm flex gap-2 items-center w-full text-left" onClick={handleLogOut}>
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
