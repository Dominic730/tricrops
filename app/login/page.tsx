'use client'

import Link from "next/link"
import Image from "next/image"
import { Loader } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { auth } from "@/lib/firebase/firebase"
import { Button } from "@/components/ui/button"
import { signInWithGoogle } from "@/lib/firebase/auth"
import { onAuthStateChanged, User } from "firebase/auth"

export default function Login() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    onAuthStateChanged(auth, async (user: null | User) => {
      if (user) {
        router.push("/")
      } else {
        setLoading(false)
      }
    })
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500" style={{ height: "calc(100vh - 96px)" }}>
        <Loader className="animate-spin h-16 w-16 text-white" />
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-green-300 to-blue-600 flex items-center justify-center p-5" style={{ height: "calc(100vh - 96px)" }}>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="md:flex">
          <div className="hidden md:block w-1/2 bg-green-500 p-10 text-white">
            <h2 className="text-3xl font-bold mb-6">Welcome Back!</h2>
            <p className="text-lg mb-8">
              Get access to your Orders, Wishlist and Recommendations
            </p>
          </div>
          <div className="w-full md:w-1/2 md:h-[500px] p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
              Sign in to continue
            </h2>
            <p className="text-sm text-gray-600 mb-8">
              By continuing you are agreeing to TripCrops&apos;s{" "}
              <Link href="#" className="text-blue-500 hover:underline">
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-blue-500 hover:underline">
                Privacy Policy
              </Link>
            </p>
            <Button className="w-full py-3 bg-green-500 hover:bg-green-600 transition-colors duration-300 flex items-center justify-center space-x-3 rounded-lg text-white font-semibold text-lg" onClick={async () => { await signInWithGoogle() }} >
              {loading ? (
                <Loader className="animate-spin" />
              ) : (
                <Image src="/google.svg" alt="Google Logo" width={24} height={24} />
              )}
              <span>Sign in with Google</span>
            </Button>
            <div className="mt-8 text-center">
              <Link className="text-sm text-green-600 hover:text-green-700 font-medium" href="/signup">
                New to TripCrops? Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}