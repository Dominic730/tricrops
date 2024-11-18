'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { onAuthStateChanged, User } from "firebase/auth"
import { AlertCircle, Minus, Plus, ShoppingCart } from "lucide-react"

import addCart from "@/actions/addCart"
import addSack from "@/actions/addSack"
import { auth } from "@/lib/firebase/firebase"
import { Button } from "@/components/ui/button"
import fetchProduct from "@/actions/fetchProduct"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Product {
  id: string
  productname: string
  productprice: number
  productimage: string
}

export default function Product() {
  const [weight, setWeight] = useState(0)
  const [totalCost, setTotalCost] = useState(0)
  const [user, setUser] = useState<User | null>(null)
  const [product, setProduct] = useState<Product | null>(null)
  const [buyOrSell, setBuyOrSell] = useState<"buy" | "sell">("buy")
  const router = useRouter()
  const { productId } = useParams<{ productId: string }>()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

    fetchProduct(productId).then(setProduct)

    return () => unsubscribe()
  }, [productId])

  if (!product) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  const handleWeightChange = (newWeight: number) => {
    setWeight(newWeight)
    setTotalCost(newWeight * product.productprice)
  }

  const handleAction = async () => {
    if (!user) {
      alert("Please login to proceed.")
      router.push("/login")
      return
    }

    const { productname, productimage, productprice } = product
    const userId = user.uid

    try {
      if (buyOrSell === "buy") {
        await addCart({ productName: productname, image: productimage, price: productprice, weight, userId })
        alert("Product added to cart for buying.")
      } else {
        await addSack({ productName: productname, image: productimage, price: productprice, weight, userId })
        alert("Product added to cart for selling.")
      }
      handleWeightChange(0)
    } catch (e) {
      console.error(e)
      alert(`Failed to ${buyOrSell} product.`)
    }
  }

  return (
    <div className="container mx-auto px-4 pt-28">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <Image src={product.productimage} alt={product.productname} width={1000} height={1000} className="h-full w-full object-cover md:w-96" priority />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Product Details</div>
            <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">{product.productname}</h1>
            <p className="mt-4 max-w-2xl text-xl text-gray-500">
              The price displayed for this product is an estimate and may vary. The final amount will be confirmed at the time of collection. Payment will be done upon collection of the product. Thank you for your understanding.
            </p>
            <div className="mt-6">
              <p className="text-3xl font-bold text-gray-900">₹ {product.productprice}/Kg</p>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">Action:</label>
              <Select value={buyOrSell} onValueChange={(value: "buy" | "sell") => setBuyOrSell(value)}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select an action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="sell">Sell</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-6 flex items-center flex-col sm:flex-row gap-2">
              <div className="flex-1">
                <p className="text-lg font-medium text-gray-900">Estimated Price</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">₹ {totalCost}</p>
              </div>
              <div className="flex-1">
                <p className="text-lg font-medium text-gray-900">Weight</p>
                <div className="mt-1 flex items-center">
                  <button onClick={() => handleWeightChange(Math.max(0, weight - 1))} className="p-2 rounded-md bg-gray-100 hover:bg-gray-200">
                    <Minus size={20} />
                  </button>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => handleWeightChange(Math.max(0, Number(e.target.value)))}
                    className="w-10 text-center border-gray-300 rounded-md"
                  />
                  <span className="mr-2">Kg</span>
                  <button onClick={() => handleWeightChange(weight + 1)} className="p-2 rounded-md bg-gray-100 hover:bg-gray-200">
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Button
                className={`w-full ${
                  buyOrSell === "buy"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={weight === 0}
                onClick={handleAction}
              >
                <ShoppingCart className="mr-2" /> {buyOrSell === "buy" ? "Add To Cart" : "Add To Sack"}
              </Button>
            </div>
            <div className="mt-8">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Alert</AlertTitle>
                <AlertDescription>
                  All spices undergo quality and quantity checks upon arrival. Standard pricing applies to top-quality spices, while adjusted rates are offered for lower-grade ones. This ensures our commitment to excellence.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}