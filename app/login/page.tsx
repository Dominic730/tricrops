"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { auth } from "@/lib/firebase/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/lib/firebase/auth";

export default function Login() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user: null | User) => {
      if (user) {
        router.push("/");
      } else {
        setLoading(false);
      }
    });
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin h-16 w-16 text-green-500" />{" "}
      </div>
    );
  }

  return (
    <div className="flex justify-center h-screen px-10 py-5 md:px-36 items-center">
      <div className="flex w-full justify-center h-[500px] border-green-600 border-2 rounded-md">
        <div className="hidden w-1/3 bg-green-500 h-full p-10 pr-5 md:flex flex-col gap-5">
          <p className="font-medium text-3xl">Login</p>
          <p className="text-lg">
            Get access to your Orders, Wishlist and Recommendations
          </p>
        </div>
        <div className="w-full md:w-2/3 h-full text-center p-10 flex flex-col items-center justify-between">
          <div>
            <p className="text-2xl">Sign in to continue</p>
            <div>
              <p className="text-xs pt-8 pb-8 md:pb-3 text-left">
                By continuing you are agreeing to SpiceHub&apos;s{" "}
                <a
                  className="text-[#5d96f3]"
                  href="#"
                >
                  Terms of Use
                </a>{" "}
                and <br className="hidden md:block" />{" "}
                <a
                  className="text-[#5d96f3]"
                  href=""
                >
                  Privacy Policy
                </a>
              </p>
              <Button
                className="w-full flex gap-3 py-2 h-fit bg-green-500 hover:bg-green-400"
                onClick={async () => {
                  await signInWithGoogle();
                }}
              >
                {loading ? (
                  <Loader className="animate-spin" />
                ) : (
                  <Image
                    src="/google.svg"
                    alt="Google Logo"
                    width={100}
                    height={100}
                    className="w-8"
                  />
                )}
                <p>Sign in with Google</p>
              </Button>
            </div>
          </div>
          <div>
            <Link
              className="text-sm text-green-400 font-medium"
              href="/signup"
            >
              New to SpiceHub? Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
